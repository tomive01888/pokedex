const pokeapiUrl = "https://pokeapi.co/api/v2/pokemon"
const genOne = "?limit=151"

async function fetchGenerationOne() {
    try{
        const request = await fetch(pokeapiUrl + genOne) 
        console.log(request.ok)     

        if(!request.ok){

            throw new Error("Noe faen kjeeeddelig")

             
    
        }

        const result = await request.json()

        const pokemon = result.results

        console.log(pokemon[100])  

       
    
        
    }catch(error){
        console.log("ERROR")

    }
}

fetchGenerationOne()