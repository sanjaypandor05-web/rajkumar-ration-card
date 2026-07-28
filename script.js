// =====================================
// ONLINE RATION WORK V4
// =====================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqF-PjpgCbWYZTwwDXgSiD-bjZLqvYg4Y1w-a0W2ajtAnvFLh0xTon6CqSsubtDAkQiw/exec";

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

    try const res = await fetch(SCRIPT_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});

const text = await res.text();
console.log("Server Response:", text);

const result = JSON.parse(text);

hideLoading();

if (result.success) {
  showSuccess();
  form.reset();
  amount.innerHTML = "₹0";
} else {
  alert(result.error || "Submit Failed");
}
