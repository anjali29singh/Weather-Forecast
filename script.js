const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const locationBlock = document.querySelector('.location-block');
const input = document.querySelector('.search-box');
const submitBtn = document.querySelector('.submit');
const geoLocation = document.querySelector('.device-location');
const forecastCont=document.querySelector('.forecast-cont');
const cityName = document.querySelector('.city-name');
const region = document.querySelector('.region');
const country = document.querySelector('.country');
const weatherImg = document.querySelector('.weather-icon-img')
const date = document.querySelector('.date');
const tempInCenti = document.querySelector('.tempt-in-centi');
const tempInFeh = document.querySelector('.tempt-in-feh');
const weatherCondition = document.querySelector('.condition');
const humidityVal = document.querySelector('.humid-val');
const windVal = document.querySelector('.wind-val');
const preciptVal = document.querySelector('.prep-val');


//display forecast

function displayForecast(){
    forecastCont.classList.remove('hidden');

}
//Update Region
function updateRegion(name, rgn, cont) {
    cityName.textContent = name;
    region.textContent = rgn;
    country.textContent = cont;


}
//update tempt
function updateTempt(temp_c, temp_f, condition) {
    
    tempInCenti.textContent = temp_c;
    tempInFeh.textContent = temp_f;
    weatherCondition.textContent = condition;
    
    
    
}

//updating date and time
function updateDateTime() {
    d = new Date();
    const dt = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()},${days[d.getDay()]}`

    date.textContent = dt;

}


//Insert Weather icon 
function addIcon(icon) {
    
    weatherImg.src = icon;
}

//Display Error
function renderError(err) {
    alert(err);
    
}
//Update Weather 
function WeatherDetails(hum, wind, precip) {

    humidityVal.textContent = `${hum} %`;

    windVal.textContent = `${wind.toFixed(2)} km/hr`;


    preciptVal.textContent = `${precip} mm/hr`


}

//updating function
function updatingFunc(data){


    const { name, region, country } = data.location;
            const { temp_c, temp_f, wind_kph, precip_mm, humidity } = data.current;
            const { text, icon, code } = data.current.condition;


            updateRegion(name, region, country);

            updateDateTime();

            updateTempt(temp_c, temp_f, text);

            addIcon(icon);

            WeatherDetails(humidity, wind_kph, precip_mm);
            
            displayForecast();



}

//fetching and getting response
async function getData(url) {
    const resp = await fetch(url, {
    });
    if (!resp) return new Error ('Something went wrong');
    return resp.json();
}



//Getting weather forecast
function getForecastBycity(city) {

    getData(`http://api.weatherapi.com/v1/current.json?key=49eda03a1d524774b5962019230502&q=${city}&aqi=no`)
        .then(resp => {

            updatingFunc(resp);



        })
        .catch(err => {
            renderError(`Something went wrong`);
        })

}
function getForecastByCoords(lat,lng){
getData(`http://api.weatherapi.com/v1/current.json?key=49eda03a1d524774b5962019230502&q=${lat},${lng}&aqi=no`)
        .then(data => {
            updatingFunc(data);

        })
        .catch(err => {
            renderError(`Something went wrong `);
        });


}
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const city = input.value;
    if (!city){
        renderError('Please enter valid city');
    }
    else{


    // requestApi(city);
    getForecastBycity(city);
    
    
    //clear inputs
    input.value = '';
    }

});

//get current location
geoLocation.addEventListener('click', function (e) {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }
});

function success(pos) {
    const { latitude: lat, longitude: lng } = pos.coords;
    
    getForecastByCoords(lat,lng);
       


}
