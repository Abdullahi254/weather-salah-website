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
             temp: body.currently.temperature,
             currently: body.currently.summary
        })
    }
    })

}

// dailySummary(0.504848, 35.280373, (er,data)=>{
//     console.log('Daily summary: ',data.summary)
// })
 
module.exports = dailySummary