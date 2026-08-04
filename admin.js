// ==========================================
// RAJKUMAR RATION CARD PORTAL
// ADMIN.JS - PART 1
// CONFIG + LOGIN + DASHBOARD
// ==========================================

// ---------- GOOGLE APPS SCRIPT URL ----------

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxY-3pyd__jXe76CaK2IRf6aWgfVaim3TxeM0bnIF57P4yhPO4cEeSP8RqxK2IjO8PGRA/exec";
// ---------- GLOBAL VARIABLES ----------

let applications = [];
let retailers = [];
let deleteRetailerId = "";

// ---------- PAGE LOAD ----------

document.addEventListener("DOMContentLoaded", () => {

    checkAdminLogin();

    const adminName = localStorage.getItem("userName") || "Administrator";

    const name = document.getElementById("adminName");

    if (name) {
        name.textContent = adminName;
    }

    loadDashboard();
    loadApplications();
    loadRetailers();

});

// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

function checkAdminLogin() {

    const type = localStorage.getItem("userType");

    if (type !== "admin") {

        alert("Please Login First");

        window.location.href = "login.html";

    }

}

// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(
            SCRIPT_URL + "?action=dashboard"
        );

        const data = await response.json();

        document.getElementById("totalCount").textContent =
            data.total || 0;

        document.getElementById("pendingCount").textContent =
            data.pending || 0;

        document.getElementById("successCount").textContent =
            data.success || 0;

        document.getElementById("failedCount").textContent =
            data.failed || 0;

        document.getElementById("todayCount").textContent =
            data.today || 0;

        document.getElementById("monthCount").textContent =
            data.month || 0;

        document.getElementById("retailerCount").textContent =
            data.retailers || 0;

    } catch (err) {

        console.error(err);

        alert("Dashboard Loading Failed");

    }

}

// ==========================================
// REFRESH DASHBOARD
// ==========================================

function refreshDashboard() {

    loadDashboard();

}

// ==========================================
// LOADER
// ==========================================

function showLoading() {

    document.body.style.cursor = "wait";

}

function hideLoading() {

    document.body.style.cursor = "default";

}

console.log("Admin JS Part 1 Loaded Successfully");
// ==========================================
// ADMIN.JS - PART 2
// APPLICATION MANAGEMENT
// ==========================================

// ---------- LOAD APPLICATIONS ----------

async function loadApplications() {

    try {

        showLoading();

        const response = await fetch(
            SCRIPT_URL + "?action=getApplications"
        );

        applications = await response.json();

        if (!Array.isArray(applications)) {
            applications = [];
        }

        renderApplications(applications);

    } catch (err) {

        console.error(err);

        alert("Applications Loading Failed");

    } finally {

        hideLoading();

    }

}

// ---------- RENDER APPLICATION TABLE ----------

function renderApplications(list) {

    const tbody =
        document.getElementById("applicationTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (list.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center">
                No Applications Found
            </td>
        </tr>`;

        return;

    }

    list.forEach(app => {

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

<td>${formatDate(app.date)}</td>

<td>${app.retailer}</td>

<td>

<button class="view-btn"
onclick="viewApplication('${app.id}')">

View

</button>

<button class="edit-btn"
onclick="editApplication('${app.id}')">

Edit

</button>

</td>

</tr>

`;

    });

}

// ---------- SEARCH ----------

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

const filtered=applications.filter(app=>{

return(

String(app.id).toLowerCase().includes(keyword)||

String(app.name).toLowerCase().includes(keyword)||

String(app.mobile).includes(keyword)||

String(app.service).toLowerCase().includes(keyword)

);

});

renderApplications(filtered);

});

}

// ---------- STATUS FILTER ----------

const statusFilter =
document.getElementById("statusFilter");

if(statusFilter){

statusFilter.addEventListener("change",function(){

const status=this.value;

if(status===""){

renderApplications(applications);

return;

}

const filtered=

applications.filter(app=>app.status===status);

renderApplications(filtered);

});

}

// ---------- DATE FILTER ----------

function filterByDate(){

const from=document.getElementById("fromDate").value;

const to=document.getElementById("toDate").value;

if(from===""||to===""){

renderApplications(applications);

return;

}

const result=applications.filter(app=>{

const d=new Date(app.date);

return d>=new Date(from)&&
d<=new Date(to+"T23:59:59");

});

renderApplications(result);

}

const fromDate=document.getElementById("fromDate");
const toDate=document.getElementById("toDate");

