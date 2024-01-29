const form = document.getElementById('indexForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const validatedData = validateData();
});

function validateData() {
    let usernameValue = username.value.trim();
    let passwordValue = password.value.trim();

    let result = {};

    // username
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be empty');
    } else {
        setSuccessFor(username);
        result.username = usernameValue;
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be empty');
    } else {
        setSuccessFor(password);
        result.password = passwordValue;
    }

    let requiredProperties = ['username', 'passwords'];
    let isValid = requiredProperties.every(i => i in result);

    if(isValid) {
        return result;
    } else {
        return null;
    }
    
}

function setErrorFor(input, message) {
	let formControl = input.parentElement;
	let small = formControl.querySelector('small');

	small.innerText = message;

	formControl.className = 'form-control error';
}

function setSuccessFor(input) {
	let formControl = input.parentElement;

	formControl.className = 'form-control success';
}