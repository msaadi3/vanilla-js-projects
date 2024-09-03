const API_KEY = import.meta.env.VITE_WEATHER_API

// Day and Date
const dateObj = new Date()
const dayOfWeek = dateObj.getDay();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDay = daysOfWeek[dayOfWeek];
const date = dateObj.getDate(); // Get the day (1-31)
const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const monthIndex = dateObj.getMonth(); // Get the month (0-11)
const year = dateObj.getFullYear(); // Get the year (e.g., 2023)
const formattedDate = `${date} ${monthNames[monthIndex]} ${year}`;


// getting the html elements
const dayElement = document.querySelector('.day')
const dateElement = document.querySelector('.date')
const temperature = document.querySelector('.temp')
const temperatureSVG = document.querySelector('.temp-svg')
const temperatureName = document.querySelector('.temp-name')
const locationTxt = document.querySelector('.location-txt')
const humidityNum = document.querySelector('.humidity-num')
const visibilityNum = document.querySelector('.visibility-num')
const pressureNum = document.querySelector('.pressure-num')
const windNum = document.querySelector('.wind-num')
const searchIcon = document.querySelector('.search-icon')
const input = document.querySelector('.input')
const forecastContainer = document.querySelector('.forecast-container')
const weatherSpinner = document.querySelector('.weather-spinner')
const forecastSpinner = document.querySelector('.forecast-spinner')

dayElement.innerHTML = currentDay
dateElement.innerHTML = formattedDate

const callAPI = async (lat, long) => {
    const currentAPI = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${long}`
    const forecastAPI = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat}, ${long}&days=7`

    weatherSpinner.style.display = 'block'
    await fetch(currentAPI)
        .then((response) => {
            if (!response.ok) {
                throw new Error('network response was not ok', response)
            } else {
                return response.json()
            }
        })
        .then((data) => {
            // console.log(data)
            locationTxt.innerHTML = data.location.name + ', ' + data.location.country
            temperatureSVG.src = data.current.condition.icon
            temperature.innerHTML = data.current.temp_c + '°C'
            temperatureName.innerHTML = data.current.condition.text
            humidityNum.innerHTML = data.current.humidity + '%'
            visibilityNum.innerHTML = data.current.vis_km + 'km'
            windNum.innerHTML = data.current.wind_mph + 'mph'
            pressureNum.innerHTML = data.current.pressure_mb + 'mb'
            weatherSpinner.style.display = 'none'

        })
        .catch((error) => { console.error('error while hitting the api / fetching the data', error) })


    // FORECAST 
    forecastSpinner.style.display = 'block'
    await fetch(forecastAPI)
        .then((response) => {
            if (!response.ok) {
                throw new Error('network response was not ok', response)
            } else {
                return response.json()
            }
        })
        .then((data) => {
            data.forecast.forecastday.map((value) => {
                // creating html elements
                const forecast = document.createElement('div')
                const forecastDate = document.createElement('p')
                const forecastTemp = document.createElement('span')
                const forecastIcon = document.createElement('img')
                const forecastWeather = document.createElement('p')
                const forecastTempIconContainer = document.createElement('div')
                // adding classes 
                forecast.classList.add('forecast')
                forecastDate.classList.add('forecast-date')
                forecastTemp.classList.add('forecast-temp')
                forecastIcon.classList.add('forecast-icon')
                forecastWeather.classList.add('forecast-weather')
                forecastTempIconContainer.classList.add('forecast-temp-icon-container')
                // appending elements
                forecast.appendChild(forecastDate)
                forecastTempIconContainer.appendChild(forecastTemp)
                forecastTempIconContainer.appendChild(forecastIcon)
                forecast.appendChild(forecastTempIconContainer)
                forecast.appendChild(forecastWeather)
                forecastContainer.appendChild(forecast)
                // setting data from api
                forecastDate.innerHTML = value.date
                forecastTemp.innerHTML = value.day.avgtemp_c + '°C'
                forecastWeather.innerHTML = value.day.condition.text
                forecastIcon.src = value.day.condition.icon
                forecastSpinner.style.display = 'none'

            })
        })
        .catch((error) => { console.error('error while hitting the api / fetching the data', error) })
}

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        callAPI(latitude, longitude)
    }, (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
            default:
                console.error('error while getting the location of user', error)
        }
    })
} else {
    alert('Geolocation is not supported in your browser.')
}


searchIcon.addEventListener('click', async () => {
    if (input.value === '') {
        return
    }
    weatherSpinner.style.display = 'block'
    const currentAPI = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input.value}`
    const forecastAPI = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${input.value}&days=7`

    await fetch(currentAPI)
        .then((response) => {
            if (!response.ok) {
                throw new Error('network response was not ok', response)
            } else {
                return response.json()
            }
        })
        .then((data) => {
            locationTxt.innerHTML = data.location.name + ', ' + data.location.country
            temperatureSVG.src = data.current.condition.icon
            temperature.innerHTML = data.current.temp_c + '°C'
            temperatureName.innerHTML = data.current.condition.text
            humidityNum.innerHTML = data.current.humidity + '%'
            visibilityNum.innerHTML = data.current.vis_km + 'km'
            windNum.innerHTML = data.current.wind_mph + 'mph'
            pressureNum.innerHTML = data.current.pressure_mb + 'mb'
            weatherSpinner.style.display = 'none'

        })
        .catch((error) => { console.error('error while hitting the api / fetching the data', error) })


    // FORECAST

    forecastContainer.innerHTML = ''
    forecastSpinner.style.display = 'block'
    await fetch(forecastAPI)
        .then((response) => {
            if (!response.ok) {
                throw new Error('network response was not ok', response)
            } else {
                return response.json()
            }
        })
        .then((data) => {
            data.forecast.forecastday.map((value) => {
                // creating html elements
                const forecast = document.createElement('div')
                const forecastDate = document.createElement('p')
                const forecastTemp = document.createElement('span')
                const forecastIcon = document.createElement('img')
                const forecastWeather = document.createElement('p')
                const forecastTempIconContainer = document.createElement('div')
                // adding classes 
                forecast.classList.add('forecast')
                forecastDate.classList.add('forecast-date')
                forecastTemp.classList.add('forecast-temp')
                forecastIcon.classList.add('forecast-icon')
                forecastWeather.classList.add('forecast-weather')
                forecastTempIconContainer.classList.add('forecast-temp-icon-container')
                // appending elements
                forecast.appendChild(forecastDate)
                forecastTempIconContainer.appendChild(forecastTemp)
                forecastTempIconContainer.appendChild(forecastIcon)
                forecast.appendChild(forecastTempIconContainer)
                forecast.appendChild(forecastWeather)
                forecastContainer.appendChild(forecast)
                // setting data from api
                forecastDate.innerHTML = value.date
                forecastTemp.innerHTML = value.day.avgtemp_c + '°C'
                forecastWeather.innerHTML = value.day.condition.text
                forecastIcon.src = value.day.condition.icon
                forecastSpinner.style.display = 'none'
            })
        })
        .catch((error) => { console.error('error while hitting the api / fetching the data', error) })

})

