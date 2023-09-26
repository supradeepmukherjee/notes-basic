// Function to show elemnts from local storage
const showNotes = () => {
    notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    html = ''
    notesObj.forEach((element, index) => {
        html += `
        <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button href="#" id ='${index}' onclick='deleteNote(this.id)' class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = `Nothing to show. Please Create a note first.`
    }
}
// Function to delete a note
function deleteNote(index) {
    notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}

// Searching
search = document.getElementById('searchtxt')
search.addEventListener('input', () => {
    inputval = search.value.toLowerCase()
    cards = document.getElementsByClassName('noteCard')
    Array.from(cards).forEach((element) => {
        cardtxt = element.getElementsByTagName('p')[0].innerText
        if (cardtxt.includes(inputval)) {
            element.style.display = 'block'
        }
        else {
            element.style.display = 'none'
        }
    })
})

// If the user adds a note, add it to the local storage
addbtn = document.getElementById('addbtn')
addbtn.addEventListener('click', () => {
    addtxt = document.getElementById('addTxt')
    notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addtxt.value = ''
    showNotes()
})