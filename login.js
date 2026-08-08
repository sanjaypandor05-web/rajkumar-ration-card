// =====================================
// RAJKUMAR RATION CARD PORTAL
// FINAL ADMIN LOGIN JS
// =====================================


// =====================================
// GOOGLE APPS SCRIPT URL
// =====================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwF4N8e9pxd3TYS7fdC73vDdCwZ2vQra_ckTrDYLRAaDvCeGvLeebnVCTpwTPTKMdkYyA/exec";


// =====================================
// PAGE LOAD
// =====================================

document.addEventListener("DOMContentLoaded", function(){

    const form =
        document.getElementById("adminLoginForm");

    const loginBtn =
        document.getElementById("loginBtn");

    const toggleBtn =
        document.getElementById("togglePasswordBtn");

    const username =
        document.getElementById("username");

    const password =
        document.getElementById("adminPassword");


    // ---------------------------------
    // CLEAR OLD VALUES
    // ---------------------------------

    username.value = "";

    password.value = "";


    // ---------------------------------
    // SHOW / HIDE PASSWORD
    // ---------------------------------

    toggleBtn.addEventListener(
        "click",
        togglePassword
    );


    // ---------------------------------
    // LOGIN
    // ---------------------------------

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            login();

        }
    );


    // ---------------------------------
    // ENTER KEY
    // ---------------------------------

    username.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                event.preventDefault();

                login();

            }

        }
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

});


// =====================================
// PASSWORD SHOW / HIDE
// =====================================

function togglePassword(){

    const password =
        document.getElementById("adminPassword");

    const button =
        document.getElementById("togglePasswordBtn");


    if(password.type === "password"){

        password.type = "text";

        button.textContent = "🙈";

    }
    else{

        password.type = "password";

        button.textContent = "👁";

    }

}


// =====================================
// ADMIN LOGIN
// =====================================

function login(){

    const username =
        document.getElementById("username")
        .value
        .trim();

    const password =
        document.getElementById("adminPassword")
        .value;

    const msg =
        document.getElementById("msg");

    const loginBtn =
        document.getElementById("loginBtn");


    // =================================
    // EMPTY CHECK
    // =================================

    if(username === ""){

        msg.textContent =
            "⚠️ Username નાખો.";

        msg.style.color = "red";

        document
            .getElementById("username")
            .focus();

        return;
    }


    if(password === ""){

        msg.textContent =
            "⚠️ Password નાખો.";

        msg.style.color = "red";

        document
            .getElementById("adminPassword")
            .focus();

        return;
    }


    // =================================
    // BUTTON LOADING
    // =================================

    loginBtn.disabled = true;

    loginBtn.textContent =
        "⏳ Login થઈ રહ્યું છે...";

    msg.textContent = "";


    // =================================
    // SEND REQUEST
    // =================================

    fetch(SCRIPT_URL, {

        method:"POST",

        body:JSON.stringify({

            action:"adminLogin",

            username:username,

            password:password

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

            /*
             * IMPORTANT:
             *
             * Password localStorageમાં
             * save થતો નથી.
             *
             * માત્ર login status અને
             * admin name save થાય છે.
             */

            localStorage.setItem(
                "adminLogin",
                "true"
            );

            localStorage.setItem(
                "adminName",
                data.name || "Admin"
            );


            // ---------------------------------
            // CLEAR PASSWORD
            // ---------------------------------

            document
                .getElementById("adminPassword")
                .value = "";


            document
                .getElementById("username")
                .value = "";


            msg.textContent =
                "✅ Login Successful...";

            msg.style.color = "green";


            // ---------------------------------
            // OPEN ADMIN PANEL
            // ---------------------------------

            setTimeout(function(){

                window.location.replace(
                    "admin.html"
                );

            },500);

        }


        // =================================
        // LOGIN FAILED
        // =================================

        else{

            msg.textContent =
                "❌ " +
                (
                    data.message ||
                    "Username અથવા Password ખોટો છે."
                );

            msg.style.color = "red";


            // Password clear

            document
                .getElementById("adminPassword")
                .value = "";


            // Button enable

            loginBtn.disabled = false;

            loginBtn.textContent =
                "🔐 Login";

        }

    })


    // =================================
    // SERVER ERROR
    // =================================

    .catch(function(error){

        console.error(error);

        msg.textContent =
            "❌ Server Error. ફરી પ્રયાસ કરો.";

        msg.style.color = "red";


        document
            .getElementById("adminPassword")
            .value = "";


        loginBtn.disabled = false;

        loginBtn.textContent =
            "🔐 Login";

    });

}


// =====================================
// CLEAR FORM WHEN PAGE IS SHOWN
// =====================================

window.addEventListener(
    "pageshow",
    function(){

        const username =
            document.getElementById("username");

        const password =
            document.getElementById("adminPassword");


        if(username){

            username.value = "";

        }


        if(password){

            password.value = "";

        }

    }
);
