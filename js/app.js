let aiDataLoad = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => aiDataDisplay(data.data.tools))
}

let aiDataDisplay = (infos) => {
    infos.map(info => {
        console.log(info);
    })
}

aiDataLoad();