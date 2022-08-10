// =============== Time solve ===========

const time = document.querySelector('.time');
const date = document.querySelector('.date');
function showTime() {
    setInterval(() => {
        let t = new Date()
        time.innerHTML = t.toLocaleString('en-US', {
            hour12: false,
        }).substring(11, 20)

        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        let currentDate = t.toLocaleDateString('en-En', options);
        date.innerHTML = currentDate
    }, 1000)    
}
showTime()

// ================= Day or Night =========== 

const greetingSpan = document.querySelector('.greeting');

const getTime = getTimeOfDay()
const greeting = ` Good ${getTime}`
greetingSpan.innerHTML = greeting

function getTimeOfDay() {
    let time = new Date().getHours()
    if(time >= 5 && time < 12){
        return 'morning'
    }else if(time >= 12 && time < 18){
        return 'afternoon'
    }else if(time >= 18 && time < 21){
        return 'evening'
    }else{
        return 'night'
    }
}

// ================= slider Img ==============

const body = document.querySelector('body');

const slider = document.querySelectorAll('.slider-icon');
slider.forEach(item => {
    item.addEventListener('click', (e) => {
        body.style.background = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${getRandomNum()}.jpg')`;
    })
})

function getRandomNum(){
    let num = Math.floor(Math.random() * 21)
    if(num < 10){
        num = '0' + num
    }
    return num
}

// ==================== Weather ==============

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
cityy()

function cityy(params) {
    city.addEventListener('change', (event) => {
        getWeather(city.value)
        return 
    })
    return getWeather(city.value)
}
async function getWeather(cityy) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.innerHTML = `${data.main.temp}°C`;
    weatherDescription.innerHTML = data.weather[0].description;
    weatherError.innerHTML = ''
    } catch (error) {
        weatherIcon.classList.value = 'weather-icon owf'
        temperature.innerHTML = ''
        weatherDescription.innerHTML = ''
        weatherError.innerHTML = `Error! city not found for '${cityy}'!`
    }
}

// ===================== music

function allMusic() {
    const allMusic = [
        {
            title: 'Aqua Caelestis',
            src: '../assets/sounds/Aqua Caelestis.mp3',
            duration: '00:58'
        }, {
            title: 'River Flows In You',
            src: '../assets/sounds/River Flows In You.mp3',
            duration: '03:50'
        },
        {
            title: 'Summer Wind',
            src: '../assets/sounds/Summer Wind.mp3',
            duration: '05:05'
        },
        {
            title: 'Ennio Morricone',
            src: '../assets/sounds/Ennio Morricone.mp3',
            duration: '05:03'
        }
    ]
    return allMusic
}
const playList = document.querySelector('.play-list');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');

// Music names
allMusic().forEach(val => {
    const play_item = document.createElement('li');

    play_item.classList.add("play-item")

    const nameText = document.createTextNode(`${val.title}`)

    play_item.appendChild(nameText)

    playList.appendChild(play_item)
})

//  paused
let i = 0

let audio = new Audio();

audio.src = allMusic()[i].src

const play = document.querySelector('.play');

play.addEventListener("click", playPauseHandler)

function playPauseHandler() {
    play.classList.toggle("pause")
    play_item[i].classList.add("item-active")
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// next prev buttons
const play_item = document.querySelectorAll('.play-item');

playNext.addEventListener("click", nextHandler)
playPrev.addEventListener("click", prevHandler)


function nextHandler() {
    i++
    play.classList.add("pause")

    audio.src = allMusic()[i].src

    audio.play()

    play_item.forEach((val) => val.classList.remove("item-active"))

    play_item[i].classList.add("item-active")


    if (i >= play_item.length) {
        i = 0
    }
}

function prevHandler() {
    play.classList.add("pause")

    play_item.forEach((val) => val.classList.remove("item-active"))

    i--
    if (i < 0) {
        i = play_item.length - 1
    }
    play_item[i].classList.add("item-active")
    audio.src = allMusic()[i].src

    audio.play()
}

// ================ quote ================
const ResButton = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

let s = 0
function getQuotes() {
    const quotes = '../data/data.json';
    fetch(quotes)
        .then(res => res.json())
        .then(data => {
            if (s == data.length) {
                s = 0
            }
            quote.textContent = data[s].text;
            author.textContent = data[s].author;
            s++

        });
}
getQuotes();

ResButton.addEventListener('click', getQuotes)

// ==================== local inp===============
const name = document.querySelector('.name');
name.addEventListener('input', function () {
    localStorage.setItem('name', name.value);
})
if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
}