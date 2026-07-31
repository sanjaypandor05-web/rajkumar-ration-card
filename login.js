 ==========================================
 LOGIN.JS
 RAJKUMAR RATION CARD PORTAL
 ==========================================

 ----------------------------
 GOOGLE APPS SCRIPT URL
 ----------------------------

const SCRIPT_URL =
httpsscript.google.commacrossAKfycbyFrg_3lB5WKelkE2vsRW4ZaK7PyvM5F93A-Jfzqla3y8gSQIKei_QZBet9VwewQIXgexec;

 ----------------------------
 TAB SWITCH
 ----------------------------

function showAdmin(){

document.getElementById(adminLogin).style.display=block;
document.getElementById(retailerLogin).style.display=none;

document.getElementById(adminTab).classList.add(active);
document.getElementById(retailerTab).classList.remove(active);

}

function showRetailer(){

document.getElementById(adminLogin).style.display=none;
document.getElementById(retailerLogin).style.display=block;

document.getElementById(retailerTab).classList.add(active);
document.getElementById(adminTab).classList.remove(active);

}

 ----------------------------
 ADMIN LOGIN
 ----------------------------

async function adminLogin(){

const username =
document.getElementById(adminUsername).value.trim();

const password =
document.getElementById(adminPassword).value.trim();

if(username===  password===){

alert(Enter Username & Password);

return;

}

try{

const response =
await fetch(

SCRIPT_URL +

action=adminLogin +

&username= + encodeURIComponent(username) +

&password= + encodeURIComponent(password)

);

const result =
await response.json();

if(result.success){

localStorage.setItem(adminLogin,true);

window.location.href=admin.html;

}else{

alert(result.message);

}

}catch(err){

console.log(err);

alert(Server Error);

}

}

 ----------------------------
 RETAILER LOGIN
 ----------------------------

async function retailerLogin(){

const id =
document.getElementById(retailerId).value.trim();

const password =
document.getElementById(retailerPassword).value.trim();

if(id===  password===){

alert(Enter Retailer ID & Password);

return;

}

try{

const response =
await fetch(

SCRIPT_URL +

action=retailerLogin +

&id= + encodeURIComponent(id) +

&password= + encodeURIComponent(password)

);

const result =
await response.json();

if(result.success){

localStorage.setItem(retailerId,result.retailerId);
localStorage.setItem(retailerName,result.retailerName);

window.location.href=retailer.html;

}else{

alert(result.message);

}

}catch(err){

console.log(err);

alert(Server Error);

}

}

 ----------------------------
 AUTO LOGIN
 ----------------------------

window.onload=()={

if(localStorage.getItem(adminLogin)==true){

window.location.href=admin.html;

}

if(localStorage.getItem(retailerId)){

window.location.href=retailer.html;

}

};