// Variables
const listaTweet = document.getElementById('lista-tweets')


// Event Listeners
evenListener()

function evenListener() {
    // Cuando se envia al formilario
    document.getElementById('formulario').addEventListener('submit', agregarTweet)

    // Borrar Tareas
    listaTweet.addEventListener('click', borrarTweet)

    // Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)
}

// Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault()
    // Leer el valor de texarea
    const tweet = document.getElementById('tweet').value
    // Crear boton de eliminar
    const botonBorrar = document.createElement('a')
    botonBorrar.classList = 'borrar-tweet'
    botonBorrar.innerText = 'X'
    // Crear elemento y añadirlo a la lista
    const li = document.createElement('li')
    li.innerText = tweet
    li.appendChild(botonBorrar) 
    listaTweet.appendChild(li)

    // Añadir al local storage
    agregarTweetLocalStorage(tweet)
}
// Elimnar tarea del DOM
function borrarTweet(e) {
    e.preventDefault()
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove()
        borrarTweetLocalStorage(e.target.parentElement.innerText)
    }
}

// Mostrar datos del localStorage
function localStorageListo() {
    let tweets

    tweets = obtenerTweetsLocalStorage()

    tweets.forEach(function(tweet) {
        // Crear boton de eliminar
        const botonBorrar = document.createElement('a')
        botonBorrar.classList = 'borrar-tweet'
        botonBorrar.innerText = 'X'

        // Crear elemento y añadirlo a la lista
        const li = document.createElement('li')
        li.innerText = tweet
        // Añade el boton borrar a la tarea
        li.appendChild(botonBorrar)
        // Añade la tarea a la clase
        listaTweet.appendChild(li)
    })
}

// Agregar tarea al local storage
function agregarTweetLocalStorage(tweet){
    let tweets
    tweets = obtenerTweetsLocalStorage()
    // Añadir la nueva tarea
    tweets.push(tweet)
    // Convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets))
    
}

// Comprobar que haya elemntos en el local storage
function obtenerTweetsLocalStorage(){
    let tweets

    // Revisar los valores de local storage
    if(localStorage.getItem('tweets') === null){
        tweets = []
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }
    return tweets
}

// Eliminar Tarea desde el local storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar
    // Eliminar la X de la tarea
    tweetBorrar = tweet.substring(0, tweet.length - 1)

    tweets = obtenerTweetsLocalStorage()

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet){
            tweets.splice(index, 1)
        }
    })
    
    localStorage.setItem('tweets', JSON.stringify(tweets))
}