const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', (evt) => {
    if (evt.keyCode === 13) {
      getResults(searchbox.value);
    }
  });
  
  async function getResults(query) {
    try {
      const response = await fetch(`${api.base}weather?q=${encodeURIComponent(query)}&units=metric&APPID=${api.key}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const weather = await response.json();
      displayResults(weather);
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  }
  
  function displayResults(weather) {
    if (!weather.name) {
      console.error('Invalid weather data received:', weather);
      return;
    }
  
    const city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    const now = new Date();
    const date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    const temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    const weatherEl = document.querySelector('.current .weather');
    weatherEl.innerText = weather.weather[0].main;
  
    const hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }