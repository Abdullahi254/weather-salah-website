const request= require('request')
const geocode = require('./geocode')
const prayerTime = (lat,long,callbk)=>{
    const url = 'http://api.aladhan.com/v1/calendar?latitude='+lat+'&longitude='+long+'&method=4&month=8&year=2019&timezonestring=Africa/Nairobi';
    request({json:true,url},(er,res)=>{
        if(er) return callbk(er.errno,undefined)
        else if (res.body.code == 403){
            callbk('Unable to access host! check url',undefined)
        }else{
            callbk(undefined,res.body.data[0].timings)
        }
    })
}


// geocode('uasin gishu',(er,data)=>{
//     if(er) return console.log(er)
//     console.log('UASIN GISHU PRAYER TIME: ')
//     prayerTime(data.cordinates[1],data.cordinates[0],(er,data2)=>{
//         if(er) return console.log(er)
//         console.log(data2)
//     })
// })

// prayerTime(0.504848,35.280373,(er,data2)=>{
//     if(er) return console.log(er)
//     console.log(data2)
// })

module.exports = prayerTime