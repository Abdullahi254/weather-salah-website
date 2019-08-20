const request = require('request')




const dailySummary = (long,lat,callbk)=>{
    const url1 = "https://api.darksky.net/forecast/34632e77f61ff4dd696526be637e30e3/"+
     lat + ',' +long+'?units=si';
    request({url:url1, json:true},(error,{body})=>{
    if(error){
        callbk("oops! Something went wrong",undefined)
    }else if(body.error){
        callbk("unable to find location",undefined)
    }else{
        callbk(undefined,
            {summary: body.hourly.summary,
             temp: body.currently.temperature
        })
    }
    })

}

// dailySummary(37.8267,-122.4233,(er,data)=>{
//     console.log('Daily summary: ',data.summary)
// })
 
module.exports = dailySummary