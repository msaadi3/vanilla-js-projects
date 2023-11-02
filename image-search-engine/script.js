const input = document.querySelector('.input')
const searchBTN = document.querySelector('.search-btn')
const moreBTN = document.querySelector('.more-btn')
const imagesContainer = document.querySelector('.images')
const spinner = document.querySelector('.spinner')

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

let page = 1;
let per_page = 12;

const callTheApi = async () => {
    const value = input.value
    const API = `https://api.unsplash.com/search/photos?page=${page}&query=${value}&client_id=${API_KEY}&per_page=${per_page}`

    spinner.style.display = 'block'
    await fetch(API)
        .then((response) => {
            if (!response.ok) {
                throw new Error('error while hitting the api / fetching the images')
            } else {
                return response.json()
            }
        })
        .then((data) => {
            data.results.forEach((image) => {
                const regularImage = image.urls.small
                const imageElement = document.createElement('img')
                imageElement.src = regularImage
                imageElement.alt = value

                const imageLink = document.createElement('a')
                imageLink.href = image.links.html
                imageLink.target = '_blank'
                imageLink.appendChild(imageElement)

                imagesContainer.appendChild(imageLink)
            })
        })
        .catch((error) => {
            console.log('error while hitting the api / fetching the images', error)
        })
    spinner.style.display = 'none'
}

searchBTN.addEventListener('click', (event) => {
    event.preventDefault()
    imagesContainer.innerHTML = ''
    callTheApi()
    moreBTN.style.display = 'block'
})

moreBTN.addEventListener('click', (event) => {
    event.preventDefault()
    ++page
    per_page = 13
    callTheApi()
})