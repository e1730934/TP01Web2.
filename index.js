import { pokemonapiURL, afficherPokemons, redirectDetails } from './commun.js';

const divPokemons = document.getElementById('pokemons');
const dropdownSpecies = document.getElementById('species');
const dropdownPoketypes = document.getElementById('poketypes');
const dropdownHabitats = document.getElementById('habitats');

document.getElementById('afficherDeconnexion').addEventListener('click', () => {
  sessionStorage.removeItem('token');
  document.getElementById('afficherConnexion').classList.toggle('is-hidden');
  document.getElementById('afficherDeconnexion').classList.toggle('is-hidden');
  document.getElementById('favorites').classList.toggle('is-hidden');
});

async function loadingSpecies() {
  const res = await fetch(`${pokemonapiURL}/species`);
  if (res.ok) {
    const data = await res.json();
    data.forEach((element) => {
      const specie = document.createElement('option');
      specie.id = element.speciesId;
      specie.text = element.name;
      dropdownSpecies.add(specie);
    });
  } else {
    console.log('Error Species not loaded');
  }
}

async function loadingPoketypes() {
  const res = await fetch(`${pokemonapiURL}/poketypes`);
  if (res.ok) {
    const data = await res.json();
    data.forEach((element) => {
      const poketype = document.createElement('option');
      poketype.id = element.poketypeId;
      poketype.text = element.name;
      dropdownPoketypes.add(poketype);
    });
  } else {
    console.log('Error Poketype not loaded');
  }
}

async function loadingHabitats() {
  const res = await fetch(`${pokemonapiURL}/habitats`);
  if (res.ok) {
    const data = await res.json();
    data.forEach((element) => {
      const habitat = document.createElement('option');
      habitat.id = element.habitatId;
      habitat.text = element.name;
      dropdownHabitats.add(habitat);
    });
  } else {
    console.log('Error Habitats not loaded');
  }
}

function filterPokemon(data) {
  const searchSpecies = dropdownSpecies.value;
  const searchHabitat = dropdownHabitats.value;
  const searchPoketypes = dropdownPoketypes.value;

  let displayedPokemons = data;
  divPokemons.innerHTML = '';
  if (searchSpecies !== '') {
    displayedPokemons = displayedPokemons.filter(
      (element) => element.species.name === searchSpecies,
    );
  }
  if (searchHabitat !== '') {
    displayedPokemons = displayedPokemons.filter(
      (element) => element.habitat.name === searchHabitat,
    );
  }
  if (searchPoketypes !== '') {
    const pokemonListGoodPocketype = [];
    displayedPokemons.forEach((element) => {
      element.poketypes.forEach((poketype) => {
        if (poketype.name === searchPoketypes) {
          pokemonListGoodPocketype.push(element);
        }
      });
    });
    displayedPokemons = pokemonListGoodPocketype;
  }

  displayedPokemons.forEach((element) => {
    afficherPokemons(element, divPokemons);
  });
  redirectDetails(displayedPokemons);
}

async function loadingPokemons() {
  const res = await fetch(`${pokemonapiURL}/pokemons`);
  if (res.ok) {
    const data = await res.json();
    filterPokemon(data);
  } else {
    console.log('Error Pokemons not loaded');
  }
}

window.addEventListener('load', loadingSpecies);
window.addEventListener('load', loadingPoketypes);
window.addEventListener('load', loadingHabitats);
window.addEventListener('load', loadingPokemons);
document.getElementById('btnFiltrer')
  .addEventListener('click', loadingPokemons);

if (sessionStorage.getItem('token')) {
  document.getElementById('afficherConnexion').classList.toggle('is-hidden');
  document.getElementById('afficherDeconnexion').classList.toggle('is-hidden');
  document.getElementById('favorites').classList.toggle('is-hidden');
}

console.log(pokemonapiURL);
