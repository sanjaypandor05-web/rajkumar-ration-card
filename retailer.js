// ==========================================
// RAJKUMAR RATION CARD PORTAL
// RETAILER.JS - PART 1
// ==========================================

// ---------- GOOGLE APPS SCRIPT URL ----------

const SCRIPT_URL =
"https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

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

function checkRetailerLogin(){

    const userType =
        localStorage.getItem("userType");

    if(userType !== "retailer"){

        alert("Access Denied!");

        window.location.href = "login.html";

    }

}

// ==========================================
// LOAD DASHBOARD
// ==========================================

function loadDashboard(){

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

    .catch(err => {

        console.error("Dashboard Error:", err);

    });

}

// ==========================================
// LOAD PROFILE
// ==========================================

function loadProfile(){

    document.getElementById("profileName").value =
        localStorage.getItem("userName") || "";

    document.getElementById("profileId").value =
        localStorage.getItem("userId") || "";

}
// ==========================================
// RETAILER.JS - PART 2
// NEW APPLICATION SUBMIT
// ==========================================

// ---------- APPLICATION FORM ----------

const applicationForm =
document.getElementById("applicationForm");

if(applicationForm){

applicationForm.addEventListener("submit",submitApplication);

}

function submitApplication(e){

e.preventDefault();

const retailerId =
localStorage.getItem("userId");

const data={

action:"submitApplication",

retailerId:retailerId,

name:document.getElementById("applicantName").value.trim(),

mobile:document.getElementById("mobileNumber").value.trim(),

aadhaar:document.getElementById("aadhaarNumber").value.trim(),

rationCard:document.getElementById("rationCardNumber").value.trim(),

service:document.getElementById("serviceType").value,

village:document.getElementById("village").value.trim(),

remarks:document.getElementById("remarks").value.trim()

};

fetch(SCRIPT_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

.then(res=>res.json())

.then(response=>{

if(response.success){

showSuccess(

response.message ||

"Application Submitted Successfully"

);

applicationForm.reset();

loadDashboard();

loadHistory();

}else{

showError(

response.message ||

"Application Submit Failed"

);

}

})

.catch(error=>{

console.error(error);

showError("Server Error");

});

}

// ==========================================
// DOCUMENT FILE NAME
// ==========================================

const documentInput =
document.getElementById("documents");

if(documentInput){

documentInput.addEventListener("change",()=>{

if(documentInput.files.length>0){

console.log(

"Selected Files :",

documentInput.files

);

}

});

}

// ==========================================
// SUCCESS POPUP
// ==========================================

function showSuccess(message){

document.getElementById("successMessage").innerHTML=
message;

document.getElementById("successPopup").style.display=
"flex";

}

function closePopup(){

document.getElementById("successPopup").style.display=
"none";

}

// ==========================================
// ERROR POPUP
// ==========================================

function showError(message){

document.getElementById("errorMessage").innerHTML=
message;

document.getElementById("errorPopup").style.display=
"flex";

}

function closeErrorPopup(){

document.getElementById("errorPopup").style.display=
"none";

}
// ==========================================
// RETAILER.JS - PART 3
// WORK HISTORY
// ==========================================

// ---------- LOAD HISTORY ----------

function loadHistory(){

const retailerId =
localStorage.getItem("userId");

fetch(

SCRIPT_URL +

"?action=getRetailerHistory&id=" +

encodeURIComponent(retailerId)

)

.then(res=>res.json())

.then(data=>{

applications=data || [];

renderHistory(applications);

})

.catch(error=>{

console.error(error);

showError("History Load Failed");

});

}

// ---------- RENDER HISTORY ----------

function renderHistory(data){

const tbody =
document.getElementById("historyTable");

tbody.innerHTML="";

if(data.length===0){

tbody.innerHTML=`

<tr>

<td colspan="7">

No Records Found

</td>

</tr>

`;

return;

}

data.forEach(app=>{

tbody.innerHTML+=`

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

<button
class="print-btn"
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

.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const result=applications.filter(app=>

String(app.name).toLowerCase().includes(value)||

String(app.mobile).includes(value)||

String(app.id).includes(value)

);

renderHistory(result);

});

// ---------- STATUS FILTER ----------

document.getElementById("historyStatus")

.addEventListener("change",function(){

const status=this.value;

if(status===""){

renderHistory(applications);

return;

}

const result=

applications.filter(app=>app.status===status);

renderHistory(result);

});

// ---------- VIEW APPLICATION ----------

function viewApplication(id){

currentApplication=

applications.find(app=>app.id==id);

if(!currentApplication){

showError("Application Not Found");

return;

}

document.getElementById("applicationDetails").innerHTML=`

<b>Application ID :</b> ${currentApplication.id}<br><br>

<b>Applicant :</b> ${currentApplication.name}<br><br>

<b>Mobile :</b> ${currentApplication.mobile}<br><br>

<b>Aadhaar :</b> ${currentApplication.aadhaar}<br><br>

<b>Ration Card :</b> ${currentApplication.rationCard}<br><br>

<b>Service :</b> ${currentApplication.service}<br><br>

<b>Status :</b> ${currentApplication.status}<br><br>

<b>Date :</b> ${currentApplication.date}<br><br>

<b>Remarks :</b> ${currentApplication.remarks || "-"}

`;

document.getElementById("viewModal").style.display="flex";

}

// ---------- CLOSE MODAL ----------

function closeViewModal(){

document.getElementById("viewModal").style.display="none";

}

// ---------- PRINT ----------

function printApplication(){

window.print();

}

// ---------- PDF DOWNLOAD ----------

function downloadApplicationPDF(){

if(!currentApplication){

showError("No Application Selected");

return;

}

alert(

"PDF Download feature will be connected in Code.gs."

);

}
// ==========================================
// RETAILER.JS - PART 4 (FINAL)
// PROFILE + PASSWORD + LOGOUT
// ==========================================

// ---------- CHANGE PASSWORD ----------

function changePassword(){

const oldPassword =
document.getElementById("oldPassword").value.trim();

const newPassword =
document.getElementById("newPassword").value.trim();

const confirmPassword =
document.getElementById("confirmPassword").value.trim();

if(oldPassword==="" || newPassword===""){

showError("Please Fill All Fields");

return;

}

if(newPassword!==confirmPassword){

showError("Confirm Password Not Match");

return;

}

fetch(SCRIPT_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"changeRetailerPassword",

retailerId:
localStorage.getItem("userId"),

oldPassword:oldPassword,

newPassword:newPassword

})

})

.then(res=>res.json())

.then(response=>{

if(response.success){

showSuccess(response.message);

document.getElementById("oldPassword").value="";
document.getElementById("newPassword").value="";
document.getElementById("confirmPassword").value="";

}else{

showError(response.message);

}

})

.catch(error=>{

console.error(error);

showError("Server Error");

});

}

// ---------- AUTO REFRESH DASHBOARD ----------

setInterval(()=>{

loadDashboard();

loadHistory();

},60000);

// ---------- LOGOUT ----------

function logout(){

if(confirm("Are you want to Logout?")){

localStorage.clear();

window.location.href="login.html";

}

}

// ---------- SESSION CHECK ----------

window.addEventListener("load",()=>{

const type=
localStorage.getItem("userType");

if(type!=="retailer"){

window.location.href="login.html";

}

});

// ---------- CLOSE MODAL ON OUTSIDE CLICK ----------

window.onclick=function(event){

const modal=document.getElementById("viewModal");

if(event.target===modal){

closeViewModal();

}

};

// ---------- READY ----------

console.log("Retailer Panel Ready");
