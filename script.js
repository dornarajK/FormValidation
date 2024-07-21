const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// Add event listener
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();
});


const sendData = (usernameVal, sRate, count) => {
    if (sRate === count) {
        alert('Registration successful');
        swal("Welcome! " + usernameVal, "Registration Successful", "success");
        location.href= `demo.html?username=${usernameVal}`
    }
}


//for final data validation

const SuccessMsg = () => {
    let formCon = document.getElementsByClassName('form-control');
    let count = formCon.length - 1;
    let sRate = 0;

    for (let i = 0; i < formCon.length; i++) {
        if (formCon[i].className === 'form-control success') {
            sRate++;
            if (sRate === count) {
                const usernameVal = username.value.trim(); // Ensure you have access to username here
                sendData(usernameVal, sRate, count);
            }
        }
    }
}


// More email validation
const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;
    return true;
}

const validate = () => {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();

    // Validate username
    if (usernameVal === "") {
        setErrorMsg(username, 'Username cannot be blank');
    } else if (usernameVal.length < 3) {
        setErrorMsg(username, 'Username must be at least 3 characters');
    } else {
        setSuccessMsg(username);
    }

    // Validate email
    if (emailVal === "") {
        setErrorMsg(email, 'Email cannot be blank');
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'Not a valid Email');
    } else {
        setSuccessMsg(email);
    }

    // Validate phone 
    if (phoneVal === "") {
        setErrorMsg(phone, 'Phone number cannot be blank');
    } else if(phoneVal.length != 9){
        setErrorMsg(phone, 'Not a valid phone num');

    }
    else {
        setSuccessMsg(phone);
    }

    // Validate password
    if (passwordVal === "") {
        setErrorMsg(password, 'Password cannot be blank');
    } else if (passwordVal.length <8) {
        setErrorMsg(password, 'Password must be at least 8 characters');
    } else if (!regex.test(passwordVal)) {
        setErrorMsg(password, 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long');
    }else {
        setSuccessMsg(password);
    }

    // Validate confirm password
    if (cpasswordVal === "") {
        setErrorMsg(cpassword, 'Confirm password cannot be blank');
    } else if (cpasswordVal !== passwordVal) {
        setErrorMsg(cpassword, 'Passwords do not match');
    } else {
        setSuccessMsg(cpassword);
    }

    SuccessMsg();
}

function setErrorMsg(input, errormsg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = errormsg;
}


function setSuccessMsg(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control success';
    small.innerText = '';
}

