// =====================================
// RAJKUMAR RATION CARD
// PAYMENT + DOCUMENT UPLOAD SYSTEM
// =====================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz8Y3peuiLYfLQIWsDZrbrW7II8-i0RgC2PXLbv0EaAY_JGIiTZNLuPa31poCCA4VObrQ/exec";


document.addEventListener("DOMContentLoaded",()=>{


const form=document.querySelector(".application-form");

const paymentFile=document.getElementById("paymentFile");

const service=document.getElementById("service");



if(service){

service.addEventListener("change",()=>{

let box=document.getElementById("paymentBox");

if(box){

box.style.display="block";

}

});

}



// Payment Screenshot Check

if(paymentFile){

paymentFile.addEventListener("change",()=>{


let file=paymentFile.files[0];


if(file){

if(file.type!="image/jpeg" && file.type!="image/png"){

alert("Payment Screenshot JPG/PNG format ma upload karo");

paymentFile.value="";

}

}


});

}



// FORM SUBMIT

if(form){


form.addEventListener("submit",async(e)=>{


e.preventDefault();



let aadhaar =
document.getElementById("aadhaarFile").files[0];


let ration =
document.getElementById("rationFile").files[0];


let payment =
document.getElementById("paymentFile").files[0];



// Aadhaar PDF Check

if(aadhaar){

if(aadhaar.type!="application/pdf"){

alert("Aadhaar PDF format ma upload karo");

return;

}

}



// Ration PDF Check

if(ration){

if(ration.type!="application/pdf"){

alert("Ration Card PDF format ma upload karo");

return;

}

}



// Payment Required

if(!payment){

alert("Payment Screenshot upload karo");

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



// FILES

aadhaarFile:
await convertFile(aadhaar),


rationFile:
await convertFile(ration),


paymentFile:
await convertFile(payment)



};




fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

})


.then(res=>res.json())


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


alert(error);


});



});

}


});






// FILE CONVERT FUNCTION


function convertFile(file){


return new Promise(resolve=>{


if(!file){

resolve(null);

return;

}



let reader=new FileReader();


reader.onload=()=>{


let base64 =
reader.result.split(",")[1];


resolve({

name:file.name,

type:file.type,

data:base64

});


};



reader.readAsDataURL(file);



});


}





function closePopup(){

document.getElementById("successPopup").style.display="none";


}


window.closePopup=closePopup;
