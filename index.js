import { pokemonapiURL } from './commun.js';

const divPokemons = document.getElementById('pokemons');
const dropdownSpecies = document.getElementById('species');
const dropdownPoketypes = document.getElementById('poketypes');
const dropdownHabitats = document.getElementById('habitats');
const listPokemons = [];

function listPoketypes(list) {
  const poketypes = list.map((x) => x.name);
  return poketypes.join(', ');
}
function editDiv(element) {
  divPokemons.innerHTML += `
              <div id="div${element.pokemonId}" class="column is-3-desktop is-4-tablet is-12-mobile"> 
                  <div class="card large"> 
                      <div class="card-image"> 
                        <figure class="image is-square"> 
                            <img src="${element.imgURL}" alt=${element.name}"> 
                        </figure> 
                      </div> 
                        <div class="card-content">
                            <div class="media"> 
                                <div class="media-content">
                                    <p class="title is-4 no-padding">${element.name}</p>
                                    <p>Species: ${element.species.name}</p>
                                    <p>Habitat: ${element.habitat.name}</p>
                                    <p>Poketypes: ${listPoketypes(element.poketypes)} </p>
                                </div> 
                            </div> 
                        </div> 
                    </div> 
               </div>`;
}

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

async function loadingPokemons() {
  const res = await fetch(`${pokemonapiURL}/pokemons`);
  if (res.ok) {
    const data = await res.json();
    data.forEach((element) => {
      listPokemons.push(element);
      editDiv(element);
    });
  } else {
    console.log('Error Pokemons not loaded');
  }
}

function filterPokemon() {
  const searchSpecies = dropdownSpecies.value;
  const searchPoketypes = dropdownPoketypes.value;
  const searchHabitat = dropdownHabitats.value;
}

window.addEventListener('load', loadingSpecies);
window.addEventListener('load', loadingPoketypes);
window.addEventListener('load', loadingHabitats);
window.addEventListener('load', loadingPokemons);

console.log(pokemonapiURL);
