import { fetchPokemonList, pokeSprite } from "../Utility js/export-fetch.js";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
const kantoLimit = "?limit=151"
const FULL_KANTO_LIMIT = BASE_URL + kantoLimit
let kantoPokemon = await fetchPokemonList(FULL_KANTO_LIMIT)

let allKantoMons = kantoPokemon.results

const documentJohto = document.getElementById("pokemon-carousel")

const params = window.location.search
const urlSearchParams = new URLSearchParams(params)
const pokeindex = urlSearchParams.get("pokeindex")


let currentPokemon = 1;
let currentPosition = 0; 
const cardWidth = 160;
const gap = 16;
const distanceToMove = cardWidth + gap;
if(pokeindex){

    currentPokemon = pokeindex
}

const starterPokemon = await displayCurrent(currentPokemon)
console.log("asiodjaoid", starterPokemon);
if(starterPokemon){
    abilities(starterPokemon)
    renderHtml(starterPokemon)
    await markPokemonOnMap(starterPokemon)
    pokeType(starterPokemon)
}

let timeout;

const prevBtn = document.querySelector(".previous")
prevBtn.addEventListener("click", onPrevClick)
const nextBtn = document.querySelector(".next")
nextBtn.addEventListener("click", onNextClick)

function onNextClick() {
  clearTimeout(timeout);
  if(currentPokemon === 0) return
  currentPokemon += 1;
  currentPosition += distanceToMove;
  documentJohto.style.transform = `translateX(${-currentPosition}px)`;
  timeout = setTimeout(goToPokemon, 1200);
}
function onPrevClick() {
    if (currentPokemon === 1) return;
    currentPokemon -= 1;
    currentPosition -= distanceToMove;
    documentJohto.style.transform = `translateX(${-currentPosition}px)`;
    timeout = setTimeout(goToPokemon, 1200);
   
}

const goPlus10Btn = document.querySelector(".goPlus10");
goPlus10Btn.addEventListener("click", onGoPlus10Click);
const goMinus10Btn = document.querySelector(".goMinus10");
goMinus10Btn.addEventListener("click", onGoMinus10Click);

function onGoPlus10Click() {
    clearTimeout(timeout);
    if (currentPokemon + 10 <= 151) { 
        currentPokemon += 10; 
        currentPosition = (currentPokemon - 1) * distanceToMove; 
        documentJohto.style.transform = `translateX(${-currentPosition}px)`;
        timeout = setTimeout(goToPokemon, 1200);   
    }
}

function onGoMinus10Click() {
    clearTimeout(timeout);
    if (currentPokemon - 10 >= 1) { 
        currentPokemon -= 10; 
        currentPosition = (currentPokemon - 1) * distanceToMove;
        documentJohto.style.transform = `translateX(${-currentPosition}px)`;
        timeout = setTimeout(goToPokemon, 1200);        
    }
}

const goToStartBtn = document.querySelector(".goToStart");
goToStartBtn.addEventListener("click", onGoToStartClick);
const goToEndBtn = document.querySelector(".goToEnd");
goToEndBtn.addEventListener("click", onGoToEndClick);

function onGoToStartClick() {
    clearTimeout(timeout);
    currentPokemon = 1;
    currentPosition = 0; 
    documentJohto.style.transform = `translateX(${-currentPosition}px)`;
    timeout = setTimeout(goToPokemon, 1200);
}
function onGoToEndClick() {
    clearTimeout(timeout);
    currentPokemon = 151; 
    currentPosition = (151 - 1) * distanceToMove; 
    documentJohto.style.transform = `translateX(${-currentPosition}px)`;
    timeout = setTimeout(goToPokemon, 1200);
}

//////////// Update information on click
async function goToPokemon() {
    const pokemonData = await displayCurrent(currentPokemon);
    abilities(pokemonData);
    renderHtml(pokemonData);
    await markPokemonOnMap(pokemonData);
    pokeType(pokemonData);

}

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// Display of Johto mons
let min = 0;
let max = 151;

