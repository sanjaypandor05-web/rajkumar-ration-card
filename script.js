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
if (service && amount) {
    service.addEventListener("change", function () {
        amount.innerHTML = "₹" + (priceList[service.value] || 0);
    });
}

// Mobile Validation
function validateMobile(number) {
    return /^[6-9]\d{9}$/.test(number);
}

// Loading
function showLoading() {
    if (loading) loading.style.display = "flex";
}

function hideLoading() {
    if (loading) loading.style.display = "none";
}

// Success Popup
function showSuccess() {
    if (successPopup) successPopup.style.display = "flex";
}

function closePopup() {
    if (successPopup) successPopup.style.display = "none";
}

window.closePopup = closePopup;

// Submit Form
if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const mobile = document.getElementById("mobile").value;

        if (!validateMobile(mobile)) {
            alert("Please Enter Valid Mobile Number");
            return;
        }

        showLoading();

        const data = {
            gujaratiName: document.getElementById("gujaratiName").value,
            englishName: document.getElementById("englishName").value,
            mobile: mobile,
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const text = await response.text();

            console.log("Server Response:", text);

            let result;

            try {
                result = JSON.parse(text);
            } catch (e) {
                throw new Error("Invalid JSON Response : " + text);
            }

            hideLoading();

            if (result.success) {

                showSuccess();
                form.reset();

                if (amount) {
                    amount.innerHTML = "₹0";
                }

            } else {

                alert(result.error || "Submit Failed");

            }

        } catch (err) {

            hideLoading();

            console.error(err);

            alert("Server Error\n\n" + err.message);

        }

    });

}
