import { fetchGenerationOne } from "./fetchAPI.js"

const heading = document.querySelector("h1")

const params = window.location.search
const urlSearchParams = new URLSearchParams(params)
const pokeindex = urlSearchParams.get("pokeindex")

const image1 = document.getElementById("image1")
const image2 = document.getElementById("image2")
// console.log(index)

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


        let statPower = document.getElementById(`${el.stat.name}`)

        console.log(statPower)

        domEl.textContent = el.base_stat

        statPower.style.width = `${el.base_stat}`+ "px";
        
    }); 







    
}




