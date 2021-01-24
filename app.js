const $cardsContainer = document.getElementById("cards");
const $searchInput = document.getElementById("search");

const fetchPokes = async (criteria = "") => {
  // reset Poke Cards
  $cardsContainer.innerHTML = "";

  const url = "backend/pokeapi.php";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: criteria }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));

    console.log(response);
    
    try {
      response.forEach((poke) => {
        createPokeCard(poke);
      });
    } catch (e) {
      console.log("Error: " + e.message);
    }
};

function createPokeCard(pokemon) {
  const pokeCard = document.createElement("div");
  pokeCard.classList.add("col-6");
  pokeCard.innerHTML = PokeCardComponent(pokemon);

  $cardsContainer.appendChild(pokeCard);
}

$searchInput.addEventListener("keyup", (e) => {
  const criteria = e.target.value;
  console.log(criteria);
  fetchPokes(criteria);
});

function PokeCardComponent({ name, id }) {
  return `
  <div class="card mb-4 text-center">
  <h3 class="name">${name}</h3>
  <div class="img-poke">
  <img src="assets/${id
    .toString()
    .padStart(3, "0")}.png" alt="pokemon" class="img-fluid">
    </div>
    <span class="number">#${id.toString().padStart(3, "0")}</span>
    </div>
    `;
}

fetchPokes();

// // Ejemplo implementando el metodo POST:
// async function postData(url = "", data = {}) {
//   // Opciones por defecto estan marcadas con un *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });
