const data = JSON.parse(localStorage.getItem('Account'));

// Show Error
function showError(box, display, error) {
    box.parentElement.classList.add('invalid');
    display.innerHTML = error;
    display.parentElement.style.display = 'block';
}

function hideError(box, display) {
    box.parentElement.classList.remove('invalid');
    display.innerHTML = '';
    display.parentElement.style.display = 'none';
}

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
        hideError(regUsername, usernameErrorDisplay);
        rUchka = true;
    } else {
        showError(regUsername, usernameErrorDisplay,
            'Username can only use letters, number, underscores and periods.');
        rUchka = false;
    }
})

function checkUsername() {
    const usernameErrorDisplay = document.getElementById('username_error');
    if (regUsername.value !== '' && rUchka) {
        hideError(regUsername, usernameErrorDisplay);
        rUchk = true;
    } else if (rUchka === false) {
        rUchk = false;
    } else {
        showError(regUsername, usernameErrorDisplay,
            "Username can't be empty.");
        rUchk = false;
    }
}

// Check Email
function checkEmail() {
    const emailErrorDisplay = document.getElementById('email_error');
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regEmail.value.match(emailRegEx)) {
        hideError(regEmail, emailErrorDisplay);
        rEchk = true;
    } else if (regEmail.value === '') {
        showError(regEmail, emailErrorDisplay,
            "Email can't be empty.");
        rEchk = false;
    } else {
        showError(regEmail, emailErrorDisplay,
            'Invalid email');
        rEchk = false;
    }
}
// Check Password
function checkPassword() {
    const passwordErrorDisplay = document.getElementById('reg_password_error');
    if (regPassword.value !== '') {
        hideError(regPassword, passwordErrorDisplay);
        rPchk = true;
    } else {
        showError(regPassword, passwordErrorDisplay,
            "Password can't be empty.");
        rPchk = false;
    }
}

// Check Password Confirm
regPasswordConfirm.addEventListener('change', () => {
    const passwordConfirmErrorDisplay = document.getElementById('conreg_password_error');
    if (regPasswordConfirm.value === regPassword.value) {
        hideError(regPasswordConfirm, passwordConfirmErrorDisplay);
        rPCchka = true;
    } else {
        showError(regPasswordConfirm, passwordConfirmErrorDisplay,
            'Passwords do not match.');
        rPCchka = false;
    }
})

function checkPasswordConfirm() {
    const passwordConfirmErrorDisplay = document.getElementById('conreg_password_error');
    if (regPasswordConfirm.value !== '' && rPCchka) {
        hideError(regPasswordConfirm, passwordConfirmErrorDisplay);
        rPCchk = true;
    } else if (regPasswordConfirm.value !== '' && rPCchka == false) {
        rPCchk = false;
    } else {
        showError(regPasswordConfirm, passwordConfirmErrorDisplay,
            "Passwords can't be empty.");
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
            username: regUsername.value,
            email: regEmail.value,
            password: regPassword.value
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