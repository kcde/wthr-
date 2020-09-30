const switchBtn = document.querySelector(".switch");
const body = document.querySelector("body");

switchBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});
