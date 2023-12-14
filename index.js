const addCard = document.querySelectorAll('.add-card')
const toDoList = document.querySelector('.to-do-list')
const modal = document.querySelector('#modal-form')
const formSumbit = document.querySelector('#form-submit')
const inProgress = document.querySelector('.in-progress')
const stuck = document.querySelector('.stuck')

addCard.forEach((e) => {
    e.addEventListener('click', (event) => {
        modal.style.display = 'block'
        event.preventDefault
    })
})
formSumbit.addEventListener('click', (_event) => {
    modal.style.display = 'none'
})

const form = document.querySelector('form')

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value
    const titleP = document.createElement('p')
    titleP.innerText = title

    const discription = event.target.elements.formDiscription.value
    const discriptionP = document.createElement('p')
    discriptionP.innerText = discription

    const periority = event.target.elements.formPriority.value
    const perioritySpan = document.createElement('span')
    perioritySpan.innerText = periority

    const status = event.target.elements.formStatus.value

    console.log(status)

    const removeBtn = document.createElement('p')
    removeBtn.innerText = 'namaig ustga'
    removeBtn.style.background = 'green'
    removeBtn.addEventListener('click', () => {
        if (status == "To do") {
            toDoList.removeChild(toDoListItems)
        }
        if (status == "In progress") {
            inProgress.querySelector('.to-do-list').removeChild(toDoListItems)
        }
        if (status == "Stuck") {
            stuck.querySelector('.to-do-list').removeChild(toDoListItems)
        }
    })


    const toDoListItems = document.createElement('div')
    toDoListItems.className = 'to-do-list-items'
    toDoListItems.appendChild(titleP)
    toDoListItems.appendChild(discriptionP)
    toDoListItems.appendChild(perioritySpan)
    toDoListItems.appendChild(removeBtn)

    if (status == 'To do') {
        toDoList.appendChild(toDoListItems)
    } if (status == 'In progress') {
        inProgress.querySelector('.to-do-list').appendChild(toDoListItems)
    } if (status == 'Stuck') {
        stuck.querySelector('.to-do-list').appendChild(toDoListItems)
    }
})
