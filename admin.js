// ==========================================
// ADMIN.JS - PART 1
// RAJKUMAR RATION CARD PORTAL
// ==========================================

// ================================
// GOOGLE APPS SCRIPT URL
// ================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyFrg_3lB5WKelkE2vsRW4ZaK7PyvM5F93A-Jfzqla3y8gSQIKei_QZBet9VwewQIXg/exec";


// ================================
// PAGE LOAD
// ================================

document.addEventListener("DOMContentLoaded", () => {

    checkAdminLogin();

    generateRetailerId();

    loadDashboard();

    loadApplications();

    loadRetailers();

});


// ================================
// LOGIN CHECK
// ================================

function checkAdminLogin() {

    const login = localStorage.getItem("adminLogin");

    if (login !== "true") {

        alert("Please Login First");

        window.location.href = "login.html";

        return;

    }

}


// ================================
// DASHBOARD
// ================================

async function loadDashboard() {

    try {

        const response = await fetch(

            SCRIPT_URL + "?action=dashboard"

        );

        const result = await response.json();

        if (!result.success) return;

        document.getElementById("totalApplications").innerHTML =
            result.total || 0;

        document.getElementById("pendingApplications").innerHTML =
            result.pending || 0;

        document.getElementById("successfulApplications").innerHTML =
            result.successful || 0;

        document.getElementById("failedApplications").innerHTML =
            result.failed || 0;

        document.getElementById("totalRetailers").innerHTML =
            result.retailers || 0;

        document.getElementById("todayApplications").innerHTML =
            result.today || 0;

        document.getElementById("completedToday").innerHTML =
            result.completedToday || 0;

        document.getElementById("pendingToday").innerHTML =
            result.pendingToday || 0;

    } catch (err) {

        console.error(err);

    }

}


// ================================
// LOAD APPLICATIONS
// ================================

async function loadApplications() {

    const table = document.getElementById("applicationTable");

    if (!table) return;

    table.innerHTML = `
<tr>
<td colspan="9" align="center">
Loading...
</td>
</tr>`;

    try {

        const response = await fetch(

            SCRIPT_URL + "?action=history"

        );

        const result = await response.json();

        if (!result.success) {

            table.innerHTML = `
<tr>
<td colspan="9" align="center">
No Applications Found
</td>
</tr>`;

            return;

        }

        table.innerHTML = "";

        result.data.forEach(app => {

            table.innerHTML += `

<tr>

<td>${app.applicationId}</td>

<td>${app.englishName}</td>

<td>${app.mobile}</td>

<td>${app.service}</td>

<td>${app.status}</td>

<td>${app.retailer || "-"}</td>

<td>${app.remarks || "-"}</td>

<td>${app.date}</td>

<td>

<button onclick="viewApplication('${app.applicationId}')">

👁 View

</button>

<button onclick="changeStatus('${app.applicationId}')">

✏ Status

</button>

<button onclick="deleteApplication('${app.applicationId}')">

🗑 Delete

</button>

</td>

</tr>

`;

        });

    } catch (err) {

        console.error(err);

        table.innerHTML = `
<tr>
<td colspan="9" align="center">
Server Error
</td>
</tr>`;

    }

}


// ================================
// REFRESH
// ================================

function refreshDashboard() {

    loadDashboard();

    loadApplications();

    loadRetailers();

}
// ==========================================
// ADMIN.JS - PART 2
// SEARCH + FILTER + STATUS + DELETE
// ==========================================

// ================================
// SEARCH APPLICATION
// ================================

