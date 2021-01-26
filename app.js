const $cardsContainer = document.getElementById("cards");
const $main = document.getElementById("main");
const $searchInput = document.getElementById("search");
const $filterSwitch = document.getElementById("filter");

async function fetchPokeCardData(criteria = "") {
  console.log("Fetching pokemons...");
  const url = "backend/all-pokes.php";
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

  // add modal event
  pokeCard.addEventListener("click", () => {
    fetchPokeModalData(pokemon);
  });
  $cardsContainer.appendChild(pokeCard);
}

async function fetchPokeModalData(pokemon) {
  console.log("Fetching poke modal data...");

  const url = "backend/specific-poke.php";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: pokemon.id }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));

  console.log("Poke modal data fetched");
  createPokeModal(response);
}

function createPokeModal({ id, name, abilities, description }) {
  console.log("Creating poke modal content...");
  const $pokeModel = document.getElementById("pokeModalBody");
  let abilitiesTemplate = ``;
  abilities.forEach((ability) => {
    
    abilitiesTemplate += `<li>${ability.charAt(0).toUpperCase() + ability.slice(1)}</li>`
  });
  $pokeModel.innerHTML = `
      <div class="modal-header">
        <h1 class="modal-title" id="pokeModalLabel">${name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="img-poke text-center">
          <img src="assets/${id
            .toString()
            .padStart(3, "0")}.png" alt="pokemon" class="img-fluid">
        </div>
        <h5>Descripción</h5>
        <p>${description}</p>
        <h5>Habilidades</h5>
        <ul>
          ${abilitiesTemplate}
        </ul>
      </div>
  `;
  console.log("Poke modal content added");
}

function PokeCardComponent({ id, name }) {
  return `
    <div class="card mb-4 text-center py-2" data-bs-toggle="modal" data-bs-target="#pokeModal">
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
      fetchPokeCardData(criteria);
    } else {
      fetchPokeCardData();
    }
  }
});

$filterSwitch.addEventListener("change", () => {
  if ($filterSwitch.checked) {
    const criteria = $searchInput.value;
    fetchPokeCardData(criteria);
  } else {
    fetchPokeCardData();
  }
});

// Main?
fetchPokeCardData();
