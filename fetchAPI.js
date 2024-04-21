const pokeapiUrl = "https://pokeapi.co/api/v2/pokemon"
const genOne = "?limit=151"


export async function fetchGenerationOne() {
    try{
        const request = await fetch(pokeapiUrl + genOne) 

        if(!request.ok){
            throw new Error("Noe faen kjeeeddelig")
        }

        const result = await request.json()

        const pokemon = result.results

        return pokemon         
        
    }catch(error){
        console.log("ERROR")

    }
}


export async function getSprite(url){    

    try{
        const spriteReq = await fetch(url)

        if(!spriteReq.ok){
            throw new Error("Noe faen kjeeeddelig")
        }

        const resultos = await spriteReq.json()

        console.log(resultos)

        return resultos.sprites.other["official-artwork"].front_default
        
    
    }catch(error){
        console.log("ERROR")

    }
}

// for( let i = 0; i <pokemon.length; i++)
// pokeFolder.innerHTML += `<a href="./pokemon/${pokemon[i].name}/">
//                            <p>${i+1}  ${pokemon[i].name}</p>
//                          </a>` 



