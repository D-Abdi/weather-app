const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const timeText = document.querySelector('#time')
const weatherIcon = document.getElementById('weather-icon')

const showImage = () => {
    weatherIcon.style.visibility = 'visible';
}

const hideImage = () => {
    weatherIcon.style.visibility = 'hidden';
}

hideImage()

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    hideImage();
    timeText.textContent = ''
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageTwo.textContent = data.error
        } else {
            const time = data.forecast.time
            const weather = data.forecast.weather
            const temprature = data.forecast.temperature
            const feelsLike = data.forecast.feelslike
            const icon = data.forecast.icon

            weatherIcon.src = icon
            showImage()
            timeText.textContent = time
            messageOne.textContent = "Today in " + data.location + " the weather is " + weather  +"  and it's " + temprature + " degrees celcius. But it feels like " + feelsLike + '.'

            console.log(data.location);
            console.log(data.forecast);
        }
    })
})

    console.log('Fetching response..'); 
})