function searchApplication() {

    const search = document
        .getElementById("searchText")
        .value
        .trim()
        .toLowerCase();

    const rows =
        document.querySelectorAll("#applicationTable tr");

    rows.forEach(row => {

        if (row.innerText.toLowerCase().includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


// ================================
// STATUS FILTER
// ================================

function filterApplications() {

    const status =
        document.getElementById("statusFilter").value;

    const fromDate =
        document.getElementById("fromDate").value;

    const toDate =
        document.getElementById("toDate").value;

    const rows =
        document.querySelectorAll("#applicationTable tr");

    rows.forEach(row => {

        if (!row.cells.length) return;

        const rowStatus = row.cells[4].innerText.trim();
        const rowDate = row.cells[7].innerText.trim();

        let visible = true;

        if (status && rowStatus !== status) {

            visible = false;

        }

        if (fromDate && rowDate < fromDate) {

            visible = false;

        }

        if (toDate && rowDate > toDate) {

            visible = false;

        }

        row.style.display = visible ? "" : "none";

    });

}


// ================================
// VIEW APPLICATION
// ================================

async function viewApplication(id) {

    try {

        const response = await fetch(

            SCRIPT_URL +
            "?action=searchId&id=" +
            encodeURIComponent(id)

        );

        const result = await response.json();

        if (!result.success) {

            alert("Application Not Found");

            return;

        }

        const app = result.data;

        document.getElementById("applicationDetails").innerHTML = `

<b>Application ID :</b> ${app.applicationId}<br><br>

<b>Name :</b> ${app.englishName}<br><br>

<b>Gujarati Name :</b> ${app.gujaratiName || "-"}<br><br>

<b>Mobile :</b> ${app.mobile}<br><br>

<b>Service :</b> ${app.service}<br><br>

<b>Status :</b> ${app.status}<br><br>

<b>Retailer :</b> ${app.retailer || "-"}<br><br>

<b>Remarks :</b> ${app.remarks || "-"}<br><br>

<b>Date :</b> ${app.date}

`;

        document.getElementById("viewPopup").style.display = "flex";

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

}

function closeViewPopup() {

    document.getElementById("viewPopup").style.display = "none";

}


// ================================
// CHANGE STATUS
// ================================

function changeStatus(id) {

    document.getElementById("editApplicationId").value = id;

    document.getElementById("statusPopup").style.display = "flex";

}

function closeStatusPopup() {

    document.getElementById("statusPopup").style.display = "none";

}


// ================================
// SAVE STATUS
// ================================

async function saveStatus() {

    const id =
        document.getElementById("editApplicationId").value;

    const status =
        document.getElementById("editStatus").value;

    const remarks =
        document.getElementById("editRemarks").value;

    try {

        const response = await fetch(

            SCRIPT_URL +

            "?action=updateStatus" +

            "&id=" + encodeURIComponent(id) +

            "&status=" + encodeURIComponent(status) +

            "&remarks=" + encodeURIComponent(remarks)

        );

        const result = await response.json();

        if (result.success) {

            closeStatusPopup();

            showSuccess("Status Updated Successfully");

            refreshDashboard();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

}


// ================================
// DELETE APPLICATION
// ================================

let deleteApplicationId = "";

function deleteApplication(id) {

    deleteApplicationId = id;

    document.getElementById("deletePopup").style.display = "flex";

}

function closeDeletePopup() {

    document.getElementById("deletePopup").style.display = "none";

}

document.addEventListener("DOMContentLoaded", () => {

    const btn =
        document.getElementById("confirmDeleteBtn");

    if (btn) {

        btn.onclick = confirmDelete;

    }

});


async function confirmDelete() {

    try {

        const response = await fetch(

            SCRIPT_URL +

            "?action=deleteApplication&id=" +

            encodeURIComponent(deleteApplicationId)

        );

        const result = await response.json();

        closeDeletePopup();

        if (result.success) {

            showSuccess("Application Deleted Successfully");

            refreshDashboard();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

}
// ==========================================
// ADMIN.JS - PART 3
// RETAILER MANAGEMENT
// ==========================================


// ================================
// AUTO GENERATE RETAILER ID
// ================================

function generateRetailerId() {

    const number = Math.floor(Math.random() * 9000) + 1000;

    document.getElementById("generatedRetailerId").value =
        "RTL" + number;

}


// ================================
// CREATE RETAILER
// ================================

async function createRetailer() {

    const name =
        document.getElementById("retailerName").value.trim();

    const mobile =
        document.getElementById("retailerMobile").value.trim();

    const id =
        document.getElementById("generatedRetailerId").value.trim();

    const password =
        document.getElementById("retailerPassword").value.trim();

    if (!name || !mobile || !password) {

        alert("Please Fill All Fields");

        return;

    }

    try {

        const response = await fetch(

            SCRIPT_URL +

            "?action=createRetailer" +

            "&id=" + encodeURIComponent(id) +

            "&name=" + encodeURIComponent(name) +

            "&mobile=" + encodeURIComponent(mobile) +

            "&password=" + encodeURIComponent(password)

        );

        const result = await response.json();

        if (result.success) {

            showSuccess("Retailer Created Successfully");

            document.getElementById("retailerName").value = "";
            document.getElementById("retailerMobile").value = "";
            document.getElementById("retailerPassword").value = "";

            generateRetailerId();

            loadRetailers();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

}


// ================================
// LOAD RETAILERS
// ================================

async function loadRetailers() {

    const table =
        document.getElementById("retailerTable");

    if (!table) return;

    table.innerHTML =
        "<tr><td colspan='6' align='center'>Loading...</td></tr>";

    try {

        const response = await fetch(

            SCRIPT_URL + "?action=retailers"

        );

        const result = await response.json();

        if (!result.success) {

            table.innerHTML =
                "<tr><td colspan='6'>No Retailers Found</td></tr>";

            return;

        }

        table.innerHTML = "";

        result.data.forEach(retailer => {

            table.innerHTML += `

<tr>

<td>${retailer.id}</td>

<td>${retailer.name}</td>

<td>${retailer.mobile}</td>

<td>${retailer.status}</td>

<td>${retailer.totalWork || 0}</td>

<td>

<button onclick="resetRetailerPassword('${retailer.id}')">

🔑 Reset

</button>

<button onclick="toggleRetailerStatus('${retailer.id}','${retailer.status}')">

${retailer.status==="Blocked"?"✅ Unblock":"🚫 Block"}

</button>

<button onclick="removeRetailer('${retailer.id}')">

🗑 Delete

</button>

</td>

</tr>

`;

        });

    } catch (err) {

        console.error(err);

    }

}


// ================================
// RESET PASSWORD
// ================================

function resetRetailerPassword(id) {

    document.getElementById("resetRetailerId").value = id;

    document.getElementById("resetPasswordPopup").style.display = "flex";

}

function closeResetPasswordPopup() {

    document.getElementById("resetPasswordPopup").style.display = "none";

}

async function saveRetailerPassword() {

    const id =
        document.getElementById("resetRetailerId").value;

    const password =
        document.getElementById("newRetailerPassword").value;

    if (!password) {

        alert("Enter Password");

        return;

    }

    try {

        const response = await fetch(

            SCRIPT_URL +

            "?action=resetPassword" +

            "&id=" + encodeURIComponent(id) +

            "&password=" + encodeURIComponent(password)

        );

        const result = await response.json();

        if (result.success) {

            closeResetPasswordPopup();

            showSuccess("Password Updated");

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

    }

}


// ================================
// BLOCK / UNBLOCK
// ================================

async function toggleRetailerStatus(id, status) {

    const newStatus =
        status === "Blocked" ? "Active" : "Blocked";

    try {

        const response = await fetch(

            SCRIPT_URL +

            "?action=blockRetailer" +

            "&id=" + encodeURIComponent(id) +

            "&status=" + encodeURIComponent(newStatus)

        );

        const result = await response.json();

        if (result.success) {

            showSuccess("Retailer Status Updated");

            loadRetailers();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

    }

}


// ================================
// DELETE RETAILER
// ================================

async function removeRetailer(id) {

    if (!confirm("Delete Retailer?")) return;

    try {

        const response = await fetch(

            SCRIPT_URL +

            "?action=deleteRetailer&id=" +

            encodeURIComponent(id)

        );

        const result = await response.json();

        if (result.success) {

            showSuccess("Retailer Deleted");

            loadRetailers();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

    }

}
// ==========================================
// ADMIN.JS - PART 4
// REPORTS + SETTINGS + LOGOUT + UTILITIES
// ==========================================


// ================================
// LOGOUT
// ================================

function logout() {

    document.getElementById("logoutPopup").style.display = "flex";

}

function closeLogoutPopup() {

    document.getElementById("logoutPopup").style.display = "none";

}

function confirmLogout() {

    localStorage.removeItem("adminLogin");
    localStorage.removeItem("adminId");

    window.location.href = "login.html";

}


// ================================
// BACKUP DATA
// ================================

async function backupData() {

    try {

        showLoading();

        const response = await fetch(

            SCRIPT_URL + "?action=backup"

        );

        const result = await response.json();

        hideLoading();

        if (result.success) {

            showSuccess("Backup Created Successfully");

        } else {

            showError(result.message);

        }

    } catch (err) {

        hideLoading();

        console.error(err);

        showError("Backup Failed");

    }

}


// ================================
// EXPORT EXCEL
// ================================

function exportExcel() {

    window.open(

        SCRIPT_URL + "?action=exportExcel",

        "_blank"

    );

}


// ================================
// PRINT REPORT
// ================================

function printReport() {

    window.print();

}


// ================================
// CHANGE ADMIN PASSWORD
// ================================

async function changeAdminPassword() {

    const password =
        document.getElementById("newAdminPassword").value.trim();

    if (!password) {

        alert("Enter New Password");

        return;

    }

    try {

        const response = await fetch(

            SCRIPT_URL +

            "?action=changeAdminPassword" +

            "&password=" +

            encodeURIComponent(password)

        );

        const result = await response.json();

        if (result.success) {

            document.getElementById("newAdminPassword").value = "";

            showSuccess("Password Changed Successfully");

        } else {

            showError(result.message);

        }

    } catch (err) {

        console.error(err);

        showError("Server Error");

    }

}


// ================================
// SUCCESS POPUP
// ================================

function showSuccess(message) {

    document.getElementById("successMessage").innerHTML = message;

    document.getElementById("successPopup").style.display = "flex";

}

function closePopup() {

    document.getElementById("successPopup").style.display = "none";

}


// ================================
// ERROR POPUP
// ================================

function showError(message) {

    document.getElementById("errorMessage").innerHTML = message;

    document.getElementById("errorPopup").style.display = "flex";

}

function closeErrorPopup() {

    document.getElementById("errorPopup").style.display = "none";

}


// ================================
// LOADING
// ================================

function showLoading() {

    document.getElementById("loading").style.display = "flex";

}

function hideLoading() {

    document.getElementById("loading").style.display = "none";

}


// ================================
// AUTO REFRESH
// ================================

setInterval(() => {

    loadDashboard();

    loadApplications();

    loadRetailers();

}, 60000);


// ================================
// REFRESH DASHBOARD
// ================================

function refreshDashboard() {

    loadDashboard();

    loadApplications();

    loadRetailers();

}


// ================================
// PAGE RELOAD
// ================================

window.onfocus = function () {

    refreshDashboard();

};


