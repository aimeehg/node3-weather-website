const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Aimee Hernandez'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Aimee Hernandez'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        message: 'this is a message',
        name: 'Aimee Hernandez'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        // error from geocode
        if (error){
          return  res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            //error from forecast
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

          })
    

    })

 /*    res.send({
        forecast: 'It is cloudy',
        location: 'miahuatlan de porfirio diaz',
        address: req.query.address
    }) */
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
       return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*' ,(req, res)=>{
    res.render('404pages',{
        message: 'Help article not found',
        title: '404 page',
        name: 'Aimee Hernandez'
    })
})


app.get('*', (req, res) =>{
    res.render('404pages',{
        message: 'Page not found',
        title: '404 page',
        name: 'Aimee Hernandez'
    })
})

app.listen(port, () =>{
    console.log('server is up on port ' + port)
})