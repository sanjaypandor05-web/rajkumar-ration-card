// ==========================================
// RAJKUMAR RATION CARD PORTAL
// LOGIN.JS - PART 1
// ==========================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxY-3pyd__jXe76CaK2IRf6aWgfVaim3TxeM0bnIF57P4yhPO4cEeSP8RqxK2IjO8PGRA/exec";

// ================= SHOW / HIDE PASSWORD =================

const passwordField =
document.getElementById("loginPassword");

const togglePassword =
document.getElementById("togglePassword");

togglePassword.addEventListener("click",()=>{

if(passwordField.type==="password"){

passwordField.type="text";

togglePassword.innerHTML=
'<i class="fa-solid fa-eye-slash"></i>';

}else{

passwordField.type="password";

togglePassword.innerHTML=
'<i class="fa-solid fa-eye"></i>';

}

});

// ================= LOGIN FORM =================

const loginForm =
document.getElementById("loginForm");

loginForm.addEventListener("submit",loginUser);

function loginUser(e){

e.preventDefault();

document.getElementById("loadingScreen").style.display="flex";

const data={

action:"login",

type:
document.getElementById("loginType").value,

userId:
document.getElementById("userId").value.trim(),

password:
document.getElementById("loginPassword").value.trim()

};

fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

})

.then(res=>res.json())

.then(handleLogin)

.catch(showServerError);

}

// ==========================================
// LOGIN.JS - PART 2
// LOGIN RESPONSE
// ==========================================

function handleLogin(result){

document.getElementById("loadingScreen").style.display="none";

if(result.success){

localStorage.setItem(
"userType",
result.userType
);

localStorage.setItem(
"userName",
result.name
);

localStorage.setItem(
"userId",
result.userId
);

document.getElementById(
"successPopup"
).style.display="flex";

setTimeout(()=>{

if(result.userType==="admin"){

window.location.href="admin.html";

}else{

window.location.href="retailer.html";

}

},1500);

}else{

document.getElementById(
"errorText"
).innerHTML=
result.message || "Invalid User ID or Password";

document.getElementById(
"errorPopup"
).style.display="flex";

}

}

// ==========================================
// SERVER ERROR
// ==========================================

function showServerError(error){

document.getElementById(
"loadingScreen"
).style.display="none";

document.getElementById(
"errorText"
).innerHTML=

"Server Error : "+error;

document.getElementById(
"errorPopup"
).style.display="flex";

console.error(error);

}

// ==========================================
// CLOSE ERROR POPUP
// ==========================================

function closeErrorPopup(){

document.getElementById(
"errorPopup"
).style.display="none";

}

// ==========================================
// LOGOUT FUNCTION
// ==========================================

function logout(){

localStorage.clear();

window.location.href="login.html";

}

// ==========================================
// LOGIN.JS - PART 3 (FINAL)
// SESSION CHECK
// ==========================================

// ---------- AUTO LOGIN ----------

window.addEventListener("load",()=>{

const userType =
localStorage.getItem("userType");

if(userType==="admin"){

window.location.href="admin.html";

}

if(userType==="retailer"){

window.location.href="retailer.html";

}

});

// ---------- ENTER KEY LOGIN ----------

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

const form =
document.getElementById("loginForm");

if(form){

form.requestSubmit();

}

}

});

// ---------- CLEAR FORM ----------

function clearLoginForm(){

document.getElementById("loginType").value="";

document.getElementById("userId").value="";

document.getElementById("loginPassword").value="";

}

// ---------- SUCCESS POPUP CLOSE ----------

function closeSuccessPopup(){

document.getElementById(
"successPopup"
).style.display="none";

}

// ---------- SESSION CHECK ----------

function isLoggedIn(){

return localStorage.getItem("userType")!==null;

}

// ---------- GET USER ----------

function getUser(){

return{

type:localStorage.getItem("userType"),

id:localStorage.getItem("userId"),

name:localStorage.getItem("userName")

};

}

console.log("Login System Ready");
