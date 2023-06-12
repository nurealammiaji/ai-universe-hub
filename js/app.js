let aiDataLoad = (more) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => aiDataDisplay(data.data.tools, more))
}

let aiDataDisplay = (infos, more) => {
    let loader = document.getElementById("loader");
    if (more === false) {
        infos = infos.slice(0, 6);
    }
    else {
        infos = infos.slice(0);
    }
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
                    <li>${info.features[2] ? info.features[2] : 'Not Found'}</li>
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
        loader.classList.add("d-none");
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
    if (data.pricing[0].price === '0') {
        price = 'No Cost';
    }
    else {
        price = data.pricing[0].price;
    }
    let modalBodyCard = document.createElement("div");
    modalBodyCard.innerHTML = `
    <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0 gap-3">
            <div class="card p-3 bg-danger bg-opacity-10 border-danger" style="min-height: 450px">
                <h4>${data.description}</h4>
                <br/>
                <div class="container text-center">
                    <div class="row">
                        <div class="col p-3 m-3 rounded-4 bg-white text-success fw-bold">
                        ${price}<br/>${data.pricing[0].plan}
                        </div>
                        <div class="col p-3 m-3 rounded-4 bg-white text-warning fw-bold">
                        ${data.pricing[1].price}<br/>${data.pricing[1].plan}
                        </div>
                        <div class="col p-3 m-3 rounded-4 bg-white text-danger fw-bold">
                        ${data.pricing[2].price}<br/>${data.pricing[2].plan}
                        </div>
                    </div>
                </div>
                <br/>
                <div class="d-flex justify-content-evenly">
                    <div>
                        <h6>Features:</h6>
                        <small>
                            <ul>
                                <li>${data.features[1].feature_name}</li>
                                <li>${data.features[2].feature_name}</li>
                                <li>${data.features[3].feature_name}</li>
                            </ul>
                        </small>
                    </div>
                    <div>
                    <h6>Integrations:</h6>
                    <small>
                        <ul>
                            <li>${data.integrations[1] ? data.integrations[0] : 'Not Found'}</li>
                            <li>${data.integrations[2] ? data.integrations[1] : 'Not Found'}</li>
                            <li>${data.integrations[3] ? data.integrations[3] : 'Not Found'}</li>
                        </ul>
                    </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="card" style="min-height: 450px">
                <div class="card-body">
                <span id="badge" class="d-none position-absolute end-0 top-75 translate-middle badge rounded-pill bg-danger">${data.accuracy.score * 100}% accuracy</span>
                    <img src="${data.image_link[1] ? data.image_link[0] : data.image_link[0]}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body text-center">
                        <h4>${data.input_output_examples[0].input}</h4>
                        <p class="card-text">${data.input_output_examples[0].output}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    modalBody.appendChild(modalBodyCard);
    let badge = document.getElementById("badge");
    if (data.accuracy.score <= 0.0) {
        badge.classList.add("d-none");
    }
    else {
        badge.classList.remove("d-none");
    }
}

aiDataLoad(false);

document.getElementById("load-more").addEventListener("click", function() {
    let loader = document.getElementById("loader");
    loader.classList.remove("d-none");
    let aiCardDiv = document.getElementById("ai-card-div");
    aiCardDiv.innerText = "";
    aiDataLoad(true);
    let loadMore = document.getElementById("load-more");
    loadMore.classList.add("d-none");
})