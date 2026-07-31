// ==========================================
// ADMIN.JS - PART 1
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

document.addEventListener("DOMContentLoaded", () => {

checkAdminLogin();

loadDashboard();

loadApplications();

});

// ----------------------------
// ADMIN LOGIN CHECK
// ----------------------------

function checkAdminLogin() {

if (localStorage.getItem("adminLogin") !== "true") {

alert("Please Login First");

window.location.href = "index.html";

}

}

// ----------------------------
// LOAD DASHBOARD
// ----------------------------

async function loadDashboard() {

try {

const response = await fetch(
SCRIPT_URL + "?action=dashboard"
);

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
"<tr><td colspan='8'>No Data</td></tr>";

return;

}

tbody.innerHTML = "";

result.data.forEach(app => {

tbody.innerHTML += `

<tr>

<td>${app.applicationId}</td>

<td>${app.englishName}</td>

<td>${app.mobile}</td>

<td>${app.service}</td>

<td>${app.status}</td>

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

}

// ----------------------------
// REFRESH DASHBOARD
// ----------------------------

function refreshDashboard() {

loadDashboard();

loadApplications();

}

// ----------------------------
// VIEW APPLICATION
// ----------------------------

function viewApplication(id) {

alert("Application ID : " + id);

// Part 2 me details popup add karenge.

}
// ==========================================
// ADMIN.JS - PART 2
// SEARCH + STATUS + DELETE
// ==========================================

// ----------------------------
// SEARCH APPLICATION
// ----------------------------

function searchApplication() {

const text =
document.getElementById("searchText").value
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
// CHANGE STATUS
// ----------------------------

async function changeStatus(id) {

const status = prompt(

"Enter Status\n\nPending\nApproved\nRejected"

);

if (!status) return;

try {

const response = await fetch(

SCRIPT_URL +
"?action=updateStatus&id=" +
encodeURIComponent(id) +
"&status=" +
encodeURIComponent(status)

);

const result = await response.json();

if (result.success) {

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

// ----------------------------
// DELETE APPLICATION
// ----------------------------

let deleteApplicationId = "";

function deleteApplication(id) {

deleteApplicationId = id;

const popup =
document.getElementById("deletePopup");

if (popup) {

popup.style.display = "flex";

}

}

// ----------------------------
// CONFIRM DELETE
// ----------------------------

document.addEventListener("DOMContentLoaded",()=>{

const btn =
document.getElementById("confirmDeleteBtn");

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

showSuccess("Application Deleted");

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
// CLOSE DELETE POPUP
// ----------------------------

function closeDeletePopup(){

const popup =
document.getElementById("deletePopup");

if(popup){

popup.style.display="none";

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

if(text){

text.innerText=message;

}

if(popup){

popup.style.display="flex";

}

}

function closePopup(){

const popup =
document.getElementById("successPopup");

if(popup){

popup.style.display="none";

}

}

// ----------------------------
// APPLICATION DETAILS
// ----------------------------

async function viewApplication(id){

try{

const response = await fetch(

SCRIPT_URL +
"?action=searchId&id=" +
encodeURIComponent(id)

);

const result = await response.json();

if(result.success){

const app=result.data;

alert(

"Application ID : " + app.applicationId +

"\n\nName : " + app.englishName +

"\nMobile : " + app.mobile +

"\nService : " + app.service +

"\nStatus : " + app.status

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
// ADMIN.JS - PART 3
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

document.getElementById("retailerName").value="";
document.getElementById("retailerMobile").value="";
document.getElementById("retailerId").value="";
document.getElementById("retailerPassword").value="";

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

try{

const response =
await fetch(SCRIPT_URL + "?action=retailers");

const result =
await response.json();

table.innerHTML="";

if(!result.success){

table.innerHTML=
"<tr><td colspan='5'>No Retailers Found</td></tr>";

return;

}

result.data.forEach(retailer=>{

table.innerHTML += `

<tr>

<td>${retailer.id}</td>

<td>${retailer.name}</td>

<td>${retailer.mobile}</td>

<td>${retailer.status}</td>

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

if(!confirm("Delete Retailer?")) return;

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

showSuccess("Retailer Deleted");

loadRetailers();

}else{

alert(result.message);

}

}catch(err){

console.error(err);

}

}

// ----------------------------
// LOGOUT
// ----------------------------

function logout(){

localStorage.removeItem("adminLogin");

window.location.href="index.html";

}

// ----------------------------
// BACKUP
// ----------------------------

function backupData(){

alert("Backup Feature Coming Soon");

}

// ----------------------------
// CHANGE PASSWORD
// ----------------------------

function changeAdminPassword(){

alert("Password Change Feature Coming Soon");

}

// ----------------------------
// AUTO REFRESH
// ----------------------------

setInterval(()=>{

loadDashboard();

loadApplications();

loadRetailers();

},60000);

// ----------------------------
// PAGE LOAD
// ----------------------------

document.addEventListener("DOMContentLoaded",()=>{

loadRetailers();

});