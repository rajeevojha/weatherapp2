console.log('a client side js file')

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             return console.log(data.error,'dataerror')
//         }
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value
    const msg1 = document.querySelector("#msg1")
    const msg2 = document.querySelector("#msg2")
    msg1.textContent = "Loading...."
    msg2.textContent = ""
    console.log(search.value)
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return msg1.textContent = data.error
                // return console.log(data.error,'dataerror')
                
            }
            msg1.textContent = data.location
            msg2.textContent = data.weather
        })
    })
})