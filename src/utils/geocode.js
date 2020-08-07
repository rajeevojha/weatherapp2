const request = require('request')
const geoCode = (address,callback)=>{
    const mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address  + ".json?access_token=pk.eyJ1IjoicmFqZWV2b2poYSIsImEiOiJja2RkeDdzYzUwMTU2MnRwZjdyZWd3Njd2In0.ObVt466a9WJuR-OZGUiYvg&limit=1"

    request.get({url:mapboxURL,json:true},(error,response)=>{
        if(error){
            callback(error, undefined)
        } else if(response.body.features.length > 0){            
            data = {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],  
                location: response.body.features[0].place_name
            }            
            callback(undefined,data)            
        } else {
            callback('Please check the location passed - ' + response.body.query, undefined)
        }
    })
}
module.exports = geoCode
