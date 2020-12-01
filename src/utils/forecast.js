const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=380d81bf9f0f8f012538d3f938a39eb5&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude)

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to access forecast service', undefined)
        } else if (body.error) {
            callback('Unable to access mentioned city. Try another.', undefined)
        } else {
            callback(undefined, {
                time: body.current.observation_time,
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                icon: body.current.weather_icons[0],
                windDirection: body.current.wind_dir,
                windSpeed: body.current.wind_speed,
                humidity: body.current.humidity
            })
            
        }
    })
}

module.exports = forecast