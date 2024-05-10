import { fetchGenerationOne } from "./fetchAPI.js"

window.onload = function() {
    // Check if this is the first entry
    if (!localStorage.getItem("pokeIndexAdded")) {
        // Get the current URL
        var currentUrl = window.location.href;

        // Check if the string is already present in the URL
        if (currentUrl.indexOf("?pokeindex=1") === -1) {
            // Add the string to the URL
            var modifiedUrl = currentUrl + "?pokeindex=1";

            // Redirect to the modified URL
            window.location.href = modifiedUrl;

            // Set a flag indicating that the string has been added
            localStorage.setItem("pokeIndexAdded", "true");
        }
    }
};

const heading = document.querySelector("h1")

const params = window.location.search
const urlSearchParams = new URLSearchParams(params)
const pokeindex = urlSearchParams.get("pokeindex")

const image1 = document.getElementById("image1")
const image2 = document.getElementById("image2")

if(parseInt(pokeindex) < 1 || parseInt(pokeindex) > 251) {
    window.location.href = "./index.html?pokeindex=1";
    alert("The pokemon you tried to enter is not part of the Gen 1 and Gen 2 dex")
} else {
   
}

document.getElementById("select").addEventListener("input", function(event) {
    const inputValue = parseInt(event.target.value);
    const minLimit = parseInt(event.target.getAttribute("min"));
    const maxLimit = parseInt(event.target.getAttribute("max"));
    
    if (inputValue < minLimit) {
        event.target.value = minLimit; 
    } else if (inputValue > maxLimit) {
        event.target.value = maxLimit; 
    }
});

document.getElementById("goButton").addEventListener("click", function() {
    const selectedValue = document.getElementById("select").value;
    const url = `./index.html?pokeindex=${selectedValue}`;
    window.location.href = url;
});

const type = document.querySelector(".type")
const audio = document.querySelector(".audio")

const previousPoke = document.querySelector('.leftPointer')
const prev = document.getElementById('previous')
previousPoke.addEventListener('click', gotoPrev)
function gotoPrev(){
    prev.href = `index.html?pokeindex=${pokeindex-1}`;

};
const nextPoke = document.querySelector('.rightPointer')
const next = document.getElementById('next')
nextPoke.addEventListener('click', gotoNext)
function gotoNext(){
    let pokeindexNumber = parseInt(pokeindex);
    next.href = `index.html?pokeindex=${pokeindexNumber + 1}`;
     
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
    

    audio.src = details.cries.latest
    audio.volume = 0.1;
    audio.autoplay = false

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

    previousPoke.style.display = "none";
    stopLeft.classList.add("hidden") 

    let pokenextNumber = parseInt(pokeindex);
    const nextId = await fetchGenerationOne(pokenextNumber + 1)
    
    imgNext.src = nextId.sprites.other["official-artwork"].front_default
    imgNext.alt = nextId.name

    const nextNumber = document.querySelector("#nextId")
    nextNumber.textContent = "#"+nextId.id

};

if(pokeindex === "251"){
    const prevId = await fetchGenerationOne(pokeindex - 1)
    imgPrev.src = prevId.sprites.other["official-artwork"].front_default
    imgPrev.alt = prevId.name
    prevNumber.textContent = "#"+prevId.id

    nextPoke.style.display = "none"
    stopRight.classList.add("hidden")
}

if(pokeindex > 1 && pokeindex < 251){

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