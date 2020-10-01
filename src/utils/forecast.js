const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'https://dark-sky.p.rapidapi.com/'+longitude+','+ latitude +'?lang=en&rapidapi-key=193353f303msh25a5888796e17c1p15d312jsnc68e5be546f3'
    request ({ url, json: true },(error, {body}) => {
            if (error){
                console.log('Unable to connect to weather service')
            }else{
                callback(undefined,body.daily.data[0].summary + 'Its is currently '+ body.currently.temperature+' degrees out. There is a '+ body.currently.precipProbability + '% chance of rain.')
             }
    })
}
module.exports = forecast