const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/f06ea6770ace7ed750d3f0d893447f97/'+latitude+','+longitude+'?units=si'
    request({url, json:true}, (error, { body }) =>{
        if (error){
            callback('Unable to connect to wather service!', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+
            body.currently.precipProbability+ '% chance of rain.' )
        }
    })
}

module.exports = forecast