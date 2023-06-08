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
        <div class="card h-100 container p-3">
            <img src="${info.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h6 id="features" class="card-text">Features:</h6>
                <ol>
                    <li>${info.features[0]}</li>
                    <li>${info.features[1]}</li>
                    <li>${info.features[2]}</li>
                </ol>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <div>
                <h5 class="card-title">${info.name}</h5>
                <small class="text-body-secondary"><svg id="i-calendar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M2 6 L2 30 30 30 30 6 Z M2 15 L30 15 M7 3 L7 9 M13 3 L13 9 M19 3 L19 9 M25 3 L25 9" />
            </svg> ${info.published_in}</small>
                </div>
                <button class="btn btn-primary"><svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M22 6 L30 16 22 26 M30 16 L2 16" />
            </svg></button>
            </div>
        </div>
        `;
        aiCardDiv.appendChild(aiCard);

    })
}

aiDataLoad();