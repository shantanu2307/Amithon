const user = JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : {};

const username = document.getElementById('username');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const userIcon = document.getElementById('userIcon');

const submit = document.getElementById('submit');

submit.addEventListener("click", function(event) {
    event.preventDefault();
    submitLogout();
});

username.innerHTML = user.username;
name.innerHTML = user.name;
email.innerHTML = user.email;
phone.innerHTML = user.phone;

userIcon.style.backgroundImage = `url('${user.imageURL.toLowerCase()}')`;

function submitLogout() {
    window.localStorage.removeItem('user');
    window.location.href = '/index.html';
}