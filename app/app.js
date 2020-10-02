const switchBtn = document.querySelector(".switch");
const searchBtn = document.querySelector(".search-btn");
const errorAlert = document.querySelector(".error");
const weatherInfo = document.querySelector(".weather-info");
const searchBox = document.querySelector(".search-box");
const body = document.querySelector("body");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const day = document.querySelector(".day");
const time = document.querySelector(".time");
const date = new Date();
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temp");
const tempExtra = document.querySelector(".temp-extra");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const feel = document.querySelector(".feel");

switchBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

// rendering day
const dayRender = () => {
    const currentDay = date.getDay();
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursay",
        "friday",
        "saturday",
    ];
    // day.innerHTML = days[day];
    day.innerHTML = days[currentDay];
};

//render time
const timeRender = () => {
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const aOrP = hour > 11 ? "PM" : "AM";

    hour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    min = min < 10 ? `0${min}` : min;
    // sec = sec < 10 ? `0${sec}` : sec;

    time.innerHTML = `${hour}:${min} ${aOrP}`;
    setTimeout(timeRender, 1000);
};

timeRender();
dayRender();

// function to select icon to display

const selectIcon = (code) => {
    // list of weather icons
    const sun = '<i class="fas fa-sun"></i>';
    const sunCloud = '<i class="fas fa-sun-cloud"></i>';
    const cloud = '<i class="fas fa-cloud"></i>';
    const doubleCloud = '<i class="fas fa-clouds"></i>';
    const cloudRain = '<i class="fas fa-cloud-showers-heavy"></i>';
    const sunCloudRain = '<i class="fas fa-cloud-sun-rain"></i>';
    const cloudThunder = '<i class="fas fa-thunderstorm"></i>';
    const snow = '<i class="fas fa-snowflakes"></i>';
    const mist = '<i class="fas fa-fog"></i>';
    const splitCode = code.split("").slice(0, 2).join("");
    switch (splitCode) {
        case "01":
            return sun;
            break;
        case "02":
            return sunCloud;
            break;
        case "03":
            return cloud;
            break;
        case "04":
            return doubleCloud;
            break;
        case "09":
            return cloudRain;
            break;
        case "10":
            return sunCloudRain;
            break;
        case "11":
            return cloudThunder;
            break;
        case "50":
            return mist;
            break;
        case "13":
            return snow;
            break;

        default:
            return sun;
            break;
    }
};

// making weather request

const getWeather = async () => {
    const apiKey = "0d140b8d00a8d3070d7f560ef3e063f6";
    const url = "http://api.openweathermap.org/data/2.5/weather?";
    let city = searchBox.value;

    //endpoint example: api.openweathermap.org/data/2.5/weather?q=city&appid=apiKey&units=metric
    const endpoint = `${url}q=${city}&appid=${apiKey}&units=metric`;
    console.log(endpoint);

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }

        let f = await response.json();
        return f;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const renderCountry = () => {
    getWeather().then((obj) => {
        let countryCode = obj.sys.country;
        let location = obj.name;
        let countryName = countries[countryCode];

        country.innerHTML = countryName;
        city.innerHTML = location;
    });
};

const renderIcon = () => {
    getWeather().then((obj) => {
        let icon = obj.weather[0].icon;
        console.log(selectIcon(icon));
        weatherIcon.innerHTML = selectIcon(icon);
    });
};

// Api temperature is already in celcius
const renderTemp = () => {
    getWeather().then((obj) => {
        let temp = Math.round(obj.main.temp);
        // rounding a floating number
        temperature.innerHTML = `${temp}&deg;C`;
    });
};

const renderTempExtra = () => {
    getWeather().then((obj) => {
        let extra = obj.weather[0].main;

        tempExtra.innerHTML = extra;
    });
};

const renderHumidity = () => {
    getWeather().then((obj) => {
        let humidityLevel = obj.main.humidity;

        humidity.innerHTML = `${humidityLevel}%`;
    });
};

const renderWind = () => {
    getWeather().then((obj) => {
        let windSpeed = obj.wind.speed;
        //coverting wind from m/s to km/hr
        wind.innerHTML = `${windSpeed * 3.6} km/hr`;
    });
};

const renderFeel = () => {
    getWeather().then((obj) => {
        let feelTemp = obj.main["feels_like"];

        feel.innerHTML = `${feelTemp}&deg;C`;
    });
};

const errorCheck = () => {
    getWeather().then((obj) => {
        if (obj.cod === "404") {
            weatherInfo.classList.add("no-show");
            errorAlert.classList.remove("no-show");
            return;
        }
    });
};

const renderAll = () => {
    weatherInfo.classList.remove("no-show");
    errorAlert.classList.add("no-show");
    renderIcon();
    renderTempExtra();
    renderWind();
    renderTemp();
    renderHumidity();
    renderFeel();

    renderCountry();
};

const search = () => {
    if (searchBox === null) {
        return;
    }
    errorCheck();
    renderAll();
    searchBox.value = "";
};

// renderCountry();

// submit event listener

searchBtn.addEventListener("click", () => {
    search();
});
