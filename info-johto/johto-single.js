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

let min = 0;
let max = 5;


///////////////////// Display of Johto mons


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
    const pokemonURL = document.querySelector(`.pokecard:nth-child(${index + 1})`).dataset.url;
    console.log("url", pokemonURL);
  
    try {
      // Fetch data from the URL
      const response = await fetch(pokemonURL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon details');
      }
  
      // Parse the response as JSON
      const pokemonData = await response.json();


      const detailsContainer = document.getElementById("pokemonDetails");      
      detailsContainer.innerHTML = `
      <h2>${pokemonData.name}</h2>
      <img src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="${pokemonData.name}">
      <p>Height: ${pokemonData.height}</p>
      <p>Weight: ${pokemonData.weight}</p>
    `;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  }