navigator.geolocation.getCurrentPosition(pos => {
    fetch(`/location?longitude=${pos.coords.longitude}&latitude=${pos.coords.latitude}`)
        .then(res => {
            res.json().then(name => {
                fetch(`/weather?address=${name.placeName}`).
                    then((res) => {
                        res.json().then((data) => {
                            console.log(data)
                            if (data.error) {
                                message1.textContent = data.error
                            } else {
                                message1.textContent = data.dailySummary
                                message2.textContent = "Temperature: " + data.temp + ' degrees\ncurrently: ' + data.currently
                                message0.textContent = data.location
                            }
                        })


                    })
                fetch(`/prayertime?address=${name.placeName}`).
                    then((res) => {
                        console.log(res)
                        res.json().then((data) => {
                            console.log(data)
                            if (data.error) {
                                message1.textContent = data.error
                            } else {
                                message3.textContent = ''
                                heading.textContent = 'Prayer Time'
                                for (const i in data) {
                                    message3.textContent += ` ${i}: ${data[i]}\n`
                                }
                            }
                        })


                    })  
            })
        })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message0 = document.querySelector('#message0')
const message3 = document.querySelector("#message3")
const heading = document.querySelector("#prayerH")
message3.setAttribute('style', 'white-space: pre;')
message2.setAttribute('style', 'white-space: pre;')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    message0.textContent = ''
    fetch('/weather?address=' + location).
        then((res) => {
            res.json().then((data) => {
                console.log(data)
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.dailySummary
                    message2.textContent = "Temperature: " + data.temp + ' degrees\ncurrently: ' + data.currently
                    message0.textContent = data.location
                }
            })


        })

    fetch('/prayertime?address=' + location).
        then((res) => {
            res.json().then((data) => {
                console.log(data)
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message3.textContent = ''
                    heading.textContent = 'Prayer Time'
                    for (const i in data) {
                        message3.textContent += ` ${i}: ${data[i]}\n`
                    }
                }
            })


        })
})