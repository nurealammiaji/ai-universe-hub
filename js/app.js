let aiDataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => aiDataDisplay(data.data.tools))
}

let aiDataDisplay = (infos) => {
    let aiCardDiv = document.getElementById("ai-card-div");
    infos.map(info => {
        console.log(info);
        let aiCard = document.createElement("div");
        aiCard.classList.add("col");
        aiCard.innerHTML = `
        <div class="card h-100 container">
            <img src="${info.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${info.name}</h5>
                <p id="features" class="card-text">Features:</p>
                <ol>
                    <li>${info.features[0]}</li>
                    <li>${info.features[1]}</li>
                    <li>${info.features[2]}</li>
                </ol>
            </div>
            <hr/>
            <div class="card-footer">
                <small class="text-body-secondary">${info.published_in}</small>
            </div>
        </div>
        `;
        aiCardDiv.appendChild(aiCard);

    })
}

aiDataLoad();