import { pokemonapiURL } from './commun.js';

const dropdownSpecies = document.getElementById('species');
const dropdownPoketypes = document.getElementById('poketypes');
const dropdownHabitats = document.getElementById('habitats');

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

window.addEventListener('load', loadingSpecies);
window.addEventListener('load', loadingPoketypes);
window.addEventListener('load', loadingHabitats);

console.log(pokemonapiURL);
