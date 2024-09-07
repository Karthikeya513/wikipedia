let searchel = document.getElementById("searchInput");
let spinel = document.getElementById("spinner");
let resultel = document.getElementById("searchResults");

function createanddisplay(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultcon = document.createElement("div");
    resultcon.classList.add("result-item");

    let titleel = document.createElement("a");
    titleel.href = link;
    titleel.target = "_blank";
    titleel.textContent = title;
    titleel.classList.add("result-title");
    resultcon.appendChild(titleel);

    let titlebr = document.createElement("br");
    resultcon.appendChild(titlebr);

    let linkel = document.createElement("a");
    linkel.href = link;
    linkel.textContent = link;
    linkel.target = "_blank";
    linkel.classList.add("result-url");
    resultcon.appendChild(linkel);

    let linkbr = document.createElement("br");
    resultcon.appendChild(linkbr);

    let parael = document.createElement("p");
    parael.textContent = description;
    parael.classList.add("link-description");
    resultcon.appendChild(parael);

    resultel.appendChild(resultcon);

}

function displayresults(search_results) {
    spinel.classList.add("d-none");
    for (let result of search_results) {
        createanddisplay(result);
    }
}

function getinput(event) {
    if (event.key === "Enter") {
        spinel.classList.remove("d-none");
        resultel.textContent = "";
        let searchvalue = searchel.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchvalue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayresults(search_results);
            });
    }
}

searchel.addEventListener("keydown", getinput);