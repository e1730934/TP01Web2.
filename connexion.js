import { pokemonapiURL } from './commun.js';

const btnConnexion = document.getElementById('connexion');
const btnAnnuler = document.getElementById('annuler');
btnAnnuler.addEventListener('click', () => {
  window.location.href = './index.html';
});
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // e1730934@site.com; e1730934
  const body = {
    email,
    password,
  };
  try {
    const resToken = await fetch(`${pokemonapiURL}/auth/token`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (resToken.ok) {
      const data = await resToken.json();
      sessionStorage.setItem('token', data.token);
      console.log(`Le jeton d'authentication: ${sessionStorage.getItem('token')}`);
      window.location.href = './favorites.html';
    } else {
      console.error('une erreur s\'est produite');
    }
  } catch (err) {
    console.log(err.message);
  }
}

btnConnexion.addEventListener('click', login);
document.getElementById('password').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnConnexion.click();
  }
});

console.log(pokemonapiURL);
