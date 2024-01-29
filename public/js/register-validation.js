const form = document.getElementById('indexForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const birthdate = document.getElementById('birthdate');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const validatedData = validateData();

    /**
     * So, basically this sends result object further after completing all the client-side validation
     * And then server-side validation is performed:
     * it checks whether such username exists or not - and returns the corresponding answer
     */
    if (validatedData) {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedData),
            });

            if (!response.ok) {
                const responseData = await response.json();
                const errorMessage = responseData.error;

                if (errorMessage.includes('Username already exists')) {
                    setErrorFor(username, errorMessage);
                }
            }
        } catch (error) {
            console.error('Error sending registration data:', error);
        }
    }
});

function validateData() {
    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let password2Value = password2.value.trim();
    let birthdateValue = birthdate.value.trim();

    let currentDate = new Date();
    let chosenDate = new Date(birthdateValue);

    // Object to store validated data
    let result = {};

    // username
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be empty');
    } else {
        setSuccessFor(username);
        result.username = usernameValue;
    }

    // email
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be empty');
    } else if (!validateEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
        result.email = emailValue;
    }

    // password
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be empty');
    } else {
        setSuccessFor(password);
    }

    // password 2
    if (password2Value === '') {
        setErrorFor(password2, 'Password cannot be empty');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password, 'Passwords should match');
        setErrorFor(password2, 'Passwords should match');
    } else {
        setSuccessFor(password2);
        result.password = password2Value;
    }

    // date of birth
    if (birthdateValue === '') {
        setErrorFor(birthdate, 'Birthdate cannot be empty');
    } else if (currentDate.setHours(0, 0, 0, 0) <= chosenDate.setHours(0, 0, 0, 0)) {
        setErrorFor(birthdate, 'Chosen date cannot equal or exceed current date');
    } else {
        setSuccessFor(birthdate);
        result.birthdate = birthdateValue;
    }

    // Check if all required properties are present in the result object
    const requiredProperties = ['username', 'email', 'password', 'birthdate'];
    const isValid = requiredProperties.every(prop => prop in result);

    if (isValid) {
        return result;
    } else {
        // If any required property is missing, return null
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

function validateEmail(email) {
	return /^\S+@\S+\.\S+$/.test(email);
}