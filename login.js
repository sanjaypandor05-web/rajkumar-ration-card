```javascript
// =====================================
// RAJKUMAR RATION CARD PORTAL
// FINAL ADMIN LOGIN JS
// =====================================


// =====================================
// GOOGLE APPS SCRIPT URL
// =====================================

const SCRIPT_URL =
"YOUR_CURRENT_GOOGLE_APPS_SCRIPT_URL";


// =====================================
// ADMIN LOGIN
// =====================================

function login(){

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    const msg =
        document.getElementById("msg");


    // =================================
    // EMPTY CHECK
    // =================================

    if(username === "" || password === ""){

        msg.innerHTML =
            "⚠️ Username અને Password નાખો.";

        msg.style.color = "red";

        return;
    }


    // =================================
    // BUTTON DISABLE
    // =================================

    const loginButton =
        document.querySelector(".login-btn");

    loginButton.disabled = true;

    loginButton.innerHTML =
        "⏳ Login થઈ રહ્યું છે...";


    msg.innerHTML = "";


    // =================================
    // SEND LOGIN REQUEST
    // =================================

    fetch(SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "adminLogin",

            username: username,

            password: password

        })

    })


    // =================================
    // RESPONSE
    // =================================

    .then(function(response){

        return response.json();

    })


    .then(function(data){

        // =================================
        // SUCCESS
        // =================================

        if(data.status === "success"){

            // Login session
            localStorage.setItem(
                "adminLogin",
                "true"
            );

            localStorage.setItem(
                "adminName",
                data.name || "Admin"
            );


            // IMPORTANT:
            // Password ક્યારેય localStorageમાં
            // save કરવામાં આવતો નથી.

            document.getElementById(
                "adminPassword"
            ).value = "";


            document.getElementById(
                "username"
            ).value = "";


            msg.innerHTML =
                "✅ Login Successful...";

            msg.style.color = "green";


            // =================================
            // ADMIN PANEL OPEN
            // =================================

            setTimeout(function(){

                window.location.replace(
                    "admin.html"
                );

            }, 500);

        }


        // =================================
        // LOGIN FAILED
        // =================================

        else{

            msg.innerHTML =
                "❌ " +
                (data.message ||
                "Username અથવા Password ખોટો છે.");

            msg.style.color = "red";


            // Password clear

            document.getElementById(
                "adminPassword"
            ).value = "";


            document.getElementById(
                "adminPassword"
            ).focus();


            // Button enable

            loginButton.disabled = false;

            loginButton.innerHTML =
                "🔐 Login";

        }

    })


    // =================================
    // SERVER ERROR
    // =================================

    .catch(function(error){

        console.error(error);

        msg.innerHTML =
            "❌ Server Error. ફરી પ્રયાસ કરો.";

        msg.style.color = "red";


        loginButton.disabled = false;

        loginButton.innerHTML =
            "🔐 Login";


        document.getElementById(
            "adminPassword"
        ).value = "";

    });

}


// =====================================
// PASSWORD SHOW / HIDE
// =====================================

function togglePassword(){

    const password =
        document.getElementById("adminPassword");

    const button =
        document.querySelector(
            ".password-box button"
        );


    if(password.type === "password"){

        password.type = "text";

        button.innerHTML = "🙈";

    }

    else{

        password.type = "password";

        button.innerHTML = "👁";

    }

}


// =====================================
// ENTER KEY LOGIN
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const password =
            document.getElementById(
                "adminPassword"
            );

        const username =
            document.getElementById(
                "username"
            );


        password.addEventListener(
            "keydown",
            function(event){

                if(event.key === "Enter"){

                    event.preventDefault();

                    login();

                }

            }
        );


        username.addEventListener(
            "keydown",
            function(event){

                if(event.key === "Enter"){

                    event.preventDefault();

                    login();

                }

            }
        );


        // =================================
        // CLEAR OLD FORM VALUES
        // =================================

        username.value = "";

        password.value = "";

    }
);


// =====================================
// CLEAR FORM WHEN PAGE IS SHOWN
// =====================================

window.addEventListener(
    "pageshow",
    function(){

        const username =
            document.getElementById(
                "username"
            );

        const password =
            document.getElementById(
                "adminPassword"
            );


        if(username){
            username.value = "";
        }

        if(password){
            password.value = "";
        }

    }
);
```
