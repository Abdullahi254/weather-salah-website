const request = require('request')

const addressToCord = (address,callbk)=>{
    const key = 'pk.eyJ1IjoiYWJkdWxsYWhpNTA0IiwiYSI6ImNqejFsb3U5dDBtZ2MzYmxuZG14Nm0wd2IifQ.Jm_kwUJPfaCQBLUCNPP1Dg'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+key+
                '&limit=1'
    request({url:url, json:true},(error,{body})=>{ 
        if(error){
            callbk("oops! Something went wrong")
        }else if(body.message){
            callbk("unable to find location! Try with a different name")
        }else if(body.features.length < 1){
           callbk("unable to find location! Try with a different name")
        }
        else{
            const cord =  body.features[0].center
            callbk(undefined,
                {place: body.features[0].place_name,
                cordinates: cord
                })
        }
    })
}

// addressToCord('Eldoret',(er,data)=>{
//     console.log(data.cordinates)
// })

module.exports = addressToCord