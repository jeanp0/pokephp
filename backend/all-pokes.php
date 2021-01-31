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
    if (isset($_POST["name"])) {
        $api_raw = file_get_contents("https://pokeapi.co/api/v2/pokedex/2/");
        $result = json_decode($api_raw, true);

        $pokemons = [];
        foreach ($result["pokemon_entries"] as $key => $value) {
            // creo un pokemon (objeto) con los datos obtenidos
            $id = $value['entry_number'];
            $name = $value['pokemon_species']['name'];

            $pokemon = new stdClass();
            $pokemon->id = $id;
            $pokemon->name = ucfirst($name);

            array_push($pokemons, $pokemon);
        }

        if ($_POST["name"] !== "") {
            $pokemons = array_values(array_filter($pokemons, function ($poke) {
                return strpos(strtolower($poke->name), strtolower($_POST["name"])) === 0;
            }));
        }
        echo json_encode($pokemons);
    }
}
