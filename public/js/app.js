const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageTwo.textContent = data.error
        } else {
            const weather = data.forecast.weather
            const temprature = data.forecast.temperature
            const feelsLike = data.forecast.feelslike

            messageOne.textContent =  "Today in " + data.location + " the weather is " + weather  +"  and it's " + temprature + " degrees celcius. But it feels like " + feelsLike + '.'
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})

    console.log('Fetching response..'); 
})