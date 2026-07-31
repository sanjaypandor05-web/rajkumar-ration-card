// ==========================================
// RETAILER.JS - PART 1
// RAJKUMAR RATION CARD PORTAL
// ==========================================

// ----------------------------
// GOOGLE APPS SCRIPT URL
// ----------------------------

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyFrg_3lB5WKelkE2vsRW4ZaK7PyvM5F93A-Jfzqla3y8gSQIKei_QZBet9VwewQIXg/exec";

// ----------------------------
// PAGE LOAD
// ----------------------------

document.addEventListener("DOMContentLoaded",()=>{

checkRetailerLogin();

loadDashboard();

loadApplications();

loadProfile();

});

// ----------------------------
// LOGIN CHECK
// ----------------------------

function checkRetailerLogin(){

const retailerId =
localStorage.getItem("retailerId");

if(!retailerId){

alert("Please Login First");

window.location.href="index.html";

}

}

// ----------------------------
// LOAD DASHBOARD
// ----------------------------

async function loadDashboard(){

try{

const response =
await fetch(SCRIPT_URL+"?action=dashboard");

const result =
await response.json();

if(result.success){

document.getElementById("totalApplications").innerText=result.total;
document.getElementById("pendingApplications").innerText=result.pending;
document.getElementById("approvedApplications").innerText=result.approved;
document.getElementById("rejectedApplications").innerText=result.rejected;

}

}catch(err){

console.log(err);

}

}

// ----------------------------
// LOAD APPLICATIONS
// ----------------------------

async function loadApplications(){

const tbody =
document.getElementById("applicationTable");

tbody.innerHTML =
"<tr><td colspan='7'>Loading...</td></tr>";

try{

const response =
await fetch(SCRIPT_URL+"?action=history");

const result =
await response.json();

tbody.innerHTML="";

const retailer =
localStorage.getItem("retailerId");

result.data.forEach(app=>{

if(app.retailer==retailer){

tbody.innerHTML +=`

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

<button onclick="changeStatus('${app.applicationId}')">

Status

</button>

</td>

</tr>

`;

}

});

}catch(err){

console.log(err);

}

}

// ----------------------------
// LOAD PROFILE
// ----------------------------

function loadProfile(){

document.getElementById("retailerId").value =
localStorage.getItem("retailerId") || "";

document.getElementById("retailerName").value =
localStorage.getItem("retailerName") || "";

document.getElementById("retailerMobile").value =
localStorage.getItem("retailerMobile") || "";

}
// ==========================================
// RETAILER.JS - PART 2
// SEARCH + VIEW + STATUS
// ==========================================

// ----------------------------
// SEARCH APPLICATION
// ----------------------------

function searchApplication(){

const text =
document.getElementById("searchText").value
.toLowerCase()
.trim();

const rows =
document.querySelectorAll("#applicationTable tr");

rows.forEach(row=>{

const value =
row.innerText.toLowerCase();

row.style.display =
value.includes(text) ? "" : "none";

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

const app=result.data;

alert(

"Application ID : " + app.applicationId +

"\n\nName : " + app.englishName +

"\nMobile : " + app.mobile +

"\nService : " + app.service +

"\nStatus : " + app.status +

"\nVillage : " + app.village +

"\nTaluka : " + app.taluka +

"\nDistrict : " + app.district

);

}else{

alert("Application Not Found");

}

}catch(err){

console.log(err);

alert("Server Error");

}

}

// ----------------------------
// CHANGE STATUS
// ----------------------------

async function changeStatus(id){

const status =
prompt(

"Enter Status\n\nPending\nApproved\nRejected"

);

if(!status) return;

try{

const response =
await fetch(

SCRIPT_URL +

"?action=updateStatus" +

"&id=" + encodeURIComponent(id) +

"&status=" + encodeURIComponent(status)

);

const result =
await response.json();

if(result.success){

showSuccess("Status Updated");

loadDashboard();

loadApplications();

}else{

alert(result.message);

}

}catch(err){

console.log(err);

alert("Server Error");

}

}

// ----------------------------
// SUCCESS POPUP
// ----------------------------

function showSuccess(message){

const popup =
document.getElementById("successPopup");

const text =
document.getElementById("successMessage");

text.innerText=message;

popup.style.display="flex";

}

function closePopup(){

document.getElementById("successPopup").style.display="none";

}
// ==========================================
// RETAILER.JS - PART 3
// PROFILE + PASSWORD + LOGOUT
// ==========================================

// ----------------------------
// CHANGE PASSWORD
// ----------------------------

async function changePassword(){

const retailerId =
localStorage.getItem("retailerId");

const newPassword =
document.getElementById("newPassword").value.trim();

if(newPassword===""){

alert("Enter New Password");

return;

}

try{

const response =
await fetch(

SCRIPT_URL +

"?action=changeRetailerPassword" +

"&id=" + encodeURIComponent(retailerId) +

"&password=" + encodeURIComponent(newPassword)

);

const result =
await response.json();

if(result.success){

showSuccess("Password Changed Successfully");

document.getElementById("newPassword").value="";

}else{

alert(result.message);

}

}catch(err){

console.log(err);

alert("Server Error");

}

}

// ----------------------------
// LOGOUT
// ----------------------------

function logout(){

if(confirm("Are you sure you want to Logout?")){

localStorage.removeItem("retailerId");
localStorage.removeItem("retailerName");
localStorage.removeItem("retailerMobile");

window.location.href="index.html";

}

}

// ----------------------------
// REFRESH DASHBOARD
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
// WINDOW LOAD
// ----------------------------

window.onload=()=>{

checkRetailerLogin();

loadDashboard();

loadApplications();

loadProfile();

};

// ----------------------------
// LOADING FUNCTIONS
// ----------------------------

function showLoading(){

const loading =
document.getElementById("loading");

if(loading){

loading.style.display="flex";

}

}

function hideLoading(){

const loading =
document.getElementById("loading");

if(loading){

loading.style.display="none";

}

}