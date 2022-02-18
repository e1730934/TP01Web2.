const pokemonapiURL = 'https://pokemonsapi.herokuapp.com';

function listPoketypes(list) {
  const poketypes = list.map((x) => x.name);
  return poketypes.join(', ');
}

function afficherPokemons(element, divPokemons) {
  divPokemons.innerHTML += `
              <div id="div${element.pokemonId}" class="column is-3-desktop is-4-tablet is-12-mobile"> 
                  <div  style="background-color: ${element.color}"  class="card large"> 
                      <div class="card-image"> 
                        <figure class="image is-square"> 
                            <img src="${element.imgURL}" alt=${element.name}> 
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

function redirectDetails(data) {
  data.forEach((element) => {
    document.getElementById(`div${element.pokemonId}`).addEventListener('click', () => {
      window.location.href = `./details.html?pokemonId=${element.pokemonId}`;
    });
  });
}

export { pokemonapiURL, afficherPokemons, redirectDetails };
