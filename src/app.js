const path = require('path')
const express = require('express')
const { join } = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars and views
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ron Ogden'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is a message for help",
        title: 'Help',
        name: 'Ron Ogden'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ron Ogden'
    })
})

app.get('/todaysweather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products'), (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    req.query()
    res.send({
        products: []
    })
}

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ron Ogden',
        message: 'Help Article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ron Ogden',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})