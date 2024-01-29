const form = document.getElementById('indexForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

/**
 * 
 * This code is for the login page:
 * It has both client-side and server-side validations.
 * Has some elements of SPA
 * 
 */

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const validatedData = validateData();

    if(validatedData) {
        try {
            let res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedData),
            });

            if(!res.ok) {
                let resData = await res.json();
                let errorMessage = resData.error;

                if(errorMessage.includes('No such username')) {
                    setErrorFor(username, errorMessage);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
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

    //password
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be empty');
    } else {
        setSuccessFor(password);
        result.password = passwordValue;
    }

    // Check whether all the properties are in result
    let requiredProperties = ['username', 'password'];
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