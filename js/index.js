import  API from "../assets/api.json" with {type: 'json'}

const pokeFolder = document.querySelector("#pokelist")
const search = document.getElementById("search")

const allPokemons = API.API

if(allPokemons.length > 0){    

    for( let i = 0; i <allPokemons.length; i++){           

        pokeFolder.innerHTML += `
        <a class="pokecard ${allPokemons[i].name}" href="./info-All/index.html?pokeindex=${i+1}">
            <span class="index">${i+1} </span>
            <img src="${allPokemons[i].sprite}" alt="${allPokemons[i].name}">
            <p>${allPokemons[i].name}</p>
        </a>
        `;

        let cards = document.querySelectorAll(`.${allPokemons[i].name}`)
        cards.forEach(card => {
            card.style.backgroundColor = "white";
            
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