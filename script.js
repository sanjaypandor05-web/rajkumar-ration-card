// =====================================
// RAJKUMAR RATION CARD ONLINE WORK V5
// =====================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqF-PjpgCbWYZTwwDXgSiD-bjZLqvYg4Y1w-a0W2ajtAnvFLh0xTon6CqSsubtDAkQiw/exec";


document.addEventListener("DOMContentLoaded", () => {

const form = document.querySelector(".application-form");
const service = document.getElementById("service");
const amount = document.getElementById("amount");
const loading = document.getElementById("loading");
const successPopup = document.getElementById("successPopup");


const priceList = {

"New Ration Card":100,
"Name Add":100,
"Name Remove":100,
"Correction":200,
"Address Change":250,
"Father Name Update":350

};


// Change Amount

if(service){

service.addEventListener("change",()=>{

let price = priceList[service.value] || 0;

if(amount)
amount.innerHTML="₹"+price;

});

}



// Mobile Validation

function validateMobile(num){

return /^[6-9][0-9]{9}$/.test(num);

}



// Loading

function showLoading(){

if(loading)
loading.style.display="flex";

}


function hideLoading(){

if(loading)
loading.style.display="none";

}



// Popup

window.closePopup=function(){

if(successPopup)
successPopup.style.display="none";

}



function showSuccess(){

if(successPopup)
successPopup.style.display="flex";

}



// Submit


if(form){

form.addEventListener("submit",async(e)=>{


e.preventDefault();



let mobile=document.getElementById("mobile").value.trim();



if(!validateMobile(mobile)){

alert("Enter Valid Mobile Number");

return;

}



showLoading();



let data={


gujaratiName:
document.getElementById("gujaratiName").value,


englishName:
document.getElementById("englishName").value,


mobile:mobile,


village:
document.getElementById("village").value,


taluka:
document.getElementById("taluka").value,


district:
document.getElementById("district").value,


address:
document.getElementById("address").value,


pincode:
document.getElementById("pincode").value,


email:
document.getElementById("email").value,


service:
service.value,


amount:
priceList[service.value] || 0,


details:
document.getElementById("details").value,


date:
new Date().toLocaleString()

};



try{


let response = await fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

});



let text = await response.text();


console.log(text);



let result=JSON.parse(text);



hideLoading();



if(result.success){


showSuccess();


form.reset();


if(amount)
amount.innerHTML="₹0";


}

else{


alert(result.error || "Submit Failed");


}



}

catch(error){


hideLoading();


console.log(error);


alert(
"Server Error\n\nPlease try again"
);


}



});


}



});
