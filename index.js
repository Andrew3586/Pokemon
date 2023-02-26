const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetail = document.querySelector("#pokemon-detail");

function navigateDetail(event) {
  let url = event.target.innerText;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      pokemonDetail.innerHTML += `
              <h3>Name-${data.name}</h3>
              <h3>Height-${data.height}</h3>
              <h3>Weight-${data.weight}</h3>
              <h3>Abilities-${data.abilities.map((el) => {
                return `<p>${el.ability.name}</p>`;
              })}</h3>
          `;
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetchPokemons() {
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.results.forEach((post) => {
        pokemonList.innerHTML += `
          <div class="pokemon-card">
              <h3>${post.name}</h3>
              <button onClick=navigateDetail(event)>${post.url}</button>
            </div>
          `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchPokemons();
