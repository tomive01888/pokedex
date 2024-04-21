const pokeapiUrl = "https://pokeapi.co/api/v2/pokemon"
const genOne = "?limit=151"


export async function fetchGenerationOne(specific = null) {

    let urlToFetch = pokeapiUrl + genOne

    if(specific !== null) {
        urlToFetch = pokeapiUrl + "/" + specific

    }

    try{
        const request = await fetch(urlToFetch) 

        if(!request.ok){
            throw new Error("Failed to fetch pokemon from API")
        }

        const result = await request.json()

        return result
        
    }catch(error){
        console.log("ERROR")

    }
}


export async function getSprite(url){    

    try{
        const spriteReq = await fetch(url)

        if(!spriteReq.ok){
            throw new Error("Failed to fetch sprite")
        }

        const resultos = await spriteReq.json()

        // console.log(resultos)

        return resultos.sprites.other["official-artwork"].front_default
        
    
    }catch(error){
        console.log("ERROR")

    }
}

// for( let i = 0; i <pokemon.length; i++)
// pokeFolder.innerHTML += `<a href="./pokemon/${pokemon[i].name}/">
//                            <p>${i+1}  ${pokemon[i].name}</p>
//                          </a>` 



