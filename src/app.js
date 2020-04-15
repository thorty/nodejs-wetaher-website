const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request');
const geocode = require('./utils/geocode')
const current = require('./utils/current')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Define Method for getting weather data
//with object destructuring
const getWeather = (location, callback) => {

    //Callback chaining
    //return that function exits
    geocode(location, (error, {longitude,latitude,location}={}) => {
        if (error) {
            callback(error, undefined);
        } else {
            current(longitude, latitude, (error, currentWeather) => {
                if (error) {
                    callback(error, undefined);
                } else {
                    callback(undefined, {location, currentWeather})
                }
            })
        }
    })

}


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dondald Duck'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dondald Duck'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dondald Duck'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        getWeather( req.query.address, (error, data) => {
            if (error){
                res.send({error})
            } else {
                res.send({ 
                    address: req.query.address,
                    location: data.location,
                    weather: data.currentWeather            
                })
            }            
        })
    }    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dondald Duck',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dondald Duck',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})