async function allKantoOnDisplay() {
    documentJohto.innerHTML = ""; 
  
    for (let i = min; i < max; i++) {
      const pokemonURL = allKantoMons[i].url;
      const { sprite } = await pokeSprite(pokemonURL);
  
      const pokecard = document.createElement("div");
      pokecard.classList.add("pokecard");
      pokecard.dataset.url = allKantoMons[i].url
  
      const indexSpan = document.createElement("span");
      indexSpan.classList.add("index");
      indexSpan.textContent = i + 1;
      pokecard.appendChild(indexSpan);
  
      const img = document.createElement("img");
      img.src = sprite;
      img.alt = allKantoMons[i].name;
      pokecard.appendChild(img);
  
      const namePara = document.createElement("p");
      namePara.textContent = allKantoMons[i].name;
      pokecard.appendChild(namePara);
  
      documentJohto.appendChild(pokecard);
  
      let cards = document.querySelectorAll(`.${allKantoMons[i].name}`);
      cards.forEach(card => {
        card.style.backgroundColor = "white";
      });
    }
  }
  allKantoOnDisplay();

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  async function displayCurrent(pokeid){

    const urlJohto = `https://pokeapi.co/api/v2/pokemon/${pokeid}`
    try {

        const req = await fetch(urlJohto)

        const res = req.json()
        console.log("fetching", res)

        return res
        
    } catch (error) {

        console.log(error)
        
    }
}

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// All info specific pokemon
function renderHtml(obj) {
    const { name, id } = obj;
    const spanIndex = document.getElementById("pokeId");      
    const pokeImages = document.getElementById("pokeImg");      
    const pokeInfo = document.getElementById("pokeContent"); 

    spanIndex.innerHTML = `${'#'+id} `;

    pokeImages.innerHTML = `
        <img id="image2" src="${obj.sprites.other["official-artwork"].front_shiny}" alt="${name}">
        <img id="image1" src="${obj.sprites.other["official-artwork"].front_default}" alt="${name}">
    `;
    
    let pokeTitle = pokeInfo.querySelector("h2");
    if (!pokeTitle) {
        pokeTitle = document.createElement("h2");
        pokeInfo.appendChild(pokeTitle);
    }
    pokeTitle.textContent = name;

    let pokeAudio = pokeInfo.querySelector("audio");
    if (!pokeAudio) {
        pokeAudio = document.createElement("audio");
        pokeInfo.appendChild(pokeAudio);
    }
    pokeAudio.src = obj.cries.latest;
    pokeAudio.volume = 0.1;
    pokeAudio.controls = true;
    pokeAudio.controlsList = "nodownload";


}
 

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// Abilities
function abilities(obj){
    const ablty_folder = document.getElementById("abilities")

    ablty_folder.innerHTML = "";

    const ability = obj.abilities
    
    for(let i = 0; i < ability.length; i++){
    
      ablty_folder.innerHTML += `
      <p>${  obj.abilities[i].is_hidden  ? "<span>Hidden:</span>" + obj.abilities[i].ability.name : "<span>Normal:</span>" + obj.abilities[i].ability.name}</p>
      `
    }
}
 
//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// Types
function pokeType(obj){
    const type = document.querySelector(".type")

    type.innerHTML = `
    <img src="../assets/types/${obj.types[0].type.name}.ico" alt="">
    
    `;
    if(obj.types.length === 2){
        type.innerHTML = `
        <img src="../assets/types/${obj.types[0].type.name}.ico" alt="">
        <img src="../assets/types/${obj.types[1].type.name}.ico" alt="">
        
        `;
    }
}

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// POKEMON LOCATION ON MAP
async function markPokemonOnMap(obj){

    const locationURL = `https://pokeapi.co/api/v2/pokemon/${obj.id}/encounters`

    const req = await fetch(locationURL)

    const res = await req.json()    

    const kantoLocations = res.filter(el => el.version_details.some(v => v.version["name"] === "red" || v.version["name"] === "blue"))
    
    console.log("locations", kantoLocations);

    const allMapDivs = document.querySelectorAll("#locations div div");
    allMapDivs.forEach(div => {
        div.classList.remove("targetAquired", "targetLegendary");
    });
    if (kantoLocations.length > 0) {
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

        if(target && legendaryIndex.find(p => p === obj)){
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
}

