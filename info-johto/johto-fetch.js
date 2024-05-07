const urlJohto = "https://pokeapi.co/api/v2/pokemon/"
const limit = "?limit=100&offset=151"

export async function fetchJohto(){

    try {

        const req = await fetch(urlJohto + limit)

        if(!req.ok){
            throw new Error("Failed to fetch API")
        }

        const res = await req.json()        

        return res

    } catch (error) {
        console.log("ERROR")
    }
}



export async function johtoSprite(url){

    try {

        const req = await fetch(url)

        if(!req.ok){
            throw new Error("Failed to fetch sprite")
        }

        const res = await req.json()        

        return {sprite: res.sprites.versions["generation-ii"].gold.front_default}

    } catch (error) {
        console.log("ERROR")
    }



}

