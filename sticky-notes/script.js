const createNote = document.querySelector('.create-note')
const inputElement = document.getElementById('input')
const placeNotes = document.querySelector('.place-notes')
const plusBtn = document.querySelector('.plusBtn')


createNote.addEventListener('click', () => {
    inputElement.style.display = 'block'
    inputElement.placeholder = 'Write Something...'
    plusBtn.style.display = 'none'
})

const randomColor = () => {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)

    const color = `rgb(${red}, ${green}, ${blue})`
    return color
}

inputElement.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        placeNotes.insertAdjacentHTML('afterbegin', `<div style="background-color: ${randomColor()};" class="note">${inputElement.value}</div>`)
        inputElement.value = ''
        inputElement.style.display = 'none'
        plusBtn.style.display = 'block'
    }
})
inputElement.value = ''