if(fromDate) fromDate.addEventListener("change",filterByDate);
if(toDate) toDate.addEventListener("change",filterByDate);

// ---------- REFRESH ----------

function refreshApplications(){

loadApplications();

loadDashboard();

}

console.log("Admin JS Part 2 Loaded");

// ==========================================
// ADMIN.JS - PART 3
// VIEW + EDIT + STATUS UPDATE
// ==========================================

// ---------- VIEW APPLICATION ----------

function viewApplication(id) {

    const app = applications.find(a => a.id === id);

    if (!app) {
        alert("Application Not Found");
        return;
    }

    alert(
`Application ID : ${app.id}

Name : ${app.name}

Mobile : ${app.mobile}

Service : ${app.service}

Status : ${app.status}

Retailer : ${app.retailer}

Village : ${app.village || ""}

Date : ${formatDate(app.date)}

Remarks : ${app.remarks || ""}`
    );

}

// ---------- EDIT APPLICATION ----------

function editApplication(id) {

    const app = applications.find(a => a.id === id);

    if (!app) {
        alert("Application Not Found");
        return;
    }

    const status = prompt(
        "Enter Status\n\nPending\nApproved\nRejected",
        app.status
    );

    if (status == null) return;

    updateApplicationStatus(id, status);

}

// ---------- UPDATE STATUS ----------

async function updateApplicationStatus(id, status) {

    try {

        showLoading();

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "updateApplicationStatus",

                applicationId: id,

                status: status

            })

        });

        const result = await response.json();

        alert(result.message);

        loadApplications();

        loadDashboard();

    } catch (err) {

        console.error(err);

        alert("Status Update Failed");

    } finally {

        hideLoading();

    }

}

// ---------- DELETE APPLICATION ----------

async function deleteApplication(id) {

    if (!confirm("Delete this Application?")) return;

    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "deleteApplication",

                applicationId: id

            })

        });

        const result = await response.json();

        alert(result.message);

        loadApplications();

        loadDashboard();

    } catch (err) {

        console.error(err);

        alert("Delete Failed");

    }

}

console.log("Admin JS Part 3 Loaded");
// ==========================================
// ADMIN.JS - PART 4
// RETAILER MANAGEMENT
// ==========================================

// ---------- LOAD RETAILERS ----------

async function loadRetailers() {

    try {

        showLoading();

        const response = await fetch(
            SCRIPT_URL + "?action=getRetailers"
        );

        retailers = await response.json();

        if (!Array.isArray(retailers)) {
            retailers = [];
        }

        renderRetailers(retailers);

    } catch (err) {

        console.error(err);

        alert("Retailers Loading Failed");

    } finally {

        hideLoading();

    }

}

// ---------- RENDER RETAILERS ----------

