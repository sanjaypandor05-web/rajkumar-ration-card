// ==========================================
// RAJKUMAR RATION CARD PORTAL
// RETAILER.JS - PART 1
// LOGIN + DASHBOARD + PROFILE
// ==========================================

// ---------- GOOGLE APPS SCRIPT URL ----------

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyP3L_6EWo3AUxweac-rjG_cpwl-GpNAozuCbmjNOQSLSJwfOETYcxeB2YHlFSJ-zeAwQ/exec";

// ---------- GLOBAL VARIABLES ----------

let applications = [];
let currentApplication = null;

// ---------- PAGE LOAD ----------

document.addEventListener("DOMContentLoaded", () => {

    checkRetailerLogin();

    loadDashboard();

    loadHistory();

    loadProfile();

    const retailerName =
        localStorage.getItem("userName") || "Retailer";

    document.getElementById("retailerName").textContent =
        retailerName;

});

// ==========================================
// CHECK LOGIN
// ==========================================

function checkRetailerLogin() {

    const userType =
        localStorage.getItem("userType");

    if (userType !== "retailer") {

        alert("Access Denied!");

        window.location.href = "login.html";

    }

}

// ==========================================
// LOAD DASHBOARD
// ==========================================

function loadDashboard() {

    const retailerId =
        localStorage.getItem("userId");

    fetch(
        SCRIPT_URL +
        "?action=retailerDashboard&id=" +
        encodeURIComponent(retailerId)
    )

    .then(res => res.json())

    .then(data => {

        document.getElementById("totalWork").textContent =
            data.total || 0;

        document.getElementById("pendingWork").textContent =
            data.pending || 0;

        document.getElementById("successWork").textContent =
            data.success || 0;

        document.getElementById("failedWork").textContent =
            data.failed || 0;

    })

    .catch(error => {

        console.error("Dashboard Error:", error);

    });

}

// ==========================================
// LOAD PROFILE
// ==========================================

function loadProfile() {

    document.getElementById("profileName").value =
        localStorage.getItem("userName") || "";

    document.getElementById("profileId").value =
        localStorage.getItem("userId") || "";

    document.getElementById("profileMobile").value =
        localStorage.getItem("mobile") || "";

    document.getElementById("profileUsername").value =
        localStorage.getItem("username") || "";

}

console.log("Retailer JS Part 1 Loaded");
// ==========================================
// RETAILER.JS - PART 2
// NEW APPLICATION SUBMIT
// ==========================================

// ---------- APPLICATION FORM ----------

const applicationForm = document.getElementById("applicationForm");

if (applicationForm) {
    applicationForm.addEventListener("submit", submitApplication);
}

// ---------- SUBMIT APPLICATION ----------

function submitApplication(e) {

    e.preventDefault();

    const retailerId = localStorage.getItem("userId");

    const name = document.getElementById("applicantName").value.trim();
    const mobile = document.getElementById("mobileNumber").value.trim();
    const aadhaar = document.getElementById("aadhaarNumber").value.trim();
    const rationCard = document.getElementById("rationCardNumber").value.trim();
    const service = document.getElementById("serviceType").value;
    const village = document.getElementById("village").value.trim();
    const remarks = document.getElementById("remarks").value.trim();

    // ---------- VALIDATION ----------

    if (name === "") {
        showError("Please Enter Applicant Name");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        showError("Enter Valid Mobile Number");
        return;
    }

    if (!/^[0-9]{12}$/.test(aadhaar)) {
        showError("Enter Valid Aadhaar Number");
        return;
    }

    if (service === "") {
        showError("Please Select Service");
        return;
    }

    const data = {
        action: "submitApplication",
        retailerId: retailerId,
        name: name,
        mobile: mobile,
        aadhaar: aadhaar,
        rationCard: rationCard,
        service: service,
        village: village,
        remarks: remarks
    };

    fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    .then(res => res.json())

    .then(response => {

        if (response.success) {

            showSuccess(response.message || "Application Submitted Successfully");

            applicationForm.reset();

            loadDashboard();

            loadHistory();

        } else {

            showError(response.message || "Application Submit Failed");

        }

    })

    .catch(error => {

        console.error(error);

        showError("Server Error");

    });

}

