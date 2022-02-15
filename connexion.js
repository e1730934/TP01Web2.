import { pokemonapiURL } from './commun.js';

const btnConnexion = document.getElementById('connexion');

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
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
      sessionStorage.setItem('data', data);
      console.log(`Le jeton d'authentication: ${data.token}`);
    } else {
      console.error('une erreur s\'est produite');
    }
  } catch (err) {
    console.log(err.message);
  }
}

btnConnexion.addEventListener('click', login);

console.log(pokemonapiURL);
