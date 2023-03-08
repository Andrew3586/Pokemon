// const pokemonList = document.querySelector("#pokemon-list");
// const pokemonDetail = document.querySelector("#pokemon-detail");
// const pokemonCard = document.querySelector("#pokemonCard");

// async function navigateDetail(event, url) {
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data);
//     console.log(pokemonCard);
//     document.body.appendChild(`
//               <div>
//                 <h3>Name-${data.name}</h3>
//               <h3>Height-${data.height}</h3>
//               <h3>Weight-${data.weight}</h3>
//               <h3>Abilities-${data.abilities.map((el) => {
//                 return `<p>${el.ability.name}</p>`;
//               })}</h3>
//               </div>
//               `);
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function fetchPokemons() {
//   try {
//     const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
//     const data = await res.json();
//     console.log(data);
//     data.results.map(async (post) => {
//       const res = await fetch(post.url);
//       const pokemonData = await res.json();
//       pokemonList.innerHTML += `
//         <div class="pokemon-card" id="pokemonCard">
//         <h3> ${pokemonData.name .toUpperCase()}</h3>
//         <button onClick=navigateDetail(this,'${post.url}')>
//         <img class="size" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>
//         </button>
//         </div>
//         `;
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// fetchPokemons();

const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetail = document.querySelector("#pokemon-detail");
const pokemonCard = document.querySelector("#pokemonCard");

// function navigateDetail(event, post) {
//   console.log(post);
//   const button = event.target.parentElement;
//   const h3 = button.previousElementSibling;
//   console.log(h3);

//   const h5Element = `<ul> <h5>Weight-${post.weight}</h5>
//  <h5>Height-${post.height}</h5>
// <div class="abilities" <h5>Abilities-${post.abilities.map((el) => {
//     return `<p>${el.ability.name}</p>`;
//   })}</h5></ul></div>
// `
//   h3.insertAdjacentHTML("afterend", h5Element);
// }

function navigateDetail(event, post) {
  modal.style.display = "block";
  const h5Element = `<ul> <h5>Weight-${post.weight}</h5>
 <h5>Height-${post.height}</h5>
<div class="abilities" <h5>Abilities-${post.abilities.map((el) => {
    return `<p>${el.ability.name}</p>`;
  })}</h5></ul></div>
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
    <button onClick='navigateDetail(event, ${JSON.stringify(
      pokemonData
    )})' id="myBtn">
    <img class="size" src='${pokemonData.sprites.front_default}' alt='${
      pokemonData.name
    }' />
    </button>
    </div>
    `;
  } catch (err) {
    console.log(err);
  }
}
fetchPokemons();
