const request = require('request');
const weatherstackKey = "7ca562247082c7eb4de1c1bdcc82eca6";


const current = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+weatherstackKey+'&query='+lon+','+lat;
    request({url, json: true}, (error,response) => {
        if (error){
            console.log(response);
            callback('Unable to connect to the weather database.',undefined);
        } else if (!response.body.location){
            callback('Unable to find location for weather',undefined);
        } else {        
            callback(undefined,response.body.current.weather_descriptions[0]+' in '+response.body.location.name+'. It\'s currently '+response.body.current.temperature+ ' degrees out. It feels like '+ response.body.current.feelslike+'.');  
        }
    })

}

module.exports = current;