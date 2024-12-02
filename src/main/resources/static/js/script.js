
// Find the main containers
let body = document.querySelector("body");

let loginContainer = document.querySelector("#login");
let createContainer = document.querySelector("#create");


// Create buttons
let loginButton = document.createElement("input");
let createButton = document.createElement("input");

// Add appearance

loginButton.type = "button";
createButton.type = "button";

loginButton.value = "Login";
createButton.value = "Create Account";


// Add functionality, first create function

function alertButton(event){
    window.alert(`I've been clicked by ${event.currentTarget.value}`)
}

// attach it to the button
// loginButton.addEventListener("click", alertButton);
// createButton.addEventListener("click", alertButton);

loginButton.addEventListener("click", displayLoginBox)
createButton.addEventListener("click", displayCreateAccountBox)



// Generate login box when clicking


// attach them to the page
loginContainer.append(loginButton);
createContainer.append(createButton);



function displayLoginBox(){
    
    // Generate dom elements
    let usernameInput = document.createElement("input");
    let passwordInput = document.createElement("input");

    let submitButton = document.createElement("input");
    let closeButton = document.createElement("input");


    // Place them in an array for easier manipulation
    let arrayElements = [usernameInput, passwordInput, submitButton, closeButton];


    // Edit each element for display and type
    usernameInput.value = "username";

    passwordInput.type = "password";
    passwordInput.value = "password";

    submitButton.value = "submit";
    submitButton.type = "button";

    closeButton.value = "close";
    closeButton.type = "button";


    // Adding functionality to buttons
    submitButton.addEventListener("click", function(){
        let u = usernameInput.value;
        let p = passwordInput.value;
        if(u.length > 1 && p.length > 1){
            let user = asyncLogin({username:u, password:p});
            user.then(console.log(user), alert("Failed to login"));
            closeButton.click();
        }
    })

    closeButton.addEventListener("click", function(){
        arrayElements.forEach(element => {
            loginContainer.removeChild(element);
        })
    })


    // Append them to the container after preparing them
    arrayElements.forEach(element => {
        loginContainer.appendChild(element);
    });
}

function displayCreateAccountBox(){
    // Generate dom elements
    let usernameInput = document.createElement("input");
    let passwordInput = document.createElement("input");
    let passwordConfirmInput = document.createElement("input");
    let emailInput = document.createElement("input");

    let submitButton = document.createElement("input");
    let closeButton = document.createElement("input");


    // Place them in an array for easier manipulation
    let arrayElements = [usernameInput, passwordInput, passwordConfirmInput, emailInput, submitButton, closeButton];


    // Edit each element for display and type
    usernameInput.value = "username";

    passwordInput.type = "password";
    passwordInput.value = "password";

    passwordConfirmInput.type = "password";
    passwordConfirmInput.value = "password";

    emailInput.value = "email@email.com";

    submitButton.value = "submit";
    submitButton.type = "button";

    closeButton.value = "close";
    closeButton.type = "button";


    // Adding functionality to buttons
    submitButton.addEventListener("click", function(){

        if(passwordInput.value.length < 5){
            alert("password needs to be longer than 5");
            return;
        }
        if(passwordInput.value === passwordConfirmInput.value){
            let data = {
                username:usernameInput.value,
                password: passwordInput.value,
                email: emailInput.value
            };
            let newCustomer = asyncCreateAccount(data);
            newCustomer.then(alert("New Account Created"), alert("Failed to create account"));
            closeButton.click();
        }else{
            alert("Passwords do not match");
            passwordInput.value = "";
            passwordConfirmInput.value = "";
            return;
        }
    })

    closeButton.addEventListener("click", function(){
        arrayElements.forEach(element => {
            createContainer.removeChild(element);
        })
    })


    // Append them to the container after preparing them
    arrayElements.forEach(element => {
        createContainer.appendChild(element);
    });
}

async function asyncLogin(data){
    const url = "http://localhost:8080/user/login";
    const config = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try{
        const response = await fetch(url, config);
        if(response.ok){
            return response;
        }else{
            console.log("didn't work bozo")
            console.log(data);
        }
    }catch(error){
        console.log(error);
    }
}

async function asyncCreateAccount(data){
    const url = "http://localhost:8080/user";
    const config = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try{
        const response = await fetch(url, config);
        if(response.ok){
            return response;
        }else{
            console.log("didn't work bozo")
            console.log(data);
        }
    }catch(error){
        console.log(error);
    }

}
