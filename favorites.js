import { pokemonapiURL } from './commun.js';

const btnDeconnexion = document.getElementById('afficherDeconnexion');
btnDeconnexion.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = './index.html';
});

console.log(pokemonapiURL);
