import { pokemonapiURL } from './commun.js';

const btnConnexion = document.getElementById('connexion');
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

async function login() {
  const body = {
    email,
    password,
  };
  try {
    const resToken = await fetch(`${pokemonapiURL}/auth/token`, {
      method: 'POST',
      body: JSON.stringify(body),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },

    });
    if (resToken.ok) {
      const data = await resToken.json();
      sessionStorage.setItem('data', data);
      console.log(`Le jeton d'authentication: ${data.token}`);
    } else {
      console.error('une erreur s\'est produite');
    }
  } catch (err) {
    sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWUiOiJNYXJpZSBDdXJpZSIsImVtYWlsIjoibWFjdXJpZUBzY2llbmNlLmNvbSIsImlhdCI6MTYxOTIyNjkxNn0.Nn0SP4ZzW4jaOu_Q47Cq-NPm545zfxJmY7ww7GWyJL0');
  }
}

btnConnexion.addEventListener('click', login);

console.log(pokemonapiURL);
