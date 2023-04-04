const modal = document.getElementById("myModal");
const closeDown = document.getElementById("close");
const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetail = document.querySelector("#pokemon-detail");
const pokemonCard = document.querySelector("#pokemonCard");
const searchBox = document.querySelector("#searchBox");

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

// 4. Which I have created a function fetchFilteredPokemons(query)
// 5. So we are fetching all the Pokemons again, then we are filtering for the name el.name.match(query);
// 6. Then we are looking for the individual letters in the pokemons.

async function fetchFilteredPokemons(query) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await res.json();
    const filteredData = data.results.filter((el) => {
      return el.name.match(query);
    });
    // 7. Then we are returning the filtered the filtered data and getting the filtered (const data below)
    return filteredData;
  } catch (err) {
    console.log(err);
  }
}
// 10. We are just appending all the html that we have collected to this pokemon div(pokemon list)
function appendPokemon(htmlContent) {
  pokemonList.innerHTML = htmlContent;
}
// 1. Taking an input from the user & search input is in the html
async function searchInp() {
  try {
    // 2. This is the value the user has entered
    let text = searchBox.value;
    // 3. Then we are filtering the pokemons
    // 8. Inside the data is the name and url of the pokemon
    const data = await fetchFilteredPokemons(text);
    const filteredPokemon = await Promise.all(
      data.map(async (el) => {
        // 9. We are searching each single pokemon
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
