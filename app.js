const $cardsContainer = document.getElementById("cards");
const $searchInput = document.getElementById("search");
const $filterSwitch = document.getElementById("filter");

async function fetchPokes(criteria = "") {
  console.log("Fetching pokemons...");
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
  console.log("Pokemons fetched");

  createPokeCards(response);
}

function createPokeCards(pokemons) {
  try {
    console.log("Creating pokemon cards...");
    resetPokeCards();
    pokemons.forEach((poke) => createPokeCard(poke));
    console.log("Pokemon cards created");
  } catch (e) {
    console.log("Error: " + e.message);
  }
}

function resetPokeCards() {
  console.log("Clearing pokemon cards...");
  $cardsContainer.innerHTML = "";
  console.log("Pokemon cards cleared");
}

function createPokeCard(pokemon) {
  const pokeCard = document.createElement("div");
  pokeCard.classList.add("col-6");
  pokeCard.innerHTML = PokeCardComponent(pokemon);
  handlerClick(pokeCard, pokemon);
  $cardsContainer.appendChild(pokeCard);
}

function handlerClick(pokeCard, pokemon) {
  pokeCard.addEventListener("click", (e) => console.log("hola", pokemon.id));
}

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

// Events
$searchInput.addEventListener("keyup", () => {
  if ($filterSwitch.checked) {
    const criteria = $searchInput.value;
    if (criteria) {
      fetchPokes(criteria);
    } else {
      fetchPokes();
    }
  }
});

$filterSwitch.addEventListener("change", () => {
  if ($filterSwitch.checked) {
    const criteria = $searchInput.value;
    fetchPokes(criteria);
  } else {
    fetchPokes();
  }
});

// Main?
fetchPokes();
