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


export async function getCardInfo(url){    

    try{
        const request = await fetch(url)

        if(!request.ok){
            throw new Error("Failed to fetch sprite")
        }

        const result = await request.json()
        
        return {
            sprite: result.sprites.versions["generation-ii"].gold.front_default,
            abilities: result.abilities,
            cries: result.cries,
            types: result.types,
            stats: result.stats,
            id: result.id,
            spriteOfficial: result.sprites.other["official-artwork"]

        }
        
    
    }catch(error){
        console.log("ERROR")

    }
}
