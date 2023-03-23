const modal = document.getElementById("myModal");
const closeDown = document.getElementById("close");
const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetail = document.querySelector("#pokemon-detail");
const pokemonCard = document.querySelector("#pokemonCard");
const searchBox = document.querySelector("#searchBox");

let allPokemonData;
let allPokemonInfo;

async function getAllPokemonData() {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    let data = await response.json();
    allPokemonData = data;
  } catch (error) {
    console.log(error);
  }
}

getAllPokemonData();
console.log(allPokemonData);

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
    const allPokemonInfo = await Promise.all(
      data.results.map(async (post) => {
        return await fetchSinglePokemon(post.url);
      })
    );
    const allPokemonHtml = allPokemonInfo.map((el) => {
      return `<div class="pokemon-card" id="pokemonCard">
      <h3> ${el.name.toUpperCase()}</h3>
      <button onClick='modalContent(event, ${JSON.stringify(el)})' id="myBtn">
      <img class="size" src='${el.sprites.front_default}' alt='${el.name}' />
    </button>
    </div>`;
    });
    appendPokemon(allPokemonHtml);
  } catch (err) {
    console.log(err);
  }
}

async function fetchSinglePokemon(url) {
  try {
    const res = await fetch(url);
    const pokemonData = await res.json();
    return pokemonData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchFilteredPokemons(query) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await res.json();
    const filteredData = data.results.filter((el) => {
      return el.name.match(query);
    });
    return filteredData;
  } catch (err) {
    console.log(err);
  }
}
function appendPokemon(htmlContent) {
  pokemonList.innerHTML = htmlContent;
}

async function searchInp() {
  try {
    let text = searchBox.value;
    const data = await fetchFilteredPokemons(text);
    const filteredPokemon = await Promise.all(
      data.map(async (el) => {
        return await fetchSinglePokemon(el.url);
      })
    );
    const pokemonHtml = filteredPokemon.map((el) => {
      return `
            <div class="pokemon-card" id="pokemonCard">
            <h3> ${el.name.toUpperCase()}</h3>
            <button onClick='modalContent(event, ${JSON.stringify(
              el
            )})' id="myBtn">
            <img class="size" src='${el.sprites.front_default}' alt='${
        el.name
      }' />
          </button>
          </div>
          `;
    });
    appendPokemon(pokemonHtml);
  } catch (err) {
    console.log(err);
  }
}

if (!searchBox.value) {
  fetchPokemons();
}
