import { fetchPokemonList, pokeSprite } from "../Utility js/export-fetch.js";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
const johtoLimit = "?limit=100&offset=151"
const FULL_JOHTO_LIMIT = BASE_URL + johtoLimit

let johtoPokemon = await fetchPokemonList(FULL_JOHTO_LIMIT)

let allJohtoMons = johtoPokemon.results

console.log("oadah", johtoPokemon);

const documentJohto = document.getElementById("pokemon-carousel")

let currentPokemon = 1;
let currentPosition = 0; 
const cardWidth = 160;
const gap = 16;
const distanceToMove = cardWidth + gap;

// if(pokeindex){
//     currentPokemon = pokeindex
// }

const starterPokemon = await displayCurrent(currentPokemon)
if(starterPokemon){
    abilities(starterPokemon)
    renderHtml(starterPokemon)
    // await markPokemonOnMap(starterPokemon)
    /pokeType(starterPokemon)
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
    // await markPokemonOnMap(pokemonData);
    pokeType(pokemonData);

}


///////////////////// Display of Johto mons
let min = 0;
let max = 100;

async function allJohtoOnDisplay() {
    documentJohto.innerHTML = ""; 
  
    for (let i = min; i < max; i++) {
      const pokemonURL = allJohtoMons[i].url;
      const { sprite } = await pokeSprite(pokemonURL);
  
      const pokecard = document.createElement("div");
      pokecard.classList.add("pokecard");
      pokecard.dataset.url = allJohtoMons[i].url
  
      const indexSpan = document.createElement("span");
      indexSpan.classList.add("index");
      indexSpan.textContent = i + 152;
      pokecard.appendChild(indexSpan);
  
      const img = document.createElement("img");
      img.src = sprite;
      img.alt = allJohtoMons[i].name;
      pokecard.appendChild(img);
  
      const namePara = document.createElement("p");
      namePara.textContent = allJohtoMons[i].name;
      pokecard.appendChild(namePara);
  
      documentJohto.appendChild(pokecard);
  
      let cards = document.querySelectorAll(`.${allJohtoMons[i].name}`);
      cards.forEach(card => {
        card.style.backgroundColor = "white";
      });
    }
  }
  allJohtoOnDisplay();


  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  async function displayCurrent(pokeid){

    const urlJohto = `https://pokeapi.co/api/v2/pokemon/${pokeid +151}`
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

const numRows = 13;
const numCols = 20;

const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

const locationSection = document.querySelector('#locations');

let html = '';

for (let i = 0; i < numRows; i++) {
    html += '<div>';

    for (let j = 0; j < numCols; j++) {
        const rowLetter = rowLetters[i];

        const className = `${rowLetter.toLowerCase()}-${j + 1}`;

        html += `<div class="${className}"><span id="${rowLetter}-${j + 1}"></span></div>`;
    }

    html += '</div>';
}

locationSection.innerHTML = html;