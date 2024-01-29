const form = document.getElementById('index-form');
const authorName = document.getElementById('authorInput'); // Updated to 'authorInput'

form.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
        const validatedValue = validateData();

        form.submit();

    } catch (error) {
        console.error('Validation error:', error);
    }
});


function validateData() {
    let authorNameValue = authorName.value.trim();

    if (authorNameValue === '') {
        setErrorFor(authorName, 'Field cannot be empty');
        throw new Error('Field cannot be empty');
    } else if (!validateAuthorName(authorNameValue)) {
        setErrorFor(authorName, 'Input can contain only letters, dots and spaces');
        throw new Error('Invalid data format');
    } else {
        setSuccessFor(authorName);
        return authorNameValue;
    }
}

function setErrorFor(input, message) {
    let indexForm = input.parentElement;
    let small = indexForm.querySelector('small');

    small.innerText = message;

    indexForm.className = 'author-search error';
}

function setSuccessFor(input) {
    let indexForm = input.parentElement;

    indexForm.className = 'author-search success';
}

function validateAuthorName(name) {
    let regex = /^[A-Za-z. ]+$/;
    return regex.test(name);
}
