 // Run when page is loaded
 document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password-field');
    // When button for random password is clicked
    document.getElementById('random-button').addEventListener('click', function() {
        // length from user input
        let length = document.getElementById('char-setting').value;
        if (length > 0) {
            let password = generateRandomPassword(length);   
            passwordField.value = password;
        } else {
            // error managing
            chrome.notifications.create({
                type: "basic",
                iconUrl: "images/icon128.png",
                title: "Error",
                message: "Length must be a number above zero!"
            })
        }
    })
    // When button for custom password is clicked
    document.getElementById('sentence-button').addEventListener('click', function() {
        let sentence = document.getElementById('sentence').value;
        // make sure the user input is a valid non empty string
        if (typeof sentence === 'string' && sentence.trim() != '') {
            // checks is the checkbox is checked or not
            const extraChar = document.getElementById('extra-char?').checked === true ? true : false;
            let password = generatePhrasePassword(sentence, extraChar); 
            passwordField.value = password;
        } else {
            // error managing
            chrome.notifications.create({
                type: "basic",
                iconUrl: "images/icon48.png",
                title: "Error",
                message: "You must type a sentence and nothing else!"
            })
        }
    })

    // Button Rippling
function createRipple(event) {
    const button = event.currentTarget;
  
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
  }
  const buttons = document.getElementsByClassName('gen-btn')
  for (const button of buttons) {
    button.addEventListener("click", createRipple);
  }

    // Copy to clipboard
    document.getElementById('pass-copy').addEventListener('click', function() {
        if (passwordField.value != null) {
            navigator.clipboard.writeText(passwordField.value);
            document.getElementById('copy-msg').style.display = 'block';
            setTimeout(function() { document.getElementById('copy-msg').style.display = 'none'; }, 5000);
        }
    } )
 })

// password gen functions
function generateRandomPassword(length) {
    const lowCase = "abcdefghijklmnopqrstuvwxyz";
    const upCase = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const specialChars = "$&*+@#^-_!?";
    let password = '';
    for (let i = 0; i < length; i++) {
        const charType = Math.round(Math.random() * 3);
        let randomIndex;
        switch (charType) {
            case 0:
                randomIndex = Math.round(Math.random()*(lowCase.length - 1));
                password += lowCase[randomIndex];
                break;
            case 1:
                randomIndex = Math.round(Math.random()*(upCase.length - 1));
                password += upCase[randomIndex];
                break;
            case 2:
                randomIndex = Math.round(Math.random()*(digits.length - 1));
                password += digits[randomIndex];
                break;
            case 3:
                randomIndex = Math.round(Math.random()*(specialChars.length - 1));
                password += specialChars[randomIndex];
                break;
            default:
                break;
        }
    }
    return password;
}
function generatePhrasePassword(phrase, addExtraChars) {
    let afterSpace = true;
    let password = '';
    for (let i = 0; i < phrase.length; i++) {
        if (afterSpace && phrase[i] != ' ') {
            password += phrase[i]
            afterSpace = false;
        } else if (phrase[i] === ' ') {
            afterSpace = true;
        }
    }
    
    if (addExtraChars) {
        const digits = "0123456789";
        const specialChars = "$&*+@#^-_!?";
        let randomIndex = Math.round(Math.random()*(specialChars.length - 1));
        password += specialChars[randomIndex];
        for (let i = 0; i < Math.round(Math.random() * 6); i++) {
            randomIndex = Math.round(Math.random()*(digits.length - 1));
            password += digits[randomIndex];
        }
    }
    return password;
}