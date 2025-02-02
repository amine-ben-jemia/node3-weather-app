const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
//Definir le chemain des repertoires 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



//Installer un repertoire statique (css img js)
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=> {
    res.render('index',{
        title: 'Weather App',
        name: 'Amine Ben Jemia'
    })
})
app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About Me',
        name: 'Amine Ben Jemia'
    })
})
app.get('/help',(req,res)=> {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Amine Ben Jemia'

    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return  res.send({
              error: 'You must provide a search term '
          })
      }
      geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if (error){
            return console.log(error)
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return console.log(error)
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData 

            })
        })
    })
    
})

    


app.get('/products',(req , res)=>{
    if (!req.query.search){
      return  res.send({
            error: 'You must provide a search term '
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})















app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Amine Ben Jemia',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Amine Ben Jemia',
        errorMessage:'Page not found'
    })
})


app.listen(port,() => {
    console.log('Server is up on port '+port)
})
