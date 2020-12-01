const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//configure express
const app = express()

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
//Set up views location
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set express handblebars
app.set('view engine', 'hbs')
//Point express towards custom views dir.
app.set('views', viewsPath)
//Partials config
hbs.registerPartials(partialsPath)
//Customise server
app.use(express.static(publicDirPath))

//setting up routes. the arguments are request and response
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel Abdi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Daniel Abdi'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        name: 'Daniel Abdi',
        tip: 'Remove info after / to return to the homepage'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
                
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location
            })
            
        }) 
    }
)
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    console.log(req.query);
    res.send({
        poducts: []
    })
})

app.get('/contact/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Contact page not found'
    })
})

//Match anything that's not a route (404 page)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found'
    })
})


//Start up the server and makes it listen on a given port
//Arg1 = port, Arg2 = callback
app.listen(port, () => {
    console.log('Server is up on port' + port);
})
