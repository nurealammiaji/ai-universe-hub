let aiDataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => aiDataDisplay(data.data.tools))
}

let aiDataDisplay = (infos) => {
    infos = infos.slice(0, 6);
    let aiCardDiv = document.getElementById("ai-card-div");
    infos.map(info => {
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
                    <li>${info.features[2] ? info.features[2] : 'None'}</li>
                </ol>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <div>
                <h5 class="card-title">${info.name}</h5>
                <small class="text-body-secondary"><svg id="i-calendar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M2 6 L2 30 30 30 30 6 Z M2 15 L30 15 M7 3 L7 9 M13 3 L13 9 M19 3 L19 9 M25 3 L25 9" />
            </svg> ${info.published_in}</small>
                </div>
            <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="modalDataLoad('${info.id}')">
                    <svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M22 6 L30 16 22 26 M30 16 L2 16" /></svg>
                </button>
            </div>
        </div>
        `;
        aiCardDiv.appendChild(aiCard);

    })
}

let modalDataLoad = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => modalDataDisplay(data.data));
}

let modalDataDisplay = (data) => {
    console.log(data);
    let modalBody = document.getElementById("modal-body");
    modalBody.innerText = '';
    let modalBodyCard = document.createElement("div");
    modalBodyCard.innerHTML = `
    <div>
        <div class="card" style="width: 18rem;">
            <img src="${data.image_link[1] ? data.image_link[0] : data.logo}" class="p-2 card-img-top" alt="...">
            <div class="card-body text-center">
                <h4>${data.input_output_examples[0].input}</h4>
                <p class="card-text">${data.input_output_examples[0].output}</p>
            </div>
        </div>
    </div>
    `;
    modalBody.appendChild(modalBodyCard);
}

aiDataLoad();