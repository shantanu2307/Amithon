const username = document.getElementById('username');
const password = document.getElementById('password');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

function submitSignup() {
    const requestOptions = {
        method: 'POST',
        url: 'http://localhost:8000/signup/',
        data: { username: username.value, password: password.value, name: name.value, email: email.value, phone: phone.value },
    }

    axios(requestOptions).then((response) => { console.log(response.data); window.location.href = '/index.html' }).catch((error) => { console.log(error); });
}