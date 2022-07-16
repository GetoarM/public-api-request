// Declare variables
const gallery = document.querySelector('#gallery');
const search = document.querySelector('search-container');
const url = 'https://randomuser.me/api/?results=12&nat=us';
let userData = [];
let html = '';

// Create modal container and set display to none
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
document.body.appendChild(modalContainer);
modalContainer.style.display = 'none';

fetch(url)
    .then(res => res.json())
    .then(data => {
        userData = data.results;
        displayUser(userData)
    });

// Display user data from the api
function displayUser(data){
    userData = data;
    data.map((user, index) => {
        html  = `
            <div class="card" onclick=openModal(${index}) data-index="${index}">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last} </h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `;
        gallery.insertAdjacentHTML('beforeend', html);
    });
}

// Display modal information function
function displayModal(index) {
    const user = userData[index];
    const date = new Date(user.dob.date);
    const html = `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn" onclick=closeModal()><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${date.toDateString().replace(/^\S+\s/,'')}</p> 
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn" onclick="prevModal(${index})">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn" onclick="nextModal(${index})">Next</button>
            </div>
        </div>
    `;
    modalContainer.innerHTML= html;
    modalContainer.style.display = 'block';
}

// Close modal function onclick
function closeModal(){
    modalContainer.style.display = 'none';
}

// Open modal function onclick
function openModal(index){
    displayModal(index);
}

// Next modal function onclick
function nextModal(index) {
    index++;
    displayModal(index);
}

// Previous modal function onclick
function prevModal(index) {
    index--
    displayModal(index);
}

// Display & append searchBar Container
const searchContainer = document.querySelector('.search-container');
searchContainer.innerHTML =  `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

// Filter results
const searchInput = document.querySelector('#search-input')
searchInput.addEventListener("input", (e) => {

    const userNames = document.querySelectorAll("#name");
    const userInput = e.target.value.toLowerCase();

    userNames.forEach(name => {
        if (name.textContent.toLowerCase().includes(userInput)) {
            name.parentElement.parentElement.style.display = "flex";
        }
        else {
            name.parentElement.parentElement.style.display = "none";
        }
    })
})
