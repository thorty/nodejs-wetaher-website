const request = require('request');
const mapboxKey="pk.eyJ1IjoidGhvcnN0ZW53IiwiYSI6ImNrOHU2ZzJjbjA1NGUzaGsybnN4MG9wd3UifQ.O9PORAyibHigPrBIfJQMNg";


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ decodeURIComponent(address)+".json?access_token="+mapboxKey+"&language=de&limit=1"
    
    request({url, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to mapbox services', undefined);
        } else if (!response.body.features[0]){
            callback('Unable to find location ' +address, undefined);        
        } else {        
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            callback(undefined, {
                                 latitude,
                                 longitude,
                                 location: response.body.features[0].place_name 
                                }
                    ); 
        }
    });
}

module.exports = geocode
