const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetail = document.querySelector("#pokemon-detail");
const pokemonCard = document.querySelector("#pokemonCard");

async function navigateDetail(event, url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(pokemonCard);
    theDiv.appendChild(`
              <div>
                <h3>Name-${data.name}</h3>
              <h3>Height-${data.height}</h3>
              <h3>Weight-${data.weight}</h3>
              <h3>Abilities-${data.abilities.map((el) => {
                return `<p>${el.ability.name}</p>`;
              })}</h3>
              </div>
              `);
  } catch (err) {
    console.log(err);
  }
}

async function fetchPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await res.json();
    console.log(data);
    data.results.map(async (post) => {
      const res = await fetch(post.url);
      const pokemonData = await res.json();
      pokemonList.innerHTML += `
        <div class="pokemon-card" id="pokemonCard">
        <h3> ${pokemonData.name .toUpperCase()}</h3>
        <button onClick=navigateDetail(this,'${post.url}')>
        <img class="size" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>
        </button>
        </div>
        `;
    });
  } catch (err) {
    console.log(err);
  }
}

fetchPokemons();
