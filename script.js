const time = document.querySelector('.time');
const date = document.querySelector('.date');

setInterval(() => {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    time.textContent = `${hours}:${minutes}`
}, 1000);

setInterval(() => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth()+1).padStart(2, '0');
    const year = now.getFullYear();
    date.textContent = `${day}.${month}.${year}`;
}, 1000);

const menu = document.querySelector('.menu');
const arrow = document.querySelector('.arrow');
arrow.addEventListener('click', () => {
    menu.classList.toggle("active");
    arrow.classList.toggle("active");
})


