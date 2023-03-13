const modal = document.getElementById("myModal");
const closeDown = document.getElementById("close");
// const close = document.getElementsByClassName("close-cross")[0];
const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetail = document.querySelector("#pokemon-detail");
const pokemonCard = document.querySelector("#pokemonCard");

closeDown.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function modalContent(event, post) {
  modal.style.display = "block";
  console.log(post);
  const h5Element = `
    <h2>${post.name.toUpperCase()}</h2>
    <h5>Weight-${post.weight}</h5>
    <h5>Height-${post.height}</h5>
        <h5>Abilities-${post.abilities.map((el) => {
    return `<p>${el.ability.name}</p>`;
  })}
      </h5>
   `;
  document.getElementById("model-content").innerHTML = h5Element;
}

async function fetchPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await res.json();
    data.results.forEach((post) => {
      fetchSinglePokemon(post.url);
    });
  } catch (err) {
    console.log(err);
  }
}
async function fetchSinglePokemon(url) {
  try {
    const res = await fetch(url);
    const pokemonData = await res.json();
    pokemonList.innerHTML += `
    <div class="pokemon-card" id="pokemonCard">
    <h3> ${pokemonData.name.toUpperCase()}</h3>
    <button onClick='modalContent(event, ${JSON.stringify(
      pokemonData
    )})' id="myBtn">
    <img class="size" src='${pokemonData.sprites.front_default}' alt='${pokemonData.name
      }' />
    </button>
    </div>
    `;
  } catch (err) {
    console.log(err);
  }
}
fetchPokemons();
