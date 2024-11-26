const submitButton = document.getElementById('submitBtn'); 
const bookmarkNameInput = document.getElementById('bookmarkName');
const bookmarkURLInput = document.getElementById('bookmarkURL');
const tableBody = document.getElementById('bookmarkTableBody');

const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];


function validateInputs() {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkURLInput.value.trim();

   
    if (name.length === 0) {
        bookmarkNameInput.classList.add('is-invalid');
        bookmarkNameInput.classList.remove('is-valid');
    } else {
        bookmarkNameInput.classList.add('is-valid');
        bookmarkNameInput.classList.remove('is-invalid');
    }

    if (!urlPattern.test(url)) {
        bookmarkURLInput.classList.add('is-invalid');
        bookmarkURLInput.classList.remove('is-valid');
    } else {
        bookmarkURLInput.classList.add('is-valid');
        bookmarkURLInput.classList.remove('is-invalid');
    }
}


function addBookmark() {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkURLInput.value.trim();

  
    if (name.length === 0 || !urlPattern.test(url)) {
        const modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
        modal.show(); 
        return; 
    }

   
    bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    renderTable(); 
    clearInputs();  
}


function renderTable() {
    tableBody.innerHTML = ''; 

    
    bookmarks.forEach((bookmark, index) => {
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td>${index + 1}</td>
            <td>${bookmark.name}</td>
            <td><a href="${bookmark.url}" target="_blank" class="btn btn-success">Visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}


function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
    renderTable(); 
}


function clearInputs() {
    bookmarkNameInput.value = '';
    bookmarkURLInput.value = '';
    bookmarkNameInput.classList.remove('is-valid', 'is-invalid');
    bookmarkURLInput.classList.remove('is-valid', 'is-invalid');
}


bookmarkNameInput.addEventListener('input', validateInputs);  
bookmarkURLInput.addEventListener('input', validateInputs);  
submitButton.addEventListener('click', addBookmark); 


renderTable();
