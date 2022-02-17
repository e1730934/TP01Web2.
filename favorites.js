import { afficherPokemons, pokemonapiURL } from './commun.js';

if ((sessionStorage.getItem('token')) === null) {
  window.location.href = './index.html';
}

const btnDeconnexion = document.getElementById('afficherDeconnexion');
const divPokemons = document.getElementById('pokemons');
btnDeconnexion.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = './index.html';
});

async function loadingSpecies() {
  const bearerToken = `bearer ${sessionStorage.getItem('token')}`;
  const res = await fetch('https://pokemonsapi.herokuapp.com/favorites', {
    method: 'GET',
    headers: { authorization: bearerToken },
  });
  if (res.ok) {
    const data = await res.json();
    data.forEach((element) => {
      afficherPokemons(element, divPokemons);
    });
    data.forEach((element) => {
      document.getElementById(`div${element.pokemonId}`).addEventListener('click', () => {
        window.location.href = `./details.html?pokemonId=${element.pokemonId}`;
      });
    });
  }
}

loadingSpecies();
console.log(pokemonapiURL);
