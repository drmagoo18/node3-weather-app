console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')
const weatherIcon = document.querySelector('#msg-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formAddress = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    weatherIcon.innerHTML = ''


    fetch('/todaysweather?address='+formAddress).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                weatherIcon.innerHTML = ''
            }
            else {
                messageOne.textContent = 'Weather for '+data.location
                const messageText = 'Today it is \''+data.forecast.weatherDescription+'\' with a temperature of '+data.forecast.temperature+'<span>&#176;</span>. It currently feels like '+data.forecast.feelsLike+'<span>&#176;</span>'
                messageTwo.innerHTML = messageText
                const icon = '<img src="'+data.forecast.weatherIcon+'" />'
                weatherIcon.innerHTML = icon
                console.log(data.location)
                console.log(data.forecast.feelsLike)
                console.log(data.forecast.temperature)
                console.log(data.forecast.weatherDescription)
            }
        })
    })
})