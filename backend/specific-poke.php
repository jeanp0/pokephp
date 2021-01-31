<?php
$json = file_get_contents("php://input");
$_POST = json_decode($json, true);

function permissions()
{
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
        header('Access-Control-Allow-Credentials: true');
    }
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
        exit(0);
    }
}
permissions();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header("Content-Type: application/json");
    if (isset($_POST["id"])) {
        $pokemon = new stdClass();
        $id = $_POST["id"];

        // obtener habilidades y nombre
        $api_raw = file_get_contents("https://pokeapi.co/api/v2/pokemon/$id");
        $result = json_decode($api_raw, true);
        $abilities = array_map(
            function ($ability) {
                return $ability["ability"]["name"];
            },
            $result["abilities"]
        );
        $name = $result["name"];

        // obtener descripción
        $api_raw = file_get_contents("https://pokeapi.co/api/v2/pokemon-species/$id");
        $result = json_decode($api_raw, true);

        foreach ($result["flavor_text_entries"] as $key => $value) {
            if ($value["language"]["name"] === "es" && $value["version"]["name"] === "x") {
                $description = $value["flavor_text"];
            }
        }

        // $description = array_values(array_filter(
        //     $result["flavor_text_entries"],
        //     function ($value) {
        //         return ($value["language"]["name"] === "es" && $value["version"]["name"] === "x");
        //     }
        // ))[0]["flavor_text"];

        // $description = array_map(
        //     function ($value) {
        //         if ($value["language"]["name"] === "es" && $value["version"]["name"] === "x") {
        //             return $value["flavor_text"];
        //         }
        //     },
        //     $result["flavor_text_entries"]
        // );

        $pokemon->id = $id;
        $pokemon->name = ucfirst($name);
        $pokemon->abilities = $abilities;
        $pokemon->description = $description;

        echo json_encode($pokemon);
    }
}
