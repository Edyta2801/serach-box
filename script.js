const endpoint = "https://gist.githubusercontent.com/Edyta2801/c1c70068ae804044fedb493b3e5b6af6/raw/0fbf294ed4edfcddd61cf2bf7d7bf08a3aa8aa9a/gistfile1.txt";

// const endpoint = './data.json';

const players = [];
// console.log(players);

fetch(endpoint)
    .then(blob => blob.json())
    // .then(data=>console.log(data));
    .then(data => players.push(...data));


function findMatches(wordToMatch, players) {
    return players.filter(participant => {
        const regex = new RegExp(wordToMatch, 'gi');
        return participant.player.match(regex) 
        || participant.game.match(regex)
        || participant.competition.match(regex)
        ||participant.medal.match(regex)
    });
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, players);
    console.log(matchArray);
    const html = matchArray.map(participant => {
        const regex = new RegExp(this.value, 'gi');
        const participantName = participant.player.replace(regex, `<span class="hl">${this.value}</span>`);
        const gameName = participant.game.replace(regex, `<span class="hl">${this.value}</span>`);
        const competitionName = participant.competition.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
      <li>
        <span class="name">${participantName}</span>
        <span class="game">${gameName}</span>
        <span class="competition>${competitionName}</span>
        <span class="medal">${participant.medal}</span>
      </li>
    `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);