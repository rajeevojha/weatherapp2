const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicFloer = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')
// console.log(publicFloer)

const app = express()
const port = process.env.PORT || 3000
//set use of handlebar

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath,)
//define use of public folder

app.use(express.static(publicFloer))
// define routes
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        creator: 'Rajeev Ojha'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        creator: 'Rajeev Ojha'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About",
        creator: 'Rajeev Ojha'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error: 'You must provide an address'})
    }
    
    geoCode(req.query.address,(error,{lat,lon,location} = {})=>{
        if (error){
            return res.send({error})
        }
        forecast(lat,lon,(error,forecastdata)=>{
            if (error) {
                return res.send({error})
            }
            res.send({lat,lon,location,weather})
            
        })    
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404pg',{
        title: "404",
        creator: 'Rajeev Ojha',
        errorMsg: 'No help page for this ...'
    })
})

app.get('*',(req,res)=>{
    res.render('404pg',{
        title: "404",
        creator: 'Rajeev Ojha',
        errorMsg: "No such page exist"
    })
})
app.listen(port,()=>{
    console.log("server started");
})




    