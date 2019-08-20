const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const dailySummary = require('./dailySummary')
const prayerTime = require('./prayerTime')
app = express()

const port = process.env.PORT || 3000
//defines path for express config
const publicDirectory = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// registering partial paths path
hbs.registerPartials(partialsPath)

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather & Salah Time',
        name: 'Abdullahi Mohamud'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'HELP PAGE',
        name: 'Abdullahi Mohamud'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'ABOUT',
        name: 'Abdullahi Mohamud'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'No address included'})
    }
    geocode(req.query.address,(er,{place,cordinates}={})=>{
        if(er) return res.send({error:er})
        dailySummary(cordinates[0],cordinates[1],(er,{summary,temp})=>{
            if(er) return res.send({error:er})
            res.send({
                dailySummary: summary,
                temp: temp,
                location:place
            })
        })
       
    })
    
    
})

app.get('/prayertime',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'No address included'})
    }
    geocode(req.query.address,(er,{cordinates}={})=>{
        if(er) return res.send({error:er})
        prayerTime(cordinates[1],cordinates[0],(er,data)=>{
            if(er) return res.send({error:er})
            res.send(data)
        })
       
    })
    
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'HELP',
    })
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        title: 'ABOUT',
    })
})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(port,()=>{
    console.log('SERVER STARTED UP ON PORT '+ port)
})