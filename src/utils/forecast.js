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
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
            })
            
        }
    })
}

module.exports = forecast