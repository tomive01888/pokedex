// import  API from "../assets/api.json" with {type: 'json'}

import { fetchGenerationOne, getCardInfo } from "./fetchAPI.js"

const pokemon =  await fetchGenerationOne()
const pokeFolder = document.querySelector("#pokelist")
const search = document.getElementById("search")

// const allPokemons = API.API
const allPokemons = pokemon.results

if(allPokemons.length > 0){    

    for( let i = 0; i <allPokemons.length; i++){   
        
        const pokemonURL = allPokemons[i].url

        const {sprite} = await getCardInfo(pokemonURL)

        pokeFolder.innerHTML += `
        <a class="pokecard ${allPokemons[i].name}" href="./info-All/index.html?pokeindex=${i+1}">
            <span class="index">${i+1} </span>
            <img src="${sprite}" alt="${allPokemons[i].name}">
            <p>${allPokemons[i].name}</p>
        </a>
        `;

        let cards = document.querySelectorAll(`.${allPokemons[i].name}`)
        cards.forEach(card => {
            card.style.backgroundColor = "white";
            
        });
    }

    search.addEventListener('keyup', searchPokemon)

    function searchPokemon(event) {
        const searchQuery = event.target.value.trim().toLowerCase();
    
        for (let i = 0; i < allPokemons.length; i++) {
            let card = document.querySelector(`.${allPokemons[i].name}`);
    
            if (searchQuery === "") {
                card.style.display = "";
            } else {
                if (allPokemons[i].name.toLowerCase().startsWith(searchQuery)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            }
        }
    }    
}