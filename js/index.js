import { fetchGenerationOne, getCardInfo } from "./fetchAPI.js"

const pokeFolder = document.querySelector("#pokelist")
const pokemon =  await fetchGenerationOne()

console.log("list of pokemon:", pokemon)

const allPokemons = pokemon.results
let colors = []

if(allPokemons.length > 0){
    for( let i = 0; i <allPokemons.length; i++){

        let pokemonURL = allPokemons[i].url

        const {sprite, type} = await getCardInfo(pokemonURL)

        console.log("res", type)

        type.forEach(t => {     

            const type = t.type.name
            switch(type){

                case "fire":
                    colors.push("red")

                // break;

                case "grass":
                    colors.push("green")

                // break;

                case "water":
                    colors.push("blue")

                // break;
                case "electric":
                    colors.push("yellow")
                // break;
                case "fighting":
                    colors.push("brown")

                // break;
                case "poison":
                    colors.push("purple")

                // break;
                case "ground":
                    colors.push("beige")

                // break;
                case "rock":
                    colors.push("brown")

                // break;
                case "psychic":
                    colors.push("crimson")
                // break;
                case "flying":
                    colors.push("lightblue")

                // break;
                case "ice":
                    colors.push("cyan")

                // break;
                case "bug":
                    colors.push("lightgreen")

                // break;
                case "ghost":
                    colors.push("darkviolet")

                // break;
                case "dark":
                    colors.push("darkgrey")

                // break;
                case "steel":
                    colors.push("silver")

                // break;
                case "fairy":
                    colors.push("pink")

                // break;
                case "dragon":
                    colors.push("marineblue")

                // break;
                case "normal":
                    colors.push("white")

                // break;
                default:
                    // console.log("typen finnes ikke",type)
    
            }

        });

        

        pokeFolder.innerHTML += `<a class="pokecard" href="./pokemon/index.html?pokeindex=${i+1}">
                                    <span class="index">${i+1} </span>
                                    <img src="${sprite}" alt="${allPokemons[i].name}">
                                    <p>${allPokemons[i].name}</p>
                                </a>`  

    }
}

