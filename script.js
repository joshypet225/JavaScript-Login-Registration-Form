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

// Sign Up ---------------------------------------------------------------->
const regUsername = document.getElementById('username');
const regEmail = document.getElementById('email');
const regPassword = document.getElementById('reg_password');
const regPasswordConfirm = document.getElementById('conreg_password');
const regCheck = document.getElementById('reg_check');
const regButton = document.getElementById('signup_submit');

// Check Username
const usernameRegEx = /^[A-Za-z0-9_.]{0,25}$/;
let rUchk, rUchka, rUchks = true;

regUsername.addEventListener('input', () => {
    const usernameErrorDisplay = document.getElementById('username_error');
    if (!(regUsername.value.match(usernameRegEx))) {
        showError(regUsername, usernameErrorDisplay,
            'Username can only use letters, number, underscores and periods.');
        rUchka = false;
    } else {
        hideError(regUsername, usernameErrorDisplay);
        rUchka = true;
    }
})

function checkSameUsername() {
    data.forEach(item => {
        if (item["username"] === regUsername.value) {
            rUchks = false;
        }
    })
}

function checkUsername() {
    const usernameErrorDisplay = document.getElementById('username_error');
    checkSameUsername();
    if (regUsername.value === '') {
        showError(regUsername, usernameErrorDisplay,
            "Username can't be empty.");
        rUchk = false;
    } else if (!rUchks && rUchka) {
        showError(regUsername, usernameErrorDisplay,
            'This username has already been taken.');
        rUchk = true;
    } else if (!rUchka) {
        rUchk = false;
    } else {
        hideError(regUsername, usernameErrorDisplay);
        rUchk = true;
    }
}

// Check Email
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let rEchk, rEchks = true;

function checkSameEmail() {
    data.forEach(item => {
        if (item["email"] === regEmail.value) {
            rEchks = false;
        }
    })
}

function checkEmail() {
    checkSameEmail()
    const emailErrorDisplay = document.getElementById('email_error');
    if (regEmail.value === '') {
        showError(regEmail, emailErrorDisplay,
            "Email can't be empty.");
        rEchk = false;
    } else if (!(regEmail.value.match(emailRegEx))) {
        showError(regEmail, emailErrorDisplay,
            'Invalid email.');
        rEchk = false;
    } else if (!rEchks) {
        showError(regEmail, emailErrorDisplay,
            'this email has already been taken.');
    } else {
        hideError(regEmail, emailErrorDisplay);
        rEchk = true;
    }
}

// Check Password
let rPchk = true;

function checkPassword() {
    const passwordErrorDisplay = document.getElementById('reg_password_error');
    if (regPassword.value === '') {
        showError(regPassword, passwordErrorDisplay,
            "Password can't be empty.");
        rPchk = false;
    } else {
        hideError(regPassword, passwordErrorDisplay);
        rPchk = true;
    }
}

// Check Password Confirm
let rPCchk, rPCchka = true;

regPasswordConfirm.addEventListener('change', () => {
    const passwordConfirmErrorDisplay = document.getElementById('conreg_password_error');
    if (regPasswordConfirm.value !== regPassword.value) {
        showError(regPasswordConfirm, passwordConfirmErrorDisplay,
            'Passwords do not match.');
        rPCchka = false;
    } else {
        hideError(regPasswordConfirm, passwordConfirmErrorDisplay);
        rPCchka = true;
    }
})

function checkPasswordConfirm() {
    const passwordConfirmErrorDisplay = document.getElementById('conreg_password_error');
    if (regPasswordConfirm.value === '') {
        showError(regPasswordConfirm, passwordConfirmErrorDisplay,
            "Passwords can't be empty.");
        rPCchk = false;
    } else if (!rPCchka) {
        rPCchk = false;
    } else {
        hideError(regPasswordConfirm, passwordConfirmErrorDisplay);
        rPCchk = true;
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
        data.push(newAccount);
        localStorage.setItem('Account', JSON.stringify(data));
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

// Login ------------------------------------------------------------------>
const logUsernameOrEmail = document.getElementById('username_email');
const logPassword = document.getElementById('password');
const logCheck = document.getElementById('remember_check');
const logButton = document.getElementById('login_submit');
let account;

// Check Username or Email
const logUsernameOrEmailErrorDisplay = document.getElementById('username_email_error');
function getAccout() {
    if (logUsernameOrEmail.value === '') {
        showError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay,
            "Please enter your username or email.");
    } else if (logUsernameOrEmail.value.match(usernameRegEx)) {
        checkLoginAccount('username');
        hideError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay);
    } else if (logUsernameOrEmail.value.match(emailRegEx)) {
        checkLoginAccount('email');
        hideError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay);
    } else {
        showError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay,
            "Invalid username or email.");
    }
}

function checkLoginAccount(input) {
    data.forEach(item => {
        if (item[input] === logUsernameOrEmail.value) {
            account = item;
        }
    })
}

// Check Password
const logPasswordErrorDisplay = document.getElementById('password_error');
function checkLoginPassword() {
    if (account === undefined) {
        showError(logUsernameOrEmail, logUsernameOrEmailErrorDisplay,
            "Invalid username or email.");
    } else if (account['password'] === logPassword.value) {
        logUsernameOrEmail.value = '';
        logPassword.value = '';
        logCheckbox();
        hideError(logPassword, logPasswordErrorDisplay);
    } else {
        showError(logPassword, logPasswordErrorDisplay,
            "Invalid Password.");
        logPassword.value = '';
    }
}

// Checkbox
function logCheckbox() {
    if (logCheck.checked === true) {
        localStorage.setItem('Remember', account['username']);
    }
}

// Login Click
logButton.addEventListener('click', async () => {
    await getAccout();
    await checkLoginPassword();
})