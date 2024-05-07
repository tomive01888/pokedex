import { fetchGenerationOne, getCardInfo } from "./fetchAPI.js"

const pokeFolder = document.querySelector("#pokelist")
const pokemon =  await fetchGenerationOne()
const search = document.getElementById("search")

const allPokemons = pokemon.results

if(allPokemons.length > 0){
    

    for( let i = 0; i <allPokemons.length; i++){
           

        const pokemonURL = allPokemons[i].url

        const {sprite} = await getCardInfo(pokemonURL)


        pokeFolder.innerHTML += `<a class="pokecard ${allPokemons[i].name}" href="./info-kanto/index.html?pokeindex=${i+1}">
                                    <span class="index">${i+1} </span>
                                    <img src="${sprite}" alt="${allPokemons[i].name}">
                                    <p>${allPokemons[i].name}</p>
                                </a>`;
        
        let cards = document.querySelectorAll(`.${allPokemons[i].name}`)
        cards.forEach(card => {
            card.style.backgroundColor = "white"
            
        });  

    }


    search.addEventListener('keyup', searchPokemon)

    function searchPokemon(event){ 
        const searchQuery = event.target.value.trim().toLowerCase()

        for( let i = 0; i <allPokemons.length; i++){

            let card = document.querySelector(`.${allPokemons[i].name}`)                
            card.style.backgroundColor = "white"
            card.style.filter =  "";
            card.style.opacity =  "";           
        }

        if(searchQuery === ""){      
              
            return
        }        
    
        const matches = allPokemons.filter((s)=> s.name.toLowerCase().startsWith(searchQuery))
        const doesNotMatch = allPokemons.filter((s)=> !s.name.toLowerCase().startsWith(searchQuery))

   
        if(doesNotMatch.length){

            for( let i = 0; i < doesNotMatch.length; i++){    
                let element = document.querySelector(`.${doesNotMatch[i].name}`)                            
                element.style.filter =  "grayscale(100%)";
                element.style.opacity = "0.6";
    
            }
        }


        console.log(doesNotMatch);
      
        if(matches.length){

            

            for( let i = 0; i < matches.length; i++){

                let element = document.querySelector(`.${matches[i].name}`)                
                element.style.backgroundColor = ""
                element.style.backgroundColor = "white"
    
            }
        }
    }    
}


///////////////// Searching and redo array for matching search


// import { fetchGenerationOne, getCardInfo } from "./fetchAPI.js";

// const pokeFolder = document.querySelector("#pokelist");
// const search = document.getElementById("search");
// let allPokemons = [];
// let originalPokemons = [];

// async function initialize() {
//     const pokemon = await fetchGenerationOne();
//     allPokemons = pokemon.results;
//     originalPokemons = [...allPokemons];
//     renderPokemonList(allPokemons);
//     search.addEventListener('keyup', searchPokemon);
// }

// function renderPokemonList(pokemons) {
//     pokeFolder.innerHTML = "";
//     pokemons.forEach(async (poke, index) => {
//         const { sprite } = await getCardInfo(poke.url);
//         const cardHTML = `<a class="pokecard ${poke.name}" href="./pokemon/index.html?pokeindex=${index + 1}">
//                             <span class="index">${index + 1}</span>
//                             <img src="${sprite}" alt="${poke.name}">
//                             <p>${poke.name}</p>
//                           </a>`;
//         pokeFolder.innerHTML += cardHTML;
//     });
// }

// async function searchPokemon(event) {
//     const searchQuery = event.target.value.trim().toLowerCase();

//     if (searchQuery === "") {
//         renderPokemonList(originalPokemons); //
//         return;
//     }

//     const filteredPokemons = originalPokemons.filter(poke => poke.name.toLowerCase().startsWith(searchQuery));
//     renderPokemonList(filteredPokemons);
// }

// initialize();




// import { fetchGenerationOne, getCardInfo } from "./fetchAPI.js";

// const pokeFolder = document.querySelector("#pokelist");
// const search = document.getElementById("search");

// async function initialize() {
//     try {
//         const pokemon = await fetchGenerationOne();
//         const allPokemons = pokemon.results;
        
//         renderPokemonList(allPokemons);
//         search.addEventListener('keyup', handleSearch.bind(null, allPokemons));
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// }

// function renderPokemonList(pokemons) {
//     pokeFolder.innerHTML = "";
//     pokemons.forEach(async (poke, index) => {
//         const pokemonURL = poke.url;
//         const { sprite } = await getCardInfo(pokemonURL);
//         const card = createPokemonCard(poke, sprite, index + 1);
//         pokeFolder.appendChild(card);
//     });
// }

// function createPokemonCard(pokemon, sprite, index) {
//     const card = document.createElement("a");
//     card.classList.add("pokecard", pokemon.name);
//     card.href = `./info-kanto/index.html?pokeindex=${index}`;
    
//     card.innerHTML = `
//                         <span class="index">${index}</span>
//                         <img src="${sprite}" alt="${pokemon.name}">
//                         <p>     ${pokemon.name}</p>
//     `;
//     return card;
// }

// function handleSearch(allPokemons, event) {
//     const searchQuery = event.target.value.trim().toLowerCase();

//     allPokemons.forEach(pokemon => {
//         const card = document.querySelector(`.${pokemon.name}`);
//         if (!searchQuery || pokemon.name.toLowerCase().startsWith(searchQuery)) {
//             card.style.backgroundColor = "";
//             card.style.filter = "";
//             card.style.opacity = "";
//         } else {
//             card.style.filter = "grayscale(100%)";
//             card.style.opacity = "0.6";
//         }
//     });
// }

// initialize();
