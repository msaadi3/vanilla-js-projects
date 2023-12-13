let calendar = document.querySelector('.calendar')
let monthYear = document.querySelector('.month-year')
let prevBtn = document.getElementById('prev')
let nextBtn = document.getElementById('next')

let dateObj = new Date()
let month = dateObj.getMonth()
let year = dateObj.getFullYear()
let date = dateObj.getDate()

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const renderCalendar = () => {
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const lastDateOfLastMonth = new Date(year, month, 0).getDate()
    const lastDateOfCurrMonth = new Date(year, month + 1, 0).getDate()

    days.forEach(day => {
        calendar.insertAdjacentHTML('beforeend', `<span class="day">${day}</span>`)
    })

    for (let i = firstDayOfMonth; i > 0; i--) {
        calendar.insertAdjacentHTML('beforeend', `<div class="date inactive">${lastDateOfLastMonth - i + 1}</div>`)
    }

    for (let i = 1; i <= lastDateOfCurrMonth; i++) {
        if (i === dateObj.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            calendar.insertAdjacentHTML('beforeend', `<div class="today date">${i}</div>`)
        }
        calendar.insertAdjacentHTML('beforeend', `<div class="date">${i}</div>`)
    }

    monthYear.innerHTML = `<h1>${months[month]} ${year}</h1>`
}

renderCalendar()
// prev
prevBtn.addEventListener('click', () => {
    month--;
    if (month < 0) {
        year = year - 1
        month = 11
    }
    calendar.innerHTML = ''
    monthYear.innerHTML = ''
    renderCalendar()
})

// next
nextBtn.addEventListener('click', () => {
    month++;
    if (month > 11) {
        year = year + 1
        month = 0
    }
    calendar.innerHTML = ''
    monthYear.innerHTML = ''
    renderCalendar()

})

const firstDay = new Date(year, month, 1)
const prevLastDay = new Date(year, month, 0)
const prevDays = prevLastDay.getDate()
