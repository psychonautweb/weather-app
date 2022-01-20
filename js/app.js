let locationElement = document.getElementById('location');
let tempIconElement = document.getElementById('temp-icon');
let tempValueElement = document.getElementById('temp-value');
let climateElement = document.getElementById('climate');




window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={23b6b88a53a59ad3fa30461332d0f8c7}`;
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    const {name} = data;
                    const {feels_like} = data.main;
                    const {id, main} = data.weather[0];

                    locationElement.textContent = name;
                    climateElement.textContent = main;
                    tempValueElement.textContent = Math.round(feels_like-273);
                    
                    if (id < 250) {
                        tempIconElement.src = './icons/storm.svg'
                    } else if (id < 350) {
                        tempIconElement.src = './icons/drizzle.svg'
                    } else if (id < 550) {
                        tempIconElement.src = './icons/rain.svg'
                    } else if (id < 650) {
                        tempIconElement.src = './icons/snow.svg'
                    } else if (id < 800) {
                        tempIconElement.src = './icons/atmposphere.svg'
                    } else if (id === 800) {
                        tempIconElement.src = './icons/clear.svg'
                    } else if (id > 800) {
                        tempIconElement.src = './icons/clouds.svg'
                    }
                    console.log(data);
                })
        })
    }
})
