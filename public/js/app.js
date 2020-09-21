const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const loading = document.querySelector('#loading-msg')
weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    loading.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then( (response) =>{
        response.json().then ( (data) =>{
            loading.textContent = ''
            if(data.error){
                messageOne.textContent = data.error
            }else{

                let icon =  document.createElement('IMG')
                icon.src = data.image
                icon.className = 'weather-icon'

                let svg = document.createElement('IMG')
                svg.src= '/img/map-marker.svg'
                svg.className = 'svg'

                messageOne.appendChild(svg)
                let location = document.createTextNode(data.location)
                messageOne.appendChild(location) 
                
                messageTwo.appendChild(icon)
                let forecast = document.createTextNode(data.forecast)
                messageTwo.appendChild(forecast)
        }
        })
    })
})