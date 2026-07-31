// ==========================================
// RAJKUMAR RATION CARD PORTAL
// ADMIN.JS - PART 1
// ==========================================

// ---------- GOOGLE APPS SCRIPT URL ----------

const SCRIPT_URL =
"https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// ---------- GLOBAL VARIABLES ----------

let applications = [];
let retailers = [];
let deleteRetailerId = "";

// ---------- PAGE LOAD ----------

document.addEventListener("DOMContentLoaded", () => {

    checkAdminLogin();

    loadDashboard();

    loadApplications();

    loadRetailers();

    const adminName =
        localStorage.getItem("userName") || "Administrator";

    const adminNameEl =
        document.getElementById("adminName");

    if (adminNameEl) {
        adminNameEl.textContent = adminName;
    }

});

// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

function checkAdminLogin() {

    const userType = localStorage.getItem("userType");

    if (userType !== "admin") {

        alert("Access Denied!");

        window.location.href = "login.html";

    }

}

// ==========================================
// LOAD DASHBOARD
// ==========================================

function loadDashboard() {

    fetch(SCRIPT_URL + "?action=dashboard")

        .then(res => res.json())

        .then(data => {

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

        })

        .catch(error => {

            console.error("Dashboard Error:", error);

        });

}
// ==========================================
// ADMIN.JS - PART 2
// APPLICATIONS
// ==========================================

// ---------- LOAD APPLICATIONS ----------

function loadApplications() {

    fetch(SCRIPT_URL + "?action=getApplications")

        .then(res => res.json())

        .then(data => {

            applications = data || [];

            renderApplications(applications);

        })

        .catch(error => {

            console.error("Application Error:", error);

        });

}

// ---------- RENDER TABLE ----------

