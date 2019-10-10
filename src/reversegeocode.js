const request = require('request')

const reverseGeo = (position,callbk) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.longitude},${position.latitude}.json?access_token=pk.eyJ1IjoiYWJkdWxsYWhpNTA0IiwiYSI6ImNqejFsb3U5dDBtZ2MzYmxuZG14Nm0wd2IifQ.Jm_kwUJPfaCQBLUCNPP1Dg`
    request({ url, json: true }, (er, { body }) => {
        if (er) return {
            error: er
        }
        callbk ({
            placeName: (body.features[0].place_name)
        })

    })
}
// reverseGeo({longitude: 35.2698368,
//     latitude:0.49889279999999997},(name)=>{
//         console.log(name.placeName)
//     })


module.exports = reverseGeo