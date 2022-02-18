import { pokemonapiURL } from './commun.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

async function isFav() {
  if (sessionStorage.getItem('token')) {
    const bearerToken = `bearer ${sessionStorage.getItem('token')}`;
    const res = await fetch(`${pokemonapiURL}/favorite?pokemonId=${urlParams.get('pokemonId')}`, {
      method: 'GET',
      headers: { authorization: bearerToken },
    });
    if (res.ok) {
      const data = await res.json();
      document.getElementById('favorites').classList.remove('is-hidden');
      const { isFavorite } = data;
      if (isFavorite === true) {
        document.getElementById('supprimerFavoris').classList.remove('is-hidden');
      } else {
        document.getElementById('ajouterFavoris').classList.remove('is-hidden');
      }
    }
  } else {
    document.getElementById('afficherDeconnexion').classList.add('is-hidden');
  }
}
isFav();
async function loadPokeInfo() {
  const res = await fetch(`${pokemonapiURL}/pokemon?pokemonId=${urlParams.get('pokemonId')}`);
  if (res.ok) {
    const data = await res.json();
    document.getElementById('name').innerText = data.name;
    document.getElementById('hp').innerText = data.hp;
    document.getElementById('attack').innerText = data.attack;
    document.getElementById('defense').innerText = data.defense;
    document.getElementById('height').innerText = data.height;
    document.getElementById('specialattack').innerText = data.specialattack;
    document.getElementById('specialdefense').innerText = data.specialdefense;
    document.getElementById('speed').innerText = data.speed;
    document.getElementById('weight').innerText = data.weight;
    document.getElementById('imgURL').src = data.imgURL;
    document.querySelector(' audio').src = data.cryURL;
    document.getElementById('habitatName').innerText = data.habitat.name;
    document.getElementById('speciesName').innerText = data.species.name;
    if (data.evolution !== null) {
      document.getElementById('evolutionName').innerText = data.evolution.name;
      document.getElementById('evolutionImgURL').src = data.evolution.imgURL;
      if (data.evolution.evolution !== null) {
        document.getElementById('evolutionEvolutionName').innerText = data.evolution.evolution.name;
        document.getElementById('evolutionEvolutionImgURL').src = data.evolution.evolution.imgURL;
      } else {
        document.querySelector('#app > div > ul > li:nth-child(16)')
          .classList
          .add('is-hidden');
        document.querySelector('#app > div > ul > li:nth-child(17)')
          .classList
          .add('is-hidden');
      }
    } else {
      document.querySelector('#app > div > ul > li:nth-child(14)')
        .classList
        .add('is-hidden');
      document.querySelector('#app > div > ul > li:nth-child(15)')
        .classList
        .add('is-hidden');
      document.querySelector('#app > div > ul > li:nth-child(16)')
        .classList
        .add('is-hidden');
    }
  } else {
    console.log('Error Species not loaded');
  }
}

loadPokeInfo();
document.getElementById('afficherDeconnexion').addEventListener('click', () => {
  sessionStorage.removeItem('token');
  document.getElementById('afficherDeconnexion').classList.add('is-hidden');
  document.getElementById('favorites').classList.add('is-hidden');
  document.getElementById('ajouterFavoris').classList.add('is-hidden');
  document.getElementById('supprimerFavoris').classList.add('is-hidden');
});
document.getElementById('ajouterFavoris').addEventListener('click', async () => {
  const bearerToken = `bearer ${sessionStorage.getItem('token')}`;
  const res = await fetch(`${pokemonapiURL}/favorite?pokemonId=${urlParams.get('pokemonId')}`, {
    method: 'POST',
    headers: { authorization: bearerToken },
  });
  if (res.ok) {
    document.getElementById('ajouterFavoris').classList.toggle('is-hidden');
    document.getElementById('supprimerFavoris').classList.toggle('is-hidden');
  }
});

document.getElementById('supprimerFavoris').addEventListener('click', async () => {
  const bearerToken = `bearer ${sessionStorage.getItem('token')}`;
  const res = await fetch(`${pokemonapiURL}/favorite?pokemonId=${urlParams.get('pokemonId')}`, {
    method: 'DELETE',
    headers: { authorization: bearerToken },
  });
  if (res.ok) {
    document.getElementById('supprimerFavoris').classList.toggle('is-hidden');
    document.getElementById('ajouterFavoris').classList.toggle('is-hidden');
  }
});
console.log(pokemonapiURL);
