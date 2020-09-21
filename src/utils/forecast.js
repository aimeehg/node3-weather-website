const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=e2d22b51615dea73070cc993d6e3dde3&query=${latitude},${longitude}`
    request({url, json:true}, (error, { body }) =>{
        if (error){
            callback('Unable to connect to wather service!', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, `${body.current.weather_descriptions}. 
            It is currently ${body.current.temperature} degrees out. 
            Feels like ${body.current.feelslike} degrees. 
            There is a ${body.current.precip}% chance of rain.`, body.current.weather_icons[0] )
        }
    })
}

module.exports = forecast