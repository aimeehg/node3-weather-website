const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYm91aXBvd2kiLCJhIjoiY2p4ZTFveG1nMGtkMzN1bWZnZjlvbGQycyJ9.4hzlhEl7Z7emwowbcYoWVA&limit=1'
    //antes: request ({url, json: true}, (error, response)=>{
    request ({url, json: true}, (error, { body })=>{
        if(error){
            callback('uUnable to connect to location services!', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        } else{
            callback(undefined, {
                // desconstructuring response.body.features[0].center[1]
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    } )
}

module.exports = geocode