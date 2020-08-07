const request = require('request')
const forecast = (lat,lang, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=e3828098c8f22440b120d1cc4f344061&query="+ lat + "," + lang + "&units=f"

    request.get({url:weatherURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to reach weather site',undefined)
        } else if (response.body.error){
            callback(response.body.error.info,undefined )
        } else {
            // callback(undefined,"The temperature at " + response.body.location.name + " is " + 
            //                     response.body.current.temperature + ' but it feels like ' + 
            //                     response.body.current.feelslike )
            callback(undefined,weather="The temperature at " + response.body.location.name + " is " + 
                                response.body.current.temperature + ' and it feels like ' + 
                                response.body.current.feelslike )
        }
    })
}

module.exports = forecast

