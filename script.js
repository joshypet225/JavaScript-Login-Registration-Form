// Sign Up ---------------------------->
const regUsername = document.getElementById('username');
const regEmail = document.getElementById('email');
const regPassword = document.getElementById('reg_password');
const regPasswordConfirm = document.getElementById('conreg_password');
const regCheck = document.getElementById('reg_check');
const regButton = document.getElementById('signup_submit');
let rUchk, rUchka, rEchk, rPchk, rPCchk, rPCchka = false;
let account = [];

// Check Username
regUsername.addEventListener('input', () => {
    const usernameErrorDisplay = document.getElementById('username_error');
    const usernameRegEx = /^[A-Za-z0-9_.]{0,25}$/;
    if (regUsername.value.match(usernameRegEx)) {
        regUsername.parentElement.classList.remove('invalid');
        usernameErrorDisplay.innerHTML = '';
        usernameErrorDisplay.parentElement.style.display = 'none';
        rUchka = true;
    } else {
        let usernameErrorText = 'Username can only use letters, number, underscores and periods.';
        regUsername.parentElement.classList.add('invalid');
        usernameErrorDisplay.innerHTML = usernameErrorText;
        usernameErrorDisplay.parentElement.style.display = 'block';
        rUchka = false;
    }
})

function checkUsername() {
    const usernameErrorDisplay = document.getElementById('username_error');
    if (regUsername.value !== '' && rUchka) {
        regUsername.parentElement.classList.remove('invalid');
        usernameErrorDisplay.innerHTML = '';
        usernameErrorDisplay.parentElement.style.display = 'none';
        rUchk = true;
    } else if (rUchka === false) {
        rUchk = false;
    } else {
        let usernameErrorText = "Username can't be empty.";
        regUsername.parentElement.classList.add('invalid');
        usernameErrorDisplay.innerHTML = usernameErrorText;
        usernameErrorDisplay.parentElement.style.display = 'block';
        rUchk = false;
    }
}

// Check Email
function checkEmail() {
    const emailErrorDisplay = document.getElementById('email_error');
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regEmail.value.match(emailRegEx)) {
        regEmail.parentElement.classList.remove('invalid');
        emailErrorDisplay.innerHTML = '';
        emailErrorDisplay.parentElement.style.display = 'none';
        rEchk = true;
    } else if (regEmail.value === '') {
        let emailErrorText = "Email can't be empty.";
        regEmail.parentElement.classList.add('invalid');
        emailErrorDisplay.innerHTML = emailErrorText;
        emailErrorDisplay.parentElement.style.display = 'block';
        rEchk = false;
    } else {
        let emailErrorText = 'Invalid email';
        regEmail.parentElement.classList.add('invalid');
        emailErrorDisplay.innerHTML = emailErrorText;
        emailErrorDisplay.parentElement.style.display = 'block';
        rEchk = false;
    }
}
// Check Password
function checkPassword() {
    const passwordErrorDisplay = document.getElementById('reg_password_error');
    if (regPassword.value !== '') {
        regPassword.parentElement.classList.remove('invalid');
        passwordErrorDisplay.innerHTML = '';
        passwordErrorDisplay.parentElement.style.display = 'none';
        rPchk = true;
    } else {
        let emailErrorText = "Password can't be empty.";
        regPassword.parentElement.classList.add('invalid');
        passwordErrorDisplay.innerHTML = emailErrorText;
        passwordErrorDisplay.parentElement.style.display = 'block';
        rPchk = false;
    }
}

// Check Password Confirm
regPasswordConfirm.addEventListener('change', () => {
    const passwordConfirmErrorDisplay = document.getElementById('conreg_password_error');
    if (regPasswordConfirm.value === regPassword.value) {
        regPasswordConfirm.parentElement.classList.remove('invalid');
        passwordConfirmErrorDisplay.innerHTML = '';
        passwordConfirmErrorDisplay.parentElement.style.display = 'none';
        rPCchka = true;
    } else {
        let passwordconfirmErrorText = 'Passwords do not match.';
        regPasswordConfirm.parentElement.classList.add('invalid');
        passwordConfirmErrorDisplay.innerHTML = passwordconfirmErrorText;
        passwordConfirmErrorDisplay.parentElement.style.display = 'block';
        rPCchka = false;
    }
})

function checkPasswordConfirm() {
    const passwordConfirmErrorDisplay = document.getElementById('conreg_password_error');
    if (regPasswordConfirm.value !== '' && rPCchka) {
        regPasswordConfirm.parentElement.classList.remove('invalid');
        passwordConfirmErrorDisplay.innerHTML = '';
        passwordConfirmErrorDisplay.parentElement.style.display = 'none';
        rPCchk = true;
    } else if (rPCchka == false) {
        rPCchk = false;
    } else {
        let passwordconfirmErrorText = "Passwords can't be empty.";
        regPasswordConfirm.parentElement.classList.add('invalid');
        passwordConfirmErrorDisplay.innerHTML = passwordconfirmErrorText;
        passwordConfirmErrorDisplay.parentElement.style.display = 'block';
        rPCchk = false;
    }
}


// Checkbox
regCheck.addEventListener('click', () => {
    if (regCheck.checked === true) {
        regButton.disabled = false;
    } else {
        regButton.disabled = true;
    }
})

// Save Data
function saveData() {
    if (rUchk && rEchk && rPchk && rPCchk) {
        let newAccount = {
            Username: regUsername.value,
            Email: regEmail.value,
            Password: regPassword.value
        };
        account.push(newAccount);
        localStorage.setItem('Account', JSON.stringify(account));
        regUsername.value = '';
        regEmail.value = '';
        regPassword.value = '';
        regPasswordConfirm.value = '';
    } else {
        regPassword.value = '';
        regPasswordConfirm.value = '';
    }
}

// Sign Up Click
regButton.addEventListener('click', async () => {
    await checkUsername()
    await checkEmail();
    await checkPassword();
    await checkPasswordConfirm()
    await saveData();
})