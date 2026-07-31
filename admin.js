// ==========================================
// ADMIN.JS - PART 1
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

    checkAdminLogin();

    loadDashboard();

    loadApplications();

    loadRetailers();

});

// ----------------------------
// ADMIN LOGIN CHECK
// ----------------------------

function checkAdminLogin() {

    if (localStorage.getItem("adminLogin") !== "true") {

        alert("Please Login First");

        window.location.href = "login.html";

        return;

    }

    const adminName = localStorage.getItem("adminName") || "Administrator";

    const adminLabel = document.getElementById("adminName");

    if (adminLabel) {

        adminLabel.innerText = adminName;

    }

}

// ----------------------------
// LOAD DASHBOARD
// ----------------------------

async function loadDashboard() {

    try {

        const response =
        await fetch(SCRIPT_URL + "?action=dashboard");

        const result = await response.json();

        if (!result.success) return;

        document.getElementById("totalApplications").innerText =
        result.total || 0;

        document.getElementById("pendingApplications").innerText =
        result.pending || 0;

        document.getElementById("approvedApplications").innerText =
        result.approved || 0;

        document.getElementById("rejectedApplications").innerText =
        result.rejected || 0;

    } catch (err) {

        console.error(err);

    }

}

// ----------------------------
// LOAD APPLICATIONS
// ----------------------------

async function loadApplications() {

    const tbody =
    document.getElementById("applicationTable");

    if (!tbody) return;

    tbody.innerHTML =
    "<tr><td colspan='8'>Loading...</td></tr>";

    try {

        const response =
        await fetch(SCRIPT_URL + "?action=history");

        const result =
        await response.json();

        if (!result.success) {

            tbody.innerHTML =
            "<tr><td colspan='8'>No Applications Found</td></tr>";

            return;

        }

        tbody.innerHTML = "";

        result.data.forEach(app => {

            let badge = "";

            if (app.status === "Pending") {

                badge = "<span class='status-pending'>Pending</span>";

            } else if (app.status === "Approved") {

                badge = "<span class='status-approved'>Successful</span>";

            } else {

                badge = "<span class='status-rejected'>Failed</span>";

            }

            tbody.innerHTML += `

            <tr>

                <td>${app.applicationId}</td>

                <td>${app.englishName}</td>

                <td>${app.mobile}</td>

                <td>${app.service}</td>

                <td>${badge}</td>

                <td>${app.retailer || "-"}</td>

                <td>${app.date}</td>

                <td>

                    <button onclick="viewApplication('${app.applicationId}')">
                    View
                    </button>

                    <button onclick="changeStatus('${app.applicationId}')">
                    Status
                    </button>

                    <button onclick="deleteApplication('${app.applicationId}')">
                    Delete
                    </button>

                </td>

            </tr>

            `;

        });

    } catch (err) {

        console.error(err);

        tbody.innerHTML =
        "<tr><td colspan='8'>Server Error</td></tr>";

    }
// ==========================================
// ADMIN.JS - PART 2
// SEARCH + FILTER + VIEW
// ==========================================

// ----------------------------
// SEARCH APPLICATION
// ----------------------------

function searchApplication() {

    const text =
    document.getElementById("searchText")
    .value
    .trim()
    .toLowerCase();

    const rows =
    document.querySelectorAll("#applicationTable tr");

    rows.forEach(row => {

        const data =
        row.innerText.toLowerCase();

        if (data.indexOf(text) > -1) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// ----------------------------
// FILTER STATUS
// ----------------------------

function filterStatus() {

    const status =
    document.getElementById("statusFilter").value;

    const rows =
    document.querySelectorAll("#applicationTable tr");

    rows.forEach(row => {

        if (!status) {

            row.style.display = "";

            return;

        }

        if (row.innerText.includes(status)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// ----------------------------
// FILTER DATE
// ----------------------------

function filterDate() {

    const date =
    document.getElementById("dateFilter").value;

    if (!date) {

        loadApplications();

        return;

    }

    const rows =
    document.querySelectorAll("#applicationTable tr");

    rows.forEach(row => {

        if (row.innerText.includes(date)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// ----------------------------
// REFRESH
// ----------------------------

function refreshDashboard() {

    loadDashboard();

    loadApplications();

    loadRetailers();

}

// ----------------------------
// VIEW APPLICATION
// ----------------------------

async function viewApplication(id) {

    try {

        const response =
        await fetch(
            SCRIPT_URL +
            "?action=searchId&id=" +
            encodeURIComponent(id)
        );

        const result =
        await response.json();

        if (!result.success) {

            alert("Application Not Found");

            return;

        }

        const app = result.data;

        alert(

            "Application ID : " + app.applicationId +

            "\n\nName : " + app.englishName +

            "\nGujarati Name : " + app.gujaratiName +

            "\nMobile : " + app.mobile +

            "\nVillage : " + app.village +

            "\nTaluka : " + app.taluka +

            "\nDistrict : " + app.district +

            "\nService : " + app.service +

            "\nStatus : " + app.status +

            "\nDate : " + app.date

        );

    }

    catch(err){

        console.error(err);

        alert("Server Error");

    }

}
    
}
// ==========================================
// ADMIN.JS - PART 3
// STATUS UPDATE + DELETE + POPUPS
// ==========================================

// ----------------------------
// CHANGE STATUS
// ----------------------------

async function changeStatus(id){

    const status = prompt(

        "Select Status\n\nPending\nApproved\nRejected"

    );

    if(!status) return;

    try{

        const response = await fetch(

            SCRIPT_URL +
            "?action=updateStatus&id=" +
            encodeURIComponent(id) +
            "&status=" +
            encodeURIComponent(status)

        );

        const result = await response.json();

        if(result.success){

            showSuccess("Application Status Updated Successfully");

            refreshDashboard();

        }else{

            alert(result.message);

        }

    }catch(err){

        console.error(err);

        alert("Server Error");

    }

}

// ----------------------------
// DELETE APPLICATION
// ----------------------------

let deleteApplicationId = "";

// Open Delete Popup

function deleteApplication(id){

    deleteApplicationId = id;

    document.getElementById("deletePopup").style.display = "flex";

}

// Close Delete Popup

function closeDeletePopup(){

    document.getElementById("deletePopup").style.display = "none";

}

// ----------------------------
// CONFIRM DELETE
// ----------------------------

document.addEventListener("DOMContentLoaded",()=>{

    const btn = document.getElementById("confirmDeleteBtn");

    if(btn){

        btn.onclick = confirmDelete;

    }

});

async function confirmDelete(){

    try{

        const response = await fetch(

            SCRIPT_URL +
            "?action=deleteApplication&id=" +
            encodeURIComponent(deleteApplicationId)

        );

        const result = await response.json();

        closeDeletePopup();

        if(result.success){

            showSuccess("Application Deleted Successfully");

            refreshDashboard();

        }else{

            alert(result.message);

        }

    }catch(err){

        console.error(err);

        alert("Server Error");

    }

}

// ----------------------------
// SUCCESS POPUP
// ----------------------------

function showSuccess(message){

    document.getElementById("successMessage").innerText = message;

    document.getElementById("successPopup").style.display = "flex";

}

function closePopup(){

    document.getElementById("successPopup").style.display = "none";

}
// ==========================================
// ADMIN.JS - PART 4 (FINAL)
// RETAILER + LOGOUT + AUTO REFRESH
// ==========================================

// ----------------------------
// CREATE RETAILER
// ----------------------------

async function createRetailer(){

    const name =
    document.getElementById("retailerName").value.trim();

    const mobile =
    document.getElementById("retailerMobile").value.trim();

    const id =
    document.getElementById("retailerId").value.trim();

    const password =
    document.getElementById("retailerPassword").value.trim();

    if(!name || !mobile || !id || !password){

        alert("Please Fill All Fields");

        return;

    }

    try{

        const response = await fetch(

            SCRIPT_URL +
            "?action=createRetailer" +
            "&id=" + encodeURIComponent(id) +
            "&password=" + encodeURIComponent(password) +
            "&name=" + encodeURIComponent(name) +
            "&mobile=" + encodeURIComponent(mobile)

        );

        const result = await response.json();

        if(result.success){

            showSuccess("Retailer Created Successfully");

            document.getElementById("retailerName").value = "";
            document.getElementById("retailerMobile").value = "";
            document.getElementById("retailerId").value = "";
            document.getElementById("retailerPassword").value = "";

            loadRetailers();

        }else{

            alert(result.message);

        }

    }catch(err){

        console.error(err);

        alert("Server Error");

    }

}

// ----------------------------
// LOAD RETAILERS
// ----------------------------

async function loadRetailers(){

    const table =
    document.getElementById("retailerTable");

    if(!table) return;

    table.innerHTML =
    "<tr><td colspan='6'>Loading...</td></tr>";

    try{

        const response =
        await fetch(SCRIPT_URL + "?action=retailers");

        const result =
        await response.json();

        table.innerHTML = "";

        if(!result.success){

            table.innerHTML =
            "<tr><td colspan='6'>No Retailers Found</td></tr>";

            return;

        }

        document.getElementById("totalRetailers").innerText =
        result.data.length;

        result.data.forEach(retailer=>{

            table.innerHTML += `

            <tr>

                <td>${retailer.id}</td>

                <td>${retailer.name}</td>

                <td>${retailer.mobile}</td>

                <td>${retailer.status}</td>

                <td>${retailer.created || "-"}</td>

                <td>

                    <button onclick="removeRetailer('${retailer.id}')">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }catch(err){

        console.error(err);

    }

}

// ----------------------------
// DELETE RETAILER
// ----------------------------

async function removeRetailer(id){

    if(!confirm("Delete this Retailer?")) return;

    try{

        const response =
        await fetch(

            SCRIPT_URL +
            "?action=deleteRetailer&id=" +
            encodeURIComponent(id)

        );

        const result =
        await response.json();

        if(result.success){

            showSuccess("Retailer Deleted Successfully");

            loadRetailers();

        }else{

            alert(result.message);

        }

    }catch(err){

        console.error(err);

        alert("Server Error");

    }

}

// ----------------------------
// LOGOUT
// ----------------------------

function logout(){

    if(confirm("Are you sure you want to Logout?")){

        localStorage.removeItem("adminLogin");
        localStorage.removeItem("adminName");

        window.location.href = "login.html";

    }

}

// ----------------------------
// BACKUP
// ----------------------------

function backupData(){

    alert("Backup Feature Coming Soon...");

}

// ----------------------------
// CHANGE PASSWORD
// ----------------------------

function changeAdminPassword(){

    const password =
    document.getElementById("newAdminPassword").value;

    if(password.length < 6){

        alert("Password must be at least 6 characters.");

        return;

    }

    alert("Password Change Feature Coming Soon.");

}

// ----------------------------
// AUTO REFRESH
// ----------------------------

setInterval(()=>{

    loadDashboard();

    loadApplications();

    loadRetailers();

},60000);
