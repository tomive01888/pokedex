import { fetchGenerationOne } from "./fetchAPI.js"

const heading = document.querySelector("h1")

const params = window.location.search
const urlSearchParams = new URLSearchParams(params)
const pokeindex = urlSearchParams.get("pokeindex")

const image1 = document.getElementById("image1")
const image2 = document.getElementById("image2")

const type = document.querySelector(".type")
const audio = document.querySelector(".audio")

const previousPoke = document.querySelector('.leftPointer')
const prev = document.getElementById('previous')
previousPoke.addEventListener('click', gotoPrev)
function gotoPrev(){
    prev.href = `./index.html?pokeindex=${pokeindex-1}`;

};
const nextPoke = document.querySelector('.rightPointer')
const next = document.getElementById('next')
nextPoke.addEventListener('click', gotoNext)
function gotoNext(){
    let pokeindexNumber = parseInt(pokeindex);
    next.href = `./index.html?pokeindex=${pokeindexNumber + 1}`;
     
};

if(pokeindex){

    const details = await fetchGenerationOne(pokeindex)

    console.log(details)
    
    heading.textContent =  `#${pokeindex} ${details.name.toUpperCase()} `

    image1.src = details.sprites.other["official-artwork"].front_default
    image1.alt = details.name
    image2.src = details.sprites.other["official-artwork"].front_shiny
    image2.alt = details.name

    details.stats.forEach(el => {

        let domEl = document.querySelector(`.${el.stat.name}`)
        domEl.textContent = el.base_stat

        let statPower = document.getElementById(`${el.stat.name}`)
        statPower.style.width = `${el.base_stat}`+ "px";        
    });

    type.innerHTML = `
    <img src="../assets/types/${details.types[0].type.name}.ico" alt="">
    
    `;
    if(details.types.length === 2){
        type.innerHTML = `
        <img src="../assets/types/${details.types[0].type.name}.ico" alt="">
        <img src="../assets/types/${details.types[1].type.name}.ico" alt="">
        
        `;
    }
    

    audio.src = details.cries.lamarkPokemonOnMap
    audio.volume = 0.1;

    const ablty_folder = document.getElementById("abilities")

    const ability = details.abilities

    for(let i = 0; i < ability.length; i++){

      ablty_folder.innerHTML += `
      <p>${  details.abilities[i].is_hidden  ? "<span>Hidden:</span>" + details.abilities[i].ability.name : "<span>Normal:</span>" + details.abilities[i].ability.name       }</p>
      `
    }
}


const stopLeft = document.getElementById("stopPrev")
const stopRight = document.getElementById("stopNext")
const imgPrev = document.querySelector(".indexPrev")
const imgNext = document.querySelector(".indexNext")
const prevNumber = document.querySelector("#prevId")
const nextNumber = document.querySelector("#nextId")

if(pokeindex === "1"){

    previousPoke.style.display = "none"
    stopLeft.classList.add("hidden") 

    let pokenextNumber = parseInt(pokeindex);
    const nextId = await fetchGenerationOne(pokenextNumber + 1)
    
    imgNext.src = nextId.sprites.other["official-artwork"].front_default
    imgNext.alt = nextId.name

    const nextNumber = document.querySelector("#nextId")
    nextNumber.textContent = "#"+nextId.id

};

if(pokeindex === "151"){
    const prevId = await fetchGenerationOne(pokeindex - 1)
    imgPrev.src = prevId.sprites.other["official-artwork"].front_default
    imgPrev.alt = prevId.name
    prevNumber.textContent = "#"+prevId.id

    nextPoke.style.display = "none"
    stopRight.classList.add("hidden")
}

if(pokeindex > 1 && pokeindex < 151){

    const prevId = await fetchGenerationOne(pokeindex - 1)
    imgPrev.src = prevId.sprites.other["official-artwork"].front_default
    imgPrev.alt = prevId.name

    prevNumber.textContent = "#"+prevId.id

    let pokenextNumber = parseInt(pokeindex);
    const nextId = await fetchGenerationOne(pokenextNumber + 1)

    imgNext.src = nextId.sprites.other["official-artwork"].front_default
    imgNext.alt = nextId.name

    nextNumber.textContent = "#"+nextId.id



}





const locationURL = `https://pokeapi.co/api/v2/pokemon/${pokeindex}/encounters`

async function markPokemonOnMap(){

    const req = await fetch(locationURL)

    const res = await req.json()    

    const kantoLocations = res.filter(el => el.version_details.some(v => v.version["name"] === "red" || v.version["name"] === "blue"))
 
    console.log(kantoLocations);

    kantoLocations.forEach( l => {        

        let route = l.location_area.name
        let safari = "safari-zone"
        let ceruleanCave = "cerulean-cave"
        let mtMoon = "mt-moon"
        let victoryRoad = "victory-road"
        let rockTunnel = "rock-tunnel"
        let seafoamIslands = "seafoam-islands"
        let pokeMansion = "pokemon-mansion"
        let pokeTower = "pokemon-tower"

        if(route.includes(pokeTower)){
            route = pokeTower
        }

        if(route.includes(pokeMansion)){
            route = pokeMansion
        }

        if(route.includes(victoryRoad)){
            route = victoryRoad
        }

        if(route.includes(rockTunnel)){
            route = rockTunnel
        }

        if(route.includes(seafoamIslands)){
            route = seafoamIslands
        }

        if(route.includes(safari)){
            route = safari
        }

        if(route.includes(mtMoon)){
            route = mtMoon
        }

        if(route.includes(ceruleanCave)){
            route = ceruleanCave
        }

        console.log(route);
        let target = document.querySelectorAll(`.${route}`);
        
        
        const legendaryIndex = [
            "144", "145", "146", "150", "151" 
        ]

        if(target && legendaryIndex.find(p => p === pokeindex)){
            target.forEach(div => {

                div.classList.add("targetLegendary")

            })

        }else{
            target.forEach(div => {

                div.classList.add("targetAquired")

            })
        }


    })

}

markPokemonOnMap()

