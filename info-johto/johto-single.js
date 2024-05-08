import { fetchJohto, johtoSprite } from "./johto-fetch.js";

let johtoPokemon = await fetchJohto()

let allJohtoMons = johtoPokemon.results

const documentJohto = document.getElementById("pokemon-carousel")



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



///////////////////// Display of Johto mons
let min = 0;
let max = 5;

async function updateDisplay() {
    documentJohto.innerHTML = ""; 
  
    for (let i = min; i < max; i++) {
      const pokemonURL = allJohtoMons[i].url;
      const { sprite } = await johtoSprite(pokemonURL);
  
      const pokecard = document.createElement("div");
      pokecard.classList.add("pokecard");
      pokecard.dataset.url = allJohtoMons[i].url
      pokecard.addEventListener("click", () => displayPokemonDetails(i));
  
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
  
  updateDisplay();

  async function displayPokemonDetails(index) {
    const pokecards = document.querySelectorAll('.pokecard');
    const adjustedIndex = index - min; // Adjust index to match the array indexing

    if (adjustedIndex < 0 || adjustedIndex >= pokecards.length) {
        console.error('Invalid index or no pokecards available');
        return; // Exit the function if no pokecards are available or the index is out of range
    }

    const pokecard = pokecards[adjustedIndex];
    if (!pokecard) {
        console.error('Pokecard not found at index:', adjustedIndex);
        return; // Exit the function if the pokecard element is not found
    }

    const pokemonURL = pokecard.dataset.url;
    console.log("url", pokemonURL);
  
    try {
        // Fetch data from the URL
        const response = await fetch(pokemonURL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch Pokemon details');
        }
    
        // Parse the response as JSON
        const pokemonData = await response.json();
    
        console.log(pokemonData);
    
        const detailsContainer = document.getElementById("pokemonDetails");      
        detailsContainer.innerHTML = `
        <span class="pokeId"> ${'#'+pokemonData.id} </span>
            <h2>${pokemonData.name}</h2>
            <img id="image2" src="${pokemonData.sprites.other["official-artwork"].front_shiny}" alt="${pokemonData.name}">
            <img id="image1" src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="${pokemonData.name}">
            <p>Height: ${pokemonData.height}</p>
            <p>Weight: ${pokemonData.weight}</p>
        `;
    } catch (error) {
        console.error('Error fetching Pokemon details:', error);
    }
}





document.getElementById("prev5").addEventListener("click", () => {
    if (min >= 5) {
        min -= 5;
        max -= 5;
        updateDisplay();
    }
});

document.getElementById("prev1").addEventListener("click", () => {
    if (min >= 1) {
        min -= 1;
        max -= 1;
        updateDisplay();
    }
});

document.getElementById("next1").addEventListener("click", () => {
    if (max < allJohtoMons.length) {
        min += 1;
        max += 1;
        updateDisplay();
    }
});

document.getElementById("next5").addEventListener("click", () => {
    if (max + 5 <= allJohtoMons.length) {
        min += 5;
        max += 5;
        updateDisplay();
    }
});