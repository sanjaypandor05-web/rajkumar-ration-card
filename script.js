// =====================================
// ONLINE RATION WORK V4
// =====================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLThL8hK8iodxL-Flv9V2Wl_W5e3lBFej60_1C7Lx4MCDaTZKsF-4dGk6eSYelFLkZbQ/exec";

const form = document.querySelector(".application-form");
const service = document.getElementById("service");
const amount = document.getElementById("amount");
const loading = document.getElementById("loading");
const successPopup = document.getElementById("successPopup");

const priceList = {
    "New Ration Card": 100,
    "Name Add": 100,
    "Name Remove": 100,
    "Correction": 200,
    "Address Change": 250,
    "Father Name Update": 350
};

// Amount Change
if (service) {
    service.addEventListener("change", () => {
        amount.innerHTML = "₹" + (priceList[service.value] || 0);
    });
}

// Mobile Validation
function validateMobile(number) {
    return /^[6-9]\d{9}$/.test(number);
}

// Loading
function showLoading() {
    loading.style.display = "flex";
}

function hideLoading() {
    loading.style.display = "none";
}

// Success Popup
function showSuccess() {
    successPopup.style.display = "flex";
}

function closePopup() {
    successPopup.style.display = "none";
}

// Form Submit
form.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (!validateMobile(document.getElementById("mobile").value)) {
        alert("Please enter a valid Mobile Number.");
        return;
    }

    showLoading();

    const data = {
        gujaratiName: document.getElementById("gujaratiName").value,
        englishName: document.getElementById("englishName").value,
        mobile: document.getElementById("mobile").value,
        village: document.getElementById("village").value,
        taluka: document.getElementById("taluka").value,
        district: document.getElementById("district").value,
        address: document.getElementById("address").value,
        pincode: document.getElementById("pincode").value,
        email: document.getElementById("email").value,
        service: service.value,
        amount: priceList[service.value] || 0,
        details: document.getElementById("details").value
    };

    try {

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        hideLoading();

        if (result.success) {

            showSuccess();

            form.reset();

            amount.innerHTML = "₹0";

            console.log(result);

        } else {

            alert("Error : " + result.error);

            console.log(result);

        }

    } catch (error) {

        hideLoading();

        console.error(error);

        alert("Server Error\n\n" + error);

    }

});