// ---------- DOCUMENT SELECT ----------

const documentInput = document.getElementById("documents");

if (documentInput) {

    documentInput.addEventListener("change", function () {

        if (this.files.length > 0) {

            console.log("Selected Files:", this.files);

        }

    });

}
// ==========================================
// RETAILER.JS - PART 3
// WORK HISTORY + SEARCH + FILTER
// ==========================================

// ---------- LOAD HISTORY ----------

function loadHistory() {

    const retailerId = localStorage.getItem("userId");

    fetch(
        SCRIPT_URL +
        "?action=getRetailerHistory&id=" +
        encodeURIComponent(retailerId)
    )

    .then(res => res.json())

    .then(data => {

        applications = data || [];

        renderHistory(applications);

    })

    .catch(error => {

        console.error(error);

        showError("History Load Failed");

    });

}

// ---------- RENDER HISTORY ----------

function renderHistory(data) {

    const tbody = document.getElementById("historyTable");

    tbody.innerHTML = "";

    if (data.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="7">No Records Found</td>
        </tr>`;

        return;

    }

    data.forEach(app => {

        tbody.innerHTML += `

        <tr>

            <td>${app.id}</td>

            <td>${app.name}</td>

            <td>${app.mobile}</td>

            <td>${app.service}</td>

            <td>
                <span class="status-${String(app.status).toLowerCase()}">
                    ${app.status}
                </span>
            </td>

            <td>${app.date}</td>

            <td>

                <button class="print-btn"
                onclick="viewApplication('${app.id}')">

                View

                </button>

            </td>

        </tr>

        `;

    });

}

// ---------- SEARCH ----------

document.getElementById("searchHistory")
.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const result = applications.filter(app =>

        String(app.name).toLowerCase().includes(value) ||

        String(app.mobile).includes(value) ||

        String(app.id).includes(value)

    );

    renderHistory(result);

});

// ---------- STATUS FILTER ----------

document.getElementById("historyStatus")
.addEventListener("change", function () {

    const status = this.value;

    if (status === "") {

        renderHistory(applications);

        return;

    }

    const result = applications.filter(app =>
        app.status === status
    );

    renderHistory(result);

});

// ---------- DATE FILTER ----------

document.getElementById("historyFromDate")
.addEventListener("change", filterHistoryByDate);

document.getElementById("historyToDate")
.addEventListener("change", filterHistoryByDate);

function filterHistoryByDate() {

    const from =
        document.getElementById("historyFromDate").value;

    const to =
        document.getElementById("historyToDate").value;

    if (!from || !to) {

        renderHistory(applications);

        return;

    }

    const result = applications.filter(app => {

        return app.date >= from && app.date <= to;

    });

    renderHistory(result);

}
// ==========================================
// RETAILER.JS - PART 4
// VIEW APPLICATION + PRINT + PDF
// ==========================================

// ---------- VIEW APPLICATION ----------

function viewApplication(id) {

    currentApplication = applications.find(app => app.id == id);

    if (!currentApplication) {

        showError("Application Not Found");

        return;

    }

    document.getElementById("applicationDetails").innerHTML = `

        <p><b>Application ID :</b> ${currentApplication.id}</p>
        <p><b>Applicant Name :</b> ${currentApplication.name}</p>
        <p><b>Mobile :</b> ${currentApplication.mobile}</p>
        <p><b>Aadhaar :</b> ${currentApplication.aadhaar || "-"}</p>
        <p><b>Ration Card :</b> ${currentApplication.rationCard || "-"}</p>
        <p><b>Service :</b> ${currentApplication.service}</p>
        <p><b>Village :</b> ${currentApplication.village || "-"}</p>
        <p><b>Status :</b> ${currentApplication.status}</p>
        <p><b>Date :</b> ${currentApplication.date}</p>
        <p><b>Remarks :</b> ${currentApplication.remarks || "-"}</p>

    `;

    document.getElementById("viewModal").style.display = "flex";

}

// ---------- CLOSE MODAL ----------

function closeViewModal() {

    document.getElementById("viewModal").style.display = "none";

}

// ---------- PRINT RECEIPT ----------

function printApplication() {

    const printContent =
        document.getElementById("applicationDetails").innerHTML;

    const newWindow = window.open("", "", "width=800,height=700");

    newWindow.document.write(`
        <html>
        <head>
            <title>Application Receipt</title>
            <style>
                body{
                    font-family:Arial;
                    padding:20px;
                }
                h2{
                    text-align:center;
                }
                p{
                    margin:8px 0;
                    font-size:16px;
                }
            </style>
        </head>
        <body>

        <h2>Rajkumar Ration Card Portal</h2>
        ${printContent}

        </body>
        </html>
    `);

    newWindow.document.close();
    newWindow.print();

}

// ---------- DOWNLOAD PDF ----------

function downloadApplicationPDF() {

    if (!currentApplication) {

        showError("No Application Selected");

        return;

    }

    alert("PDF Download will be connected with Google Apps Script.");

}

// ---------- CLOSE MODAL OUTSIDE CLICK ----------

window.onclick = function(event) {

    const modal = document.getElementById("viewModal");

    if (event.target === modal) {

        closeViewModal();

    }

};

console.log("Retailer JS Part 4 Loaded");

// ==========================================
// RETAILER.JS - PART 5
// PROFILE + CHANGE PASSWORD + POPUPS
// ==========================================

// ---------- CHANGE PASSWORD ----------

function changePassword() {

    const oldPassword =
        document.getElementById("oldPassword").value.trim();

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {

        showError("Please Fill All Fields");

        return;

    }

    if (newPassword !== confirmPassword) {

        showError("New Password and Confirm Password Do Not Match");

        return;

    }

    fetch(SCRIPT_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            action: "changeRetailerPassword",

            retailerId: localStorage.getItem("userId"),

            oldPassword: oldPassword,

            newPassword: newPassword

        })

    })

    .then(res => res.json())

    .then(response => {

        if (response.success) {

            showSuccess(response.message || "Password Changed Successfully");

            document.getElementById("oldPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";

        } else {

            showError(response.message || "Password Change Failed");

        }

    })

    .catch(error => {

        console.error(error);

        showError("Server Error");

    });

}

// ---------- SUCCESS POPUP ----------

function showSuccess(message) {

    document.getElementById("successMessage").innerHTML = message;

    document.getElementById("successPopup").style.display = "flex";

}

function closePopup() {

    document.getElementById("successPopup").style.display = "none";

}

// ---------- ERROR POPUP ----------

function showError(message) {

    document.getElementById("errorMessage").innerHTML = message;

    document.getElementById("errorPopup").style.display = "flex";

}

function closeErrorPopup() {

    document.getElementById("errorPopup").style.display = "none";

}

console.log("Retailer JS Part 5 Loaded");
// ==========================================
// RETAILER.JS - PART 6 (FINAL)
// LOGOUT + AUTO REFRESH + SESSION
// ==========================================

// ---------- AUTO REFRESH ----------

setInterval(() => {

    loadDashboard();

    loadHistory();

}, 60000);

// ---------- LOGOUT ----------

function logout() {

    if (confirm("Are you sure you want to Logout?")) {

        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("mobile");
        localStorage.removeItem("username");

        window.location.href = "login.html";

    }

}

// ---------- SESSION CHECK ----------

window.addEventListener("load", () => {

    const userType = localStorage.getItem("userType");

    if (userType !== "retailer") {

        alert("Session Expired!");

        window.location.href = "login.html";

    }

});

// ---------- REFRESH BUTTON ----------

function refreshData() {

    loadDashboard();

    loadHistory();

    loadProfile();

    showSuccess("Data Refreshed Successfully");

}

// ---------- PAGE VISIBILITY ----------

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        loadDashboard();

        loadHistory();

    }

});

// ---------- NETWORK STATUS ----------

window.addEventListener("online", () => {

    showSuccess("Internet Connected");

    loadDashboard();

    loadHistory();

});

window.addEventListener("offline", () => {

    showError("Internet Connection Lost");

});

// ---------- READY ----------

console.log("====================================");
console.log("Retailer Panel Ready");
console.log("Rajkumar Ration Card Portal");
console.log("====================================");