function renderApplications(data) {

    const tbody =
        document.getElementById("applicationTable");

    tbody.innerHTML = "";

    if (data.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="8">
                No Applications Found
            </td>
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

<td>${app.retailer}</td>

<td>

<button class="action-btn view-btn"

onclick="viewApplication('${app.id}')">

View

</button>

<button class="action-btn edit-btn"

onclick="editApplication('${app.id}')">

Edit

</button>

</td>

</tr>

`;

    });

}

// ---------- SEARCH ----------

document.getElementById("searchInput")

.addEventListener("keyup", function () {

    const value =
        this.value.toLowerCase();

    const result = applications.filter(app =>

        String(app.name).toLowerCase().includes(value) ||

        String(app.mobile).includes(value) ||

        String(app.id).includes(value)

    );

    renderApplications(result);

});

// ---------- STATUS FILTER ----------

document.getElementById("statusFilter")

.addEventListener("change", function () {

    const status = this.value;

    if (status === "") {

        renderApplications(applications);

        return;

    }

    const filtered = applications.filter(app =>

        app.status === status

    );

    renderApplications(filtered);

});

// ---------- REFRESH ----------

function refreshApplications() {

    loadApplications();

    loadDashboard();

}
// ==========================================
// ADMIN.JS - PART 3
// RETAILER MANAGEMENT
// ==========================================

// ---------- LOAD RETAILERS ----------

function loadRetailers() {

    fetch(SCRIPT_URL + "?action=getRetailers")

    .then(res => res.json())

    .then(data => {

        retailers = data || [];

        renderRetailers(retailers);

    })

    .catch(err => {

        console.error("Retailer Error :", err);

    });

}

// ---------- RENDER RETAILERS ----------

function renderRetailers(data){

    const tbody = document.getElementById("retailerTable");

    tbody.innerHTML = "";

    if(data.length===0){

        tbody.innerHTML=`
        <tr>
            <td colspan="7">
                No Retailers Found
            </td>
        </tr>`;

        return;

    }

    data.forEach(retailer=>{

        tbody.innerHTML += `

<tr>

<td>${retailer.id}</td>

<td>${retailer.name}</td>

<td>${retailer.mobile}</td>

<td>${retailer.username}</td>

<td>${retailer.status}</td>

<td>${retailer.totalWork}</td>

<td>

<button class="action-btn edit-btn"
onclick="editRetailer('${retailer.id}')">

Edit

</button>

<button class="action-btn delete-btn"
onclick="deleteRetailer('${retailer.id}')">

Delete

</button>

</td>

</tr>

`;

    });

}

// ---------- OPEN MODAL ----------

function openRetailerModal(){

document.getElementById("retailerModal").style.display="flex";

clearRetailerForm();

}

// ---------- CLOSE MODAL ----------

function closeRetailerModal(){

document.getElementById("retailerModal").style.display="none";

}

// ---------- CLEAR FORM ----------

function clearRetailerForm(){

document.getElementById("retailerId").value="";

document.getElementById("retailerName").value="";

document.getElementById("retailerMobile").value="";

document.getElementById("retailerUsername").value="";

document.getElementById("retailerPassword").value="";

document.getElementById("retailerStatus").value="Active";

}

// ---------- SAVE RETAILER ----------

function saveRetailer(){

const retailer={

action:"saveRetailer",

id:document.getElementById("retailerId").value,

name:document.getElementById("retailerName").value,

mobile:document.getElementById("retailerMobile").value,

username:document.getElementById("retailerUsername").value,

password:document.getElementById("retailerPassword").value,

status:document.getElementById("retailerStatus").value

};

fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(retailer)

})

.then(res=>res.json())

.then(response=>{

alert(response.message);

closeRetailerModal();

loadRetailers();

})

.catch(err=>{

console.error(err);

alert("Failed to Save Retailer");

});

}

// ---------- EDIT RETAILER ----------

function editRetailer(id){

const retailer=retailers.find(r=>r.id==id);

if(!retailer) return;

document.getElementById("retailerId").value=retailer.id;
document.getElementById("retailerName").value=retailer.name;
document.getElementById("retailerMobile").value=retailer.mobile;
document.getElementById("retailerUsername").value=retailer.username;
document.getElementById("retailerPassword").value=retailer.password || "";
document.getElementById("retailerStatus").value=retailer.status;

document.getElementById("retailerModal").style.display="flex";

}

// ---------- DELETE RETAILER ----------

function deleteRetailer(id){

deleteRetailerId=id;

document.getElementById("deletePopup").style.display="flex";

}

function closeDeletePopup(){

document.getElementById("deletePopup").style.display="none";

}

function confirmDeleteRetailer(){

fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify({

action:"deleteRetailer",

id:deleteRetailerId

})

})

.then(res=>res.json())

.then(response=>{

alert(response.message);

closeDeletePopup();

loadRetailers();

})

.catch(err=>{

console.error(err);

});

}
// ==========================================
// ADMIN.JS - PART 4 (FINAL)
// REPORTS + EXPORT + LOGOUT
// ==========================================

// ---------- EXPORT CSV ----------

function exportApplications(){

    if(applications.length===0){

        alert("No Data Found");

        return;

    }

    let csv =
    "Application ID,Name,Mobile,Service,Status,Date,Retailer\n";

    applications.forEach(app=>{

        csv +=
`${app.id},${app.name},${app.mobile},${app.service},${app.status},${app.date},${app.retailer}\n`;

    });

    const blob =
    new Blob([csv],{type:"text/csv"});

    const url =
    URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href=url;

    a.download="Applications.csv";

    a.click();

    URL.revokeObjectURL(url);

}

// ---------- PRINT REPORT ----------

function printReport(){

    window.print();

}

// ---------- BACKUP ----------

function backupData(){

    exportApplications();

    alert("Backup Download Started");

}

// ---------- SUCCESS POPUP ----------

function showSuccess(message){

    document.getElementById("successMessage").innerHTML=message;

    document.getElementById("successPopup").style.display="flex";

}

function closePopup(){

    document.getElementById("successPopup").style.display="none";

}

// ---------- VIEW APPLICATION ----------

function viewApplication(id){

    const app =
    applications.find(a=>a.id==id);

    if(!app){

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

Date : ${app.date}`

);

}

// ---------- EDIT APPLICATION ----------

function editApplication(id){

    alert(
    "Application Editing will be added in next update.\nID : "+id
    );

}

// ---------- CHANGE ADMIN PASSWORD ----------

function changeAdminPassword(){

    const pass =
    prompt("Enter New Admin Password");

    if(!pass) return;

    fetch(SCRIPT_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"changeAdminPassword",

            password:pass

        })

    })

    .then(res=>res.json())

    .then(response=>{

        showSuccess(response.message);

    })

    .catch(err=>{

        alert("Failed");

        console.error(err);

    });

}

// ---------- LOGOUT ----------

function logout(){

    if(confirm("Are you sure you want to Logout?")){

        localStorage.clear();

        window.location.href="login.html";

    }

}

console.log("Admin Panel Ready");
