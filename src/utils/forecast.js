const request = require('postman-request')
// const geocode = require('./geocode')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f97937757a2135bc9b64d269ba96678c&query='+ lat + ','+ long + '&units=f'

    console.log(url)

    request({ url, json: true}, (error, { body }) => {
        try {
            if(error) {
                throw error
            } else if(body.error) {
               callback('Unable to reach the forecast services: '+ body.error, undefined)
            } else {
                callback(undefined, {
                    weatherDescription: body.current.weather_descriptions[0],
                    weatherIcon: body.current.weather_icons[0],
                    temperature: body.current.temperature,
                    feelsLike: body.current.feelslike,
                    humidity: body.current.humidity
                })
            }
        } catch (e) {
            callback('Unable to connect to weather service!', undefined)
        }
    })
}

module.exports = forecast