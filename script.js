const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const locationBlock = document.querySelector('.location-block');
const input = document.querySelector('.search-box');
const submitBtn = document.querySelector('.submit');
const geoLocation = document.querySelector('.device-location');
const region = document.querySelector('.region');
const country = document.querySelector('.country');
const weatherImg = document.querySelector('.weather-icon-img')
const date = document.querySelector('.date');
const tempInCenti = document.querySelector('.tempt-in-centi');
const weatherCondition = document.querySelector('.condition');
const humidityVal = document.querySelector('.humid-val');
const windVal = document.querySelector('.wind-val');
const preciptVal = document.querySelector('.prep-val');

//Update Region
function updateRegion(rgn, cont) {
    region.textContent = rgn;
    country.textContent = cont;


}
//fetching and getting response
async function getData(url) {
    const resp = await fetch(url,{
    });
    return resp.json();
}
//Update Weather 
function updateWeather(weatherData) {
    const { wind_spd, rh, weather, precip, temp } = weatherData.data[0];
    const weatherSituation = weather.description;

    console.log(weatherData);
    d = new Date();
    const dt = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()},${days[d.getDay()]}`

    date.textContent = dt;

    tempInCenti.textContent = temp;

    weatherCondition.textContent = weatherSituation;

    humidityVal.textContent = `${rh} %`;

    windVal.textContent = `${wind_spd.toFixed(3)} m/sec`;

    if (!precip) preciptVal.textContent = `${0} mm/hr`;
    else {
        preciptVal.textContent = `${precip} mm/hr`
    };



}
//Insert Weather icon 
function addIcon(icon) {

    weatherImg.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
}
//Display Error
function renderError(err) {


}

//hide search box 
function hideLocationBlock() {
    locationBlock.classList.add('hidden');
}

//Getting weather forecast
function WeatherDetails(city) {

    // getData(`https://api.weatherbit.io/v2.0/current?city=${city}&key=fb180e6dc648403fa5c80e00e284df5c&include=minutely`)

    getData(`http://api.weatherapi.com/v1/current.json?key=49eda03a1d524774b5962019230502&q=${city}&aqi=no`)
        .then(resp => {

            console.log(resp);

            // const { icon } = resp.data[0].weather;
            // const {lat,lon}=resp.data[0];
        

            //get state and country
            getPlace(lat,lon);
            
            //inserting icon in html
            addIcon(icon);

            //Update date ,time,tempt etc
            updateWeather(resp);

            


        })
        .catch(err => {
            renderError(err);
        })

}

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const city = input.value;

    // requestApi(city);
    WeatherDetails(city);


    //clear inputs
    input.value = '';

});

//get current location
geoLocation.addEventListener('click', function (e) {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }
});

//get city state and country
function getPlace(lat, lng) {
    // getData(`https://geocode.xyz/${lat},${lng}?json=1&auth=981110903134814621444x98407`
    getData(`http://api.weatherapi.com/v1/current.json?key=49eda03a1d524774b5962019230502&q=${lat}/${lng}&aqi=no`)
    .then(data => {
        console.log(data);
        const { city, country, region } = data;

        WeatherDetails(city);

        updateRegion(region, country);


    })
        .catch(err => {
            renderError(err);
        });

}


//get city
function success(pos) {
    const { latitude: lat, longitude: lng } = pos.coords;

   getPlace(lat,lng);
}


// fetch('http://api.weatherapi.com/v1/current.json?key=49eda03a1d524774b5962019230502&q=bhopal&aqi=no').then(res=>
// res.json()).then(data=>{
//     console.log(data);
// })