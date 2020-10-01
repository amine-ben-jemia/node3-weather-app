const request = require('request')

const geocode = (address,callback) => {
   
    //On a utilise la fonction encodeURIComponent pour convertir car il ya un probleme quand il sagit des caracteres speciaux
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW1pbmVyb25pIiwiYSI6ImNrZmY2Mm5ubzBicGIyc291ZGNhNmhzZW4ifQ.hqLbJwZEaqqwxIOtslZFJQ&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address +'.json?access_token=pk.eyJ1IjoiYW1pbmVyb25pIiwiYSI6ImNrZmY2Mm5ubzBicGIyc291ZGNhNmhzZW4ifQ.hqLbJwZEaqqwxIOtslZFJQ&limit=1'
    request ({ url, json: true },(error, {body}) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        }else if (body.features.length === 0){
            callback('Unable to find location.Try another search',undefined)
        }else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode