// ==========================================
// RETAILER.JS - PART 1
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

    checkRetailerLogin();

    loadProfile();

    loadDashboard();

    loadApplications();

});

// ----------------------------
// LOGIN CHECK
// ----------------------------

function checkRetailerLogin(){

    if(localStorage.getItem("retailerLogin") !== "true"){

        alert("Please Login First");

        window.location.href = "login.html";

        return;

    }

}

// ----------------------------
// LOAD PROFILE
// ----------------------------

function loadProfile(){

    const retailerId =
    localStorage.getItem("retailerId") || "";

    const retailerName =
    localStorage.getItem("retailerName") || "";

    const retailerMobile =
    localStorage.getItem("retailerMobile") || "";

    document.getElementById("retailerName").innerText =
    retailerName;

    document.getElementById("profileRetailerId").innerText =
    retailerId;

    document.getElementById("profileRetailerName").innerText =
    retailerName;

    document.getElementById("profileRetailerMobile").innerText =
    retailerMobile;

}

// ----------------------------
// LOAD DASHBOARD
// ----------------------------

async function loadDashboard(){

    try{

        const response = await fetch(
            SCRIPT_URL + "?action=dashboard"
        );

        const result = await response.json();

        if(!result.success) return;

        document.getElementById("totalApplications").innerText =
        result.total || 0;

        document.getElementById("pendingApplications").innerText =
        result.pending || 0;

        document.getElementById("approvedApplications").innerText =
        result.approved || 0;

        document.getElementById("rejectedApplications").innerText =
        result.rejected || 0;

    }catch(err){

        console.error(err);

    }
  // ==========================================
// RETAILER.JS - PART 2
// LOAD APPLICATIONS + SEARCH + VIEW
// ==========================================

// ----------------------------
// LOAD APPLICATIONS
// ----------------------------

async function loadApplications(){

    const tbody =
    document.getElementById("applicationTable");

    if(!tbody) return;

    tbody.innerHTML =
    "<tr><td colspan='7'>Loading...</td></tr>";

    try{

        const response =
        await fetch(SCRIPT_URL + "?action=history");

        const result =
        await response.json();

        if(!result.success){

            tbody.innerHTML =
            "<tr><td colspan='7'>No Data Found</td></tr>";

            return;

        }

        tbody.innerHTML = "";

        result.data.forEach(app=>{

            tbody.innerHTML += `

            <tr>

                <td>${app.applicationId}</td>

                <td>${app.englishName}</td>

                <td>${app.mobile}</td>

                <td>${app.service}</td>

                <td>${app.status}</td>

                <td>${app.date}</td>

                <td>

                    <button onclick="viewApplication('${app.applicationId}')">

                    View

                    </button>

                </td>

            </tr>

            `;

        });

    }catch(err){

        console.error(err);

        tbody.innerHTML =
        "<tr><td colspan='7'>Server Error</td></tr>";

    }

}

// ----------------------------
// SEARCH APPLICATION
// ----------------------------

function searchApplication(){

    const text =
    document.getElementById("searchText")
    .value
    .trim()
    .toLowerCase();

    const rows =
    document.querySelectorAll("#applicationTable tr");

    rows.forEach(row=>{

        const data =
        row.innerText.toLowerCase();

        if(data.indexOf(text)>-1){

            row.style.display="";

        }else{

            row.style.display="none";

        }

    });

}

// ----------------------------
// VIEW APPLICATION
// ----------------------------

async function viewApplication(id){

    try{

        const response =
        await fetch(

            SCRIPT_URL +
            "?action=searchId&id=" +
            encodeURIComponent(id)

        );

        const result =
        await response.json();

        if(result.success){

            const app = result.data;

            alert(

                "Application ID : " + app.applicationId +

                "\n\nName : " + app.englishName +

                "\nMobile : " + app.mobile +

                "\nService : " + app.service +

                "\nStatus : " + app.status +

                "\nDate : " + app.date

            );

        }else{

            alert("Application Not Found");

        }

    }catch(err){

        console.error(err);

        alert("Server Error");

    }

}
  // ==========================================
// RETAILER.JS - PART 3
// FILTER + POPUPS
// ==========================================

// ----------------------------
// FILTER BY STATUS
// ----------------------------

function filterStatus(){

    const status =
    document.getElementById("statusFilter").value.toLowerCase();

    const rows =
    document.querySelectorAll("#applicationTable tr");

    rows.forEach(row=>{

        if(status===""){

            row.style.display="";

            return;

        }

        const text =
        row.innerText.toLowerCase();

        row.style.display =
        text.includes(status) ? "" : "none";

    });

}

// ----------------------------
// FILTER BY DATE
// ----------------------------

function filterDate(){

    const date =
    document.getElementById("dateFilter").value;

    const rows =
    document.querySelectorAll("#applicationTable tr");

    rows.forEach(row=>{

        if(date===""){

            row.style.display="";

            return;

        }

        row.style.display =
        row.innerText.includes(date)
        ? ""
        : "none";

    });

}

// ----------------------------
// SUCCESS POPUP
// ----------------------------

function showSuccess(message){

    document.getElementById("successMessage").innerText =
    message;

    document.getElementById("successPopup").style.display =
    "flex";

}

function closePopup(){

    document.getElementById("successPopup").style.display =
    "none";

}

// ----------------------------
// DELETE POPUP
// ----------------------------

function openDeletePopup(){

    document.getElementById("deletePopup").style.display =
    "flex";

}

function closeDeletePopup(){

    document.getElementById("deletePopup").style.display =
    "none";

}
  // ==========================================
// RETAILER.JS - PART 4 (FINAL)
// LOGOUT + PASSWORD + AUTO REFRESH
// ==========================================

// ----------------------------
// LOGOUT
// ----------------------------

function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("retailerLogin");
        localStorage.removeItem("retailerId");
        localStorage.removeItem("retailerName");
        localStorage.removeItem("retailerMobile");

        window.location.href = "login.html";

    }

}

// ----------------------------
// CHANGE PASSWORD
// ----------------------------

function changePassword(){

    const newPassword = prompt("Enter New Password");

    if(!newPassword) return;

    const retailerId =
    localStorage.getItem("retailerId");

    fetch(

        SCRIPT_URL +
        "?action=changeRetailerPassword" +
        "&id=" + encodeURIComponent(retailerId) +
        "&password=" + encodeURIComponent(newPassword)

    )

    .then(response => response.json())

    .then(result=>{

        if(result.success){

            showSuccess("Password Changed Successfully");

        }else{

            alert(result.message);

        }

    })

    .catch(error=>{

        console.error(error);

        alert("Server Error");

    });

}

// ----------------------------
// REFRESH
// ----------------------------

function refreshDashboard(){

    loadDashboard();
    loadApplications();

}

// ----------------------------
// AUTO REFRESH
// ----------------------------

setInterval(()=>{

    refreshDashboard();

},60000);

// ----------------------------
// PAGE LOAD
// ----------------------------

document.addEventListener("DOMContentLoaded",()=>{

    checkRetailerLogin();

    loadProfile();

    loadDashboard();

    loadApplications();

});

}