function renderRetailers(list) {

    const tbody = document.getElementById("retailerTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (list.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="7">No Retailers Found</td>
        </tr>`;

        return;

    }

    list.forEach(r => {

        tbody.innerHTML += `

<tr>

<td>${r.id}</td>

<td>${r.name}</td>

<td>${r.mobile}</td>

<td>${r.username}</td>

<td>${r.status}</td>

<td>${r.totalWork}</td>

<td>

<button class="edit-btn"
onclick="editRetailer('${r.id}')">

Edit

</button>

<button class="delete-btn"
onclick="deleteRetailer('${r.id}')">

Delete

</button>

</td>

</tr>

`;

    });

}

// ---------- OPEN MODAL ----------

function openRetailerModal() {

    clearRetailerForm();

    document.getElementById("retailerModal").style.display = "flex";

}

// ---------- CLOSE MODAL ----------

function closeRetailerModal() {

    document.getElementById("retailerModal").style.display = "none";

}

// ---------- CLEAR FORM ----------

function clearRetailerForm() {

    document.getElementById("retailerId").value = "";

    document.getElementById("retailerName").value = "";

    document.getElementById("retailerMobile").value = "";

    document.getElementById("retailerUsername").value = "";

    document.getElementById("retailerPassword").value = "";

    document.getElementById("retailerStatus").value = "Active";

}

// ---------- SAVE RETAILER ----------

async function saveRetailer() {

    const retailer = {

        action: "saveRetailer",

        id: document.getElementById("retailerId").value,

        name: document.getElementById("retailerName").value,

        mobile: document.getElementById("retailerMobile").value,

        username: document.getElementById("retailerUsername").value,

        password: document.getElementById("retailerPassword").value,

        status: document.getElementById("retailerStatus").value

    };

    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify(retailer)

        });

        const result = await response.json();

        alert(result.message);

        closeRetailerModal();

        loadRetailers();

        loadDashboard();

    } catch (err) {

        console.error(err);

        alert("Retailer Save Failed");

    }

}

// ---------- EDIT RETAILER ----------

function editRetailer(id) {

    const retailer = retailers.find(r => r.id === id);

    if (!retailer) return;

    document.getElementById("retailerId").value = retailer.id;

    document.getElementById("retailerName").value = retailer.name;

    document.getElementById("retailerMobile").value = retailer.mobile;

    document.getElementById("retailerUsername").value = retailer.username;

    document.getElementById("retailerPassword").value = retailer.password || "";

    document.getElementById("retailerStatus").value = retailer.status;

    document.getElementById("retailerModal").style.display = "flex";

}

// ---------- DELETE RETAILER ----------

function deleteRetailer(id) {

    if (!confirm("Delete this Retailer?")) return;

    confirmDeleteRetailer(id);

}

async function confirmDeleteRetailer(id) {

    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "deleteRetailer",

                id: id

            })

        });

        const result = await response.json();

        alert(result.message);

        loadRetailers();

        loadDashboard();

    } catch (err) {

        console.error(err);

        alert("Delete Failed");

    }

}

console.log("Admin JS Part 4 Loaded");
// ==========================================
// ADMIN.JS - PART 5
// REPORTS + EXPORT + SETTINGS
// ==========================================

// ---------- EXPORT APPLICATIONS CSV ----------

function exportApplications() {

    if (applications.length === 0) {

        alert("No Applications Found");

        return;

    }

    let csv =
    "Application ID,Name,Mobile,Service,Status,Retailer,Date\n";

    applications.forEach(app => {

        csv +=
`${app.id},${app.name},${app.mobile},${app.service},${app.status},${app.retailer},${formatDate(app.date)}\n`;

    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Applications_Report.csv";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

}

// ---------- BACKUP ----------

function backupData() {

    exportApplications();

    alert("Backup Download Started Successfully.");

}

// ---------- PRINT REPORT ----------

function printReport() {

    window.print();

}

// ---------- CHANGE ADMIN PASSWORD ----------

async function changeAdminPassword() {

    const password = prompt("Enter New Password");

    if (!password) return;

    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "changeAdminPassword",

                password: password

            })

        });

        const result = await response.json();

        if (result.success) {

            showSuccess(result.message);

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

        alert("Password Change Failed");

    }

}

// ---------- SUCCESS POPUP ----------

function showSuccess(message) {

    const popup =
    document.getElementById("successPopup");

    const text =
    document.getElementById("successMessage");

    if (popup && text) {

        text.innerHTML = message;

        popup.style.display = "flex";

    } else {

        alert(message);

    }

}

function closePopup() {

    const popup =
    document.getElementById("successPopup");

    if (popup) {

        popup.style.display = "none";

    }

}

console.log("Admin JS Part 5 Loaded Successfully");
// ==========================================
// ADMIN.JS - PART 6 (FINAL)
// LOGOUT + UTILITIES + AUTO REFRESH
// ==========================================

// ---------- LOGOUT ----------

function logout() {

    if (!confirm("Are you sure you want to Logout?")) {
        return;
    }

    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    window.location.href = "login.html";

}

// ---------- FORMAT DATE ----------

function formatDate(date) {

    if (!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString("en-IN") + " " +
           d.toLocaleTimeString("en-IN");

}

// ---------- SHOW LOADING ----------

function showLoading() {

    document.body.style.cursor = "wait";

}

// ---------- HIDE LOADING ----------

function hideLoading() {

    document.body.style.cursor = "default";

}

// ---------- RELOAD ALL ----------

function reloadAll() {

    loadDashboard();

    loadApplications();

    loadRetailers();

}

// ---------- AUTO REFRESH ----------

setInterval(() => {

    loadDashboard();

},30000);

// ---------- ESC CLOSE MODAL ----------

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        const modal=document.getElementById("retailerModal");

        if(modal){

            modal.style.display="none";

        }

        closePopup();

    }

});

// ---------- CLICK OUTSIDE MODAL ----------

window.onclick=function(event){

    const modal=document.getElementById("retailerModal");

    if(event.target===modal){

        closeRetailerModal();

    }

};

// ---------- PAGE READY ----------

console.log("===================================");

console.log("Rajkumar Ration Card Portal");

console.log("Admin Panel Loaded Successfully");

console.log("Version : 2.0");

console.log("===================================");
