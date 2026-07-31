// ==========================================
// LOGIN.JS - PART 1
// RAJKUMAR RATION CARD PORTAL
// ==========================================

// ----------------------------
// GOOGLE APPS SCRIPT URL
// ----------------------------

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwNrtXJTgotJP4pRGv3j2cfwI4RrJ5PM0j0Yk9LLSANoXxgv07n0zfbXshuCHOR-C3uBA/exec";

// ----------------------------
// PAGE LOAD
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {

    // URL માં ?type=admin અથવા ?type=retailer હોય તો
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    if (type === "retailer") {
        document.getElementById("loginType").value = "retailer";
        document.getElementById("username").placeholder = "Retailer ID";
    }

    // Login Type બદલાય ત્યારે Placeholder બદલવો
    document.getElementById("loginType").addEventListener("change", function () {

        if (this.value === "admin") {

            document.getElementById("username").placeholder = "Admin Username";

        } else {

            document.getElementById("username").placeholder = "Retailer ID";

        }

    });

    // Show / Hide Password
    document.getElementById("togglePassword").addEventListener("click", function () {

        const password = document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";
            this.innerHTML = "🙈";

        } else {

            password.type = "password";
            this.innerHTML = "👁";

        }

    });

    // Login Button
    document.getElementById("loginBtn").addEventListener("click", loginUser);

});
// ==========================================
// LOGIN.JS - PART 2
// LOGIN FUNCTION
// ==========================================

async function loginUser() {

    const type = document.getElementById("loginType").value;

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    const message = document.getElementById("loginError");

    message.innerHTML = "";

    if (!username || !password) {

        message.innerHTML = "⚠ Please enter Username and Password.";

        return;

    }

    document.getElementById("loginBtn").innerHTML = "Please Wait...";

    document.getElementById("loginBtn").disabled = true;

    try {

        let url = "";

        if (type === "admin") {

            url =
                SCRIPT_URL +
                "?action=adminLogin" +
                "&username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password);

        } else {

            url =
                SCRIPT_URL +
                "?action=retailerLogin" +
                "&id=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password);

        }

        const response = await fetch(url);

        const result = await response.json();

        if (result.success) {

            if (type === "admin") {

                localStorage.setItem("adminLogin", "true");
                localStorage.setItem("adminName", username);

                window.location.href = "admin.html";

            } else {

                localStorage.setItem("retailerLogin", "true");
                localStorage.setItem("retailerId", result.retailerId);
                localStorage.setItem("retailerName", result.retailerName);

                window.location.href = "retailer.html";

            }

        } else {

            message.innerHTML = "❌ " + result.message;

        }

    } catch (err) {

        console.error(err);

        message.innerHTML = "❌ Server Error. Please try again.";

    }

    document.getElementById("loginBtn").innerHTML = "Login";
    document.getElementById("loginBtn").disabled = false;

}
// ==========================================
// LOGIN.JS - PART 3
// EXTRA FEATURES
// ==========================================

// ----------------------------
// PRESS ENTER TO LOGIN
// ----------------------------

document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        loginUser();

    }

});

// ----------------------------
// AUTO FOCUS
// ----------------------------

window.addEventListener("load", function () {

    document.getElementById("username").focus();

});

// ----------------------------
// ALREADY LOGIN CHECK
// ----------------------------

window.addEventListener("load", function () {

    const type = document.getElementById("loginType").value;

    if (type === "admin" && localStorage.getItem("adminLogin") === "true") {

        window.location.href = "admin.html";

    }

    if (type === "retailer" && localStorage.getItem("retailerLogin") === "true") {

        window.location.href = "retailer.html";

    }

});

// ----------------------------
// LOGOUT HELPERS
// ----------------------------

function adminLogout() {

    localStorage.removeItem("adminLogin");
    localStorage.removeItem("adminName");

    window.location.href = "login.html?type=admin";

}

function retailerLogout() {

    localStorage.removeItem("retailerLogin");
    localStorage.removeItem("retailerId");
    localStorage.removeItem("retailerName");

    window.location.href = "login.html?type=retailer";

}

// ----------------------------
// CLEAR ERROR ON TYPING
// ----------------------------

document.getElementById("username").addEventListener("input", function () {

    document.getElementById("loginError").innerHTML = "";

});

document.getElementById("password").addEventListener("input", function () {

    document.getElementById("loginError").innerHTML = "";

});
