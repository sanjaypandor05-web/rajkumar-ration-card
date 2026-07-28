// =======================================
// RAJKUMAR ONLINE SERVICES
// FINAL SCRIPT.JS
// =======================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzIRYI0APQXVc-Opi2ySYH7n9_tWBVm8JeCFwGwGZvWSk6Zl6cM9kTpoDwQHGKAPoeNhg/exec";





document.addEventListener("DOMContentLoaded",()=>{



const form =
document.getElementById("applicationForm");



if(!form) return;





form.addEventListener("submit",async(e)=>{


e.preventDefault();




let aadhaar =
document.getElementById("aadhaarFile").files[0];

let ration =
document.getElementById("rationFile").files[0];

let payment =
document.getElementById("paymentFile").files[0];







// Aadhaar PDF check


if(!aadhaar){

alert("Aadhaar PDF upload karo");

return;

}



if(aadhaar.type !== "application/pdf"){

alert("Aadhaar PDF format ma hovu joie");

return;

}







// Ration PDF check


if(ration && ration.type !== "application/pdf"){

alert("Ration Card PDF format ma hovu joie");

return;

}







// Payment check


if(!payment){

alert("Payment Screenshot upload karo");

return;

}



if(
payment.type !== "image/jpeg" &&
payment.type !== "image/png"
){

alert("Payment Screenshot JPG/PNG hovu joie");

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
aadhaar.name,


aadhaarType:
aadhaar.type,





rationFile:
ration ? await convertFile(ration) : "",


rationName:
ration ? ration.name : "",


rationType:
ration ? ration.type : "",






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


alert("Error : "+error);


});




});



});









// FILE TO BASE64


function convertFile(file){


return new Promise((resolve)=>{


let reader=new FileReader();



reader.onload=()=>{


let base64 =
reader.result.split(",")[1];


resolve(base64);


};



reader.readAsDataURL(file);



});


}







// CLOSE POPUP


function closePopup(){


document.getElementById("successPopup").style.display="none";


}


window.closePopup=closePopup;
