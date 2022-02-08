import { pokemonapiURL } from './commun.js';

const divPokemons = document.getElementById('pokemons');
const dropdownSpecies = document.getElementById('species');
const dropdownPoketypes = document.getElementById('poketypes');
const dropdownHabitats = document.getElementById('habitats');

function listPoketypes(list) {
  const poketypes = list.map((x) => x.name);
  return poketypes.join(', ');
}

function editDiv(element) {
  divPokemons.innerHTML += `
              <div id="div${element.pokemonId}" class="column is-3-desktop is-4-tablet is-12-mobile"> 
                  <div  style="background-color: ${element.color}"  class="card large"> 
                      <div class="card-image"> 
                        <figure class="image is-square"> 
                            <img src="${element.imgURL}" alt=${element.name}"> 
                        </figure> 
                      </div> 
                        <div class="card-content">
                            <div class="media"> 
                                <div class="media-content">
                                    <p class="title is-4 no-padding">${element.name}</p>
                                    <p><b>Species:</b> ${element.species.name}</p>
                                    <p><b>Habitat:</b> ${element.habitat.name}</p>
                                    <p><b>Poketypes:</b> ${listPoketypes(element.poketypes)} </p>
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
    editDiv(element);
  });
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
console.log(pokemonapiURL);
