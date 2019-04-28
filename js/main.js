const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search state.json and filter it...

const searchStates = async (searchText) => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    //console.log(states);
    //get Matches to current text input.........

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);

    });
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    console.log(matches);
    outPutHtml(matches);
};

//show result in Html
let outPutHtml = matches => {
    if (matches.length > 0) {
        let htmlDesign = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) 
                <span class="text-primary">${match.capital}</span>
                </h4>
                <small>
                    Lat: ${match.lat} / Long: ${match.long}
                </small>
            </div>
            `).join('');
        console.log(htmlDesign);
        matchList.innerHTML = htmlDesign;
    };
};

search.addEventListener('input', () => searchStates(search.value));