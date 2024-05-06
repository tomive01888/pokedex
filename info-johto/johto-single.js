const numRows = 13;
const numCols = 20;

const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

const section = document.querySelector('#locations');

let html = '';

for (let i = 0; i < numRows; i++) {
    html += '<div>';

    for (let j = 0; j < numCols; j++) {
        const rowLetter = rowLetters[i];

        const className = `${rowLetter.toLowerCase()}-${j + 1}`;

        html += `<div class="${className}">${rowLetter}-${j + 1}<span id="${rowLetter}-${j + 1}"></span></div>`;
    }

    html += '</div>';
}

section.innerHTML = html;





