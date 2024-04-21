import { fetchGenerationOne, getSprite } from "./fetchAPI.js"

const pokeFolder = document.querySelector("#pokelist")
const pokemon =  await fetchGenerationOne()

console.log("list of pokemon:", pokemon)

if(pokemon.length > 0){
    for( let i = 0; i <pokemon.length; i++){

        let pokemonURL = pokemon[i].url

        let sprite = await getSprite(pokemonURL)

        pokeFolder.innerHTML += `<a class="pokecard" href="./pokemon/index.html?pokemon=${pokemon[i].name}&index=${i}">
                                    <span class="index">${i+1} </span>
                                    <img src="${sprite}" alt="${pokemon[i].name}">
                                    <p>${pokemon[i].name}</p>
                                </a>`  

    }
}