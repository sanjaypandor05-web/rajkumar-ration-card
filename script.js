// =======================================
// RAJKUMAR RATION CARD
// PAYMENT + DOCUMENT UPLOAD
// SCRIPT.JS
// =======================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz8Y3peuiLYfLQIWsDZrbrW7II8-i0RgC2PXLbv0EaAY_JGIiTZNLuPa31poCCA4VObrQ/exec";



document.addEventListener("DOMContentLoaded",()=>{


const form=document.querySelector(".application-form");

const paymentFile=document.getElementById("paymentFile");

const submitBtn=document.getElementById("submitBtn");




// SUBMIT BUTTON START


form.addEventListener("submit",async function(e){


e.preventDefault();



let aadhaar =
document.getElementById("aadhaarFile").files[0];


let ration =
document.getElementById("rationFile").files[0];


let payment =
document.getElementById("paymentFile").files[0];





// Aadhaar PDF Check

if(aadhaar && aadhaar.type !== "application/pdf"){

alert("Aadhaar Card PDF format ma upload karo");

return;

}




// Ration PDF Check

if(ration && ration.type !== "application/pdf"){

alert("Ration Card PDF format ma upload karo");

return;

}




// Payment Check

if(!payment){

alert("Payment Screenshot upload karo");

return;

}





if(
payment.type !== "image/jpeg" &&
payment.type !== "image/png"
){

alert("Payment Screenshot JPG/PNG format ma hovu joie");

return;

}




document.getElementById("loading").style.display="flex";





let data={



gujaratiName:
document.getElementById("gujaratiName").value,


englishName:
document.getElementById("englishName").value,


mobile:
document.getElementById("mobile").value,


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
document.getElementById("service").value,


details:
document.getElementById("details").value,





aadhaarFile:
await convertFile(aadhaar),


aadhaarName:
aadhaar ? aadhaar.name:"",


aadhaarType:
aadhaar ? aadhaar.type:"",




rationFile:
await convertFile(ration),


rationName:
ration ? ration.name:"",


rationType:
ration ? ration.type:"",





paymentFile:
await convertFile(payment),


paymentName:
payment.name,


paymentType:
payment.type



};






fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

})



.then(response=>response.json())



.then(result=>{


document.getElementById("loading").style.display="none";



if(result.success){


document.getElementById("successPopup").style.display="flex";


form.reset();


}

else{


alert(result.error);


}


})



.catch(error=>{


document.getElementById("loading").style.display="none";


alert("Submit Error : "+error);


});



});



});







// FILE TO BASE64


function convertFile(file){


return new Promise(resolve=>{


if(!file){

resolve("");

return;

}


let reader=new FileReader();



reader.onload=()=>{


let base64 =
reader.result.split(",")[1];


resolve(base64);


};



reader.readAsDataURL(file);



});


}






// POPUP CLOSE


function closePopup(){


document.getElementById("successPopup").style.display="none";


}


window.closePopup=closePopup;
