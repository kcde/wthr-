const switchBtn = document.querySelector(".switch");
const body = document.querySelector("body");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const day = document.querySelector(".day");
const time = document.querySelector(".time");
const date = new Date();

// list of weather icons

const sun = '<i class="fad fa-sun"></i>';
const sunCloud = '<i class="fas fa-sun-cloud"></i>';
const cloud = '<i class="fad fa-cloud"></i>';
const doubleCloud = '<i class="fad fa-clouds"></i>';
const cloudRain = '<i class="fad fa-cloud-showers-heavy"></i>';
const sunCloudRain = '<i class="fad fa-cloud-sun-rain"></i>';
const cloudThunder = '<i class="fad fa-thunderstorm"></i>';
const snow = '<i class="fad fa-snowflakes"></i>';
const mist = '<i class="fad fa-fog"></i>';
switchBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

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

const timeRender = () => {
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const aOrP = hour > 11 ? "PM" : "AM";

    hour = hour > 12 ? hour - 12 : hour;
    min = min < 10 ? `0${min}` : min;
    // sec = sec < 10 ? `0${sec}` : sec;

    const g = `${hour}:${min} ${aOrP}`;

    time.innerHTML = g;
};

dayRender();

setInterval(timeRender, 1000);
