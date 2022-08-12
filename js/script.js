    "use strict"
    // const userLang = navigator.language;
    let userLang = 'ru-Ru';
    const time = document.querySelector('.time');
    const date = document.querySelector('.date');
    const greeting = document.querySelector('.greeting');
    const MORNING_LABEL_RU = 'Доброе утро';
    const AFTERNOON_LABEL_RU = 'Добрый день';
    const EVENING_LABEL_RU = 'Добрый вечер';
    const NIGHT_LABEL_RU = 'Доброй ночи';
    const MORNING_LABEL_EN = 'Good morning';
    const AFTERNOON_LABEL_EN = 'Good afternoon';
    const EVENING_LABEL_EN = 'Good evening';
    const NIGHT_LABEL_EN = 'Good night';
    let daytimeSlider = '';
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const weatherDescription = document.querySelector('.weather-description');
    const city = document.querySelector('.city');
    city.value = '';
    const name = document.querySelector('.name');
    const weatherContainer = document.querySelector('.description-container');
    const weatherError = document.querySelector('.weather-error');
    const body = document.querySelector('body');
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const changeQuoteButton = document.querySelector('.change-quote');
    const QUOTES_URL_RU = 'https://run.mocky.io/v3/7d9000aa-9ea1-44bb-8386-b950df0b0de4';
    const QUOTES_URL_EN = 'https://run.mocky.io/v3/c78a54d5-276e-4180-949e-76c318a18e3a';
    let userLanguage = '';
    const settingsButton = document.querySelector('.button-bg');
    const closeSettings = document.querySelector('.settings-close');
    const buttonRU = document.querySelector('.button-ru');
    const buttonEN = document.querySelector('.button-en');
    const settingsMenu = document.querySelector('.settings-menu');
    const API_KEY = '57a51c351fa187e271551787ff963f62';

    // Time and date 
    function showTime() {
        const date = new Date();
        const currentTime = date.toLocaleTimeString();
        time.textContent = currentTime;
        showDate();
        showGreetingRU();
        if (userLanguage === 'ru') {
            showGreetingRU();
        } else if (userLanguage === 'en') {
            showGreetingEN();
        }
        setTimeout(showTime, 1000);
    }

    showTime();

    function showDate() {
        const setDate = new Date();
        const options = {weekday: 'long', day: 'numeric', month: 'long'};
        const currentDate = setDate.toLocaleDateString(userLang, options);
        date.textContent = currentDate;
    }

    // Greeting
    function showGreetingRU() {
        const date = new Date();
        const hours = date.getHours();
        let now = '';
        if (hours >= 6 && hours <= 11) {
            now = MORNING_LABEL_RU;
        } else if (hours >= 12 && hours <= 17) {
            now = AFTERNOON_LABEL_RU;
        } else if (hours >= 18 && hours <= 23) {
            now = EVENING_LABEL_RU;
        } else {
            now = NIGHT_LABEL_RU;
        }
        greeting.textContent = now;
    }

    function showGreetingEN() {
        const date = new Date();
        const hours = date.getHours();
        let now = '';
        if (hours >= 6 && hours <= 11) {
            now = MORNING_LABEL_EN;
        } else if (hours >= 12 && hours <= 17) {
            now = AFTERNOON_LABEL_EN;
        } else if (hours >= 18 && hours <= 23) {
            now = EVENING_LABEL_EN;
        } else {
            now = NIGHT_LABEL_EN;
        }
        greeting.textContent = now;
    }

    // Save data and reload
    function setLocalStorage() {
        localStorage.setItem('name', name.value);
        localStorage.setItem('city', city.value);
        localStorage.setItem('lang', userLanguage);
    };

    window.addEventListener('beforeunload', setLocalStorage)

    function getLocalStorage() {
        if(localStorage.getItem('name')) {
            name.value = localStorage.getItem('name');
        }
        if(localStorage.getItem('lang')) {
            userLanguage = localStorage.getItem('lang');
            changeLanguage();
        }
        if(localStorage.getItem('city')) {
            city.value = localStorage.getItem('city');
            getWeather();
        } else {
            city.value = userLanguage === 'en' ? 'Minsk' : 'Минск';
            getWeather();
        }
    };

    window.addEventListener('load', getLocalStorage)

    // Slider
    let daytime;
    let randomNum;

    function getTimeOfDay() {
        const date = new Date();
        const hours = date.getHours();

        if (hours >= 6 && hours <= 11) {
            daytimeSlider = 'morning';
        } else if (hours >= 12 && hours <= 17) {
            daytimeSlider = 'afternoon';
        } else if (hours >= 18 && hours <= 23) {
            daytimeSlider = 'evening';
        } else {
            daytimeSlider = 'night';
        }
    };

    getTimeOfDay();

    function getRandomNum() {
        const min = 1;
        const max = 20;
        randomNum = (Math.floor(Math.random() * (max - min + 1)) + min).toString().padStart(2, "0");
    };

    getRandomNum()

    function setBg() {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daytimeSlider}/${randomNum}.jpg`;
        img.onload = () => {     
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${daytimeSlider}/${randomNum}.jpg')`;
        };
    }

    setBg();

    function getSlideNext() {
        randomNum = randomNum === '20' ? '01' : (+randomNum + 1).toString().padStart(2, "0");
        setBg();
    }

    slideNext.addEventListener('click', getSlideNext);

    function getSlidePrev() {
        randomNum = randomNum === '01' ? '20' : (+randomNum - 1).toString().padStart(2, "0");
        setBg();
    }

    slidePrev.addEventListener('click', getSlidePrev);

    // Weather
    changeLanguage();
    async function getWeather() {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=${userLanguage}&appid=${API_KEY}&units=metric`;
            
            if (!city.value) {
                url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=${userLanguage}&appid=${API_KEY}&units=metric`;
            } else {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${userLanguage}&appid=${API_KEY}&units=metric`;
            };
            
            weatherContainer.style.visibility = 'visible';
            wind.style.visibility = 'visible';
            humidity.style.visibility = 'visible';
            weatherError.textContent = ``;
            const res = await fetch(url);
            const data = await res.json(); 
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${Math.floor(data.main.temp)} °C`;
            weatherDescription.textContent = `${data.weather[0].description}`;
            if (userLanguage === 'ru') {
                wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
                humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)} %`;
            } else {
                wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
                humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`;
            }
        }
        catch(error) {
            weatherContainer.style.visibility = 'hidden';
            wind.style.visibility = 'hidden';
            humidity.style.visibility = 'hidden';
            weatherError.textContent = `Error! city not forund for '${city.value}'!`;
        }
    }
    getWeather();

    city.addEventListener('change', getWeather);

    // Quote
    let currentQuote;

    function checkQuotesLang() {
        if (userLanguage === 'ru') {
            getQuotesRU();
        } else if (userLanguage === 'en') {
            getQuotesEN();
        }
    }
    checkQuotesLang()

    async function getQuotesRU() {  
        let res = await fetch(QUOTES_URL_RU);
        const data = await res.json();
        let randomQuoteNum = getRandomQuoteNum(data.length);
        if (currentQuote === randomQuoteNum) {
            randomQuoteNum = getRandomQuoteNum(data.length);
        }
        currentQuote = randomQuoteNum;
        quote.textContent = data[randomQuoteNum].text;
        author.textContent = data[randomQuoteNum].author;
    }

    async function getQuotesEN() {  
        let res = await fetch(QUOTES_URL_EN);
        const data = await res.json();
        let randomQuoteNum = getRandomQuoteNum(data.length);
        if (currentQuote === randomQuoteNum) {
            randomQuoteNum = getRandomQuoteNum(data.length);
        }
        currentQuote = randomQuoteNum;
        quote.textContent = data[randomQuoteNum].text;
        author.textContent = data[randomQuoteNum].author;
    }

    function getRandomQuoteNum(maxLength) {
        const min = 0;
        const max = maxLength - 1;
        return (Math.floor(Math.random() * (max - min + 1)));
    };

    changeQuoteButton.addEventListener('click', checkQuotesLang);

    // Audio player
    let isPlay = false;
    let playNum = 0;
    const playButton = document.querySelector('.play');
    const playNextButton = document.querySelector('.play-next');
    const playPrevButton = document.querySelector('.play-prev');
    const playListContainer = document.querySelector('.play-list');
    const audio = new Audio();

    playButton.addEventListener('click', togglePlayBtn);
    playNextButton.addEventListener('click', playNext);
    playPrevButton.addEventListener('click', playPrev);

    function playAudio(wasChanged = false) {
        if (wasChanged) {
            isPlay = !wasChanged;
        }    
        if (!isPlay) {
            isPlay = true;
            audio.src = playList[playNum].src;
            audio.currentTime = 0;
            audio.play();
            setLiStyle();
        } else {
            isPlay = false;
            audio.pause();
        }
    };

    function togglePlayBtn() {
        playButton.classList.toggle('pause');
        playAudio();
    };

    function playNext() {
        changeSong('next');
        playAudio(true);
        playButton.classList.add('pause');
    };

    function playPrev() {
        changeSong('prev');
        playAudio(true);
        playButton.classList.add('pause');
    };

    function changeSong(direction) {
        if (direction === 'next') {
            playNum = playNum < playList.length - 1 ? (playNum += 1) : 0;
        } else if (direction === 'prev') {
            playNum = playNum === 0 ? playList.length - 1 : (playNum -= 1);
        }
    };

    import playList from './playList.js';

    function addPlaylist() {
        playList.forEach((element, index) => {
            const li = document.createElement('li');
            li.classList.add('play-item');
            li.dataset.num = index;
            li.onclick = playByClick;
            li.textContent = element.title;
            playListContainer.append(li);
        });
    };

    addPlaylist();

    function playByClick(event) {
        const li = event.target;
        if (li.classList.contains('item-active')) {
            togglePlayBtn();
            return;
        }
        playNum = +li.dataset.num;
        playButton.classList.add('pause');
        playAudio(true);
    };

    function setLiStyle() {
        const liElements = document.querySelectorAll('.play-item');
        
        for (let i = 0; i < liElements.length; i++) {
            if (playNum === i) {
                liElements[i].classList.add('item-active');
            } else {
                liElements[i].classList.remove('item-active');
            }
        }
    };

    audio.addEventListener('ended', (event) => {
        playNext();
    });

    // Settings
    function openSettingsMenu() {
        settingsMenu.classList.add('settings-menu-active');
    };

    function closeSettingsMenu() {
        settingsMenu.classList.remove('settings-menu-active');
    };

    function ButtonRuPushed() {
        userLanguage = 'ru';
        changeLanguage();
        settingsMenu.classList.remove('settings-menu-active');

    };

    function ButtonEnPushed() {
        userLanguage = 'en';
        changeLanguage();
        settingsMenu.classList.remove('settings-menu-active');
    }

    document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(settingsMenu && settingsButton);
        if ( !click ) {
            settingsMenu.classList.remove('settings-menu-active');
        }
    });

    settingsButton.addEventListener('click', openSettingsMenu);
    closeSettings.addEventListener('click', closeSettingsMenu);
    buttonRU.addEventListener('click', ButtonRuPushed);
    buttonEN.addEventListener('click', ButtonEnPushed);

    // Translation
    function changeLanguage() {
        if (userLanguage === 'en') {
            userLang = 'en-En';
            showDate();
            showGreetingEN();
            checkQuotesLang();
            changeMenuLanguage(userLanguage);
            getWeather();
            buttonEN.classList.add('button-en-active');
            buttonRU.classList.remove('button-ru-active');
        } else {
            userLanguage = 'ru';
            userLang = 'ru-Ru';
            showDate()
            showGreetingRU();
            checkQuotesLang();
            changeMenuLanguage(userLanguage);
            getWeather();
            buttonRU.classList.add('button-ru-active');
            buttonEN.classList.remove('button-en-active');
        }
    };

    function changeMenuLanguage(language) {
        if (language === 'en') {
            document.querySelector('.settings-title').textContent = "Settings";
            document.querySelector('.settings-language').textContent = "Language";
            document.querySelector('.button-ru').textContent = "Russian";
            document.querySelector('.button-en').textContent = "English";
        } else {
            document.querySelector('.settings-title').textContent = "Настройки";
            document.querySelector('.settings-language').textContent = "Язык";
            document.querySelector('.button-ru').textContent = "Русский";
            document.querySelector('.button-en').textContent = "Английский";
        }
    };