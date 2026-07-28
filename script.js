// =====================================
// RAJKUMAR RATION CARD WEBSITE SCRIPT
// FORM + GOOGLE SHEET + DRIVE UPLOAD
// =====================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";



// FILE TO BASE64 FUNCTION

function convertFile(file){

return new Promise((resolve,reject)=>{


if(!file){

resolve("");

return;

}


let reader = new FileReader();


reader.onload = function(){

resolve(reader.result);

};


reader.onerror = reject;


reader.readAsDataURL(file);



});


}





document.addEventListener("DOMContentLoaded",()=>{



const form = document.querySelector(".application-form");



if(form){



form.addEventListener("submit",async function(e){


e.preventDefault();



// LOADING

let loading=document.getElementById("loading");

if(loading){

loading.style.display="block";

}





// GET FILES


let aadhaar = document.getElementById("aadhaarFile").files[0];

let ration = document.getElementById("rationFile").files[0];

let payment = document.getElementById("paymentFile").files[0];





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
aadhaar ? aadhaar.name : "",


aadhaarType:
aadhaar ? aadhaar.type : "",





rationFile:
await convertFile(ration),


rationName:
ration ? ration.name : "",


rationType:
ration ? ration.type : "",





paymentFile:
await convertFile(payment),


paymentName:
payment ? payment.name : "",


paymentType:
payment ? payment.type : ""



};






fetch(SCRIPT_URL,{


method:"POST",


body:JSON.stringify(data)



})


.then(response=>response.json())


.then(result=>{



if(loading){

loading.style.display="none";

}




if(result.success){



document.getElementById("successPopup").style.display="flex";


form.reset();



}

else{


alert(result.error);


}



})


.catch(error=>{


if(loading){

loading.style.display="none";

}


alert("Submit Error : "+error);



});



});



}





});





// CLOSE POPUP


function closePopup(){


let popup=document.getElementById("successPopup");


if(popup){

popup.style.display="none";


}


}
