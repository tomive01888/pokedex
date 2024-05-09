

export async function fetchPokemonList(url){

    try {

        const req = await fetch(url)

        if(!req.ok){
            throw new Error("Failed to fetch API")
        }

        const res = await req.json()        

        return res

    } catch (error) {
        console.log("ERROR")
    }
}



export async function pokeSprite(url){

    try {

        const req = await fetch(url)

        if(!req.ok){
            throw new Error("Failed to fetch sprite")
        }

        const res = await req.json()        

        return {sprite: res.sprites.versions["generation-ii"].crystal.front_default}

    } catch (error) {
        console.log("ERROR")
    }



}

