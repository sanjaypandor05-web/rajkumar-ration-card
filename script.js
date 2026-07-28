// =====================================
// RAJKUMAR ONLINE SERVICES
// FINAL SCRIPT.JS
// PART 1
// =====================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz4dmeD7H-AMwhJYRn0CHGlkGnbXCy4bEstvR0INigrAzuqnVNjKQ5cL1VBFHqN4jJwTg/exec";





// SLIDER

let slideIndex = 0;


function showSlides(){


let slides = document.querySelectorAll(".slider img");


slides.forEach((img)=>{

img.style.display="none";

});



slideIndex++;


if(slideIndex > slides.length){

slideIndex = 1;

}



if(slides[slideIndex-1]){

slides[slideIndex-1].style.display="block";

}



setTimeout(showSlides,3000);



}



document.addEventListener("DOMContentLoaded",()=>{


showSlides();




const form =
document.getElementById("applicationForm");




if(form){



form.addEventListener("submit",async function(e){


e.preventDefault();




let aadhaar =
document.getElementById("aadhaarFile").files[0];



let ration =
document.getElementById("rationFile").files[0];



let payment =
document.getElementById("paymentFile").files[0];






// CHECK PDF


if(!aadhaar){


alert("Aadhaar PDF upload karo");

return;


}



if(aadhaar.type !== "application/pdf"){


alert("Aadhaar PDF file j hovi joie");

return;


}






if(ration && ration.type !== "application/pdf"){


alert("Ration Card PDF format ma upload karo");

return;


}







// PAYMENT CHECK


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




let data = {


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
await fileToBase64(aadhaar),


aadhaarName:
aadhaar.name,


aadhaarType:
aadhaar.type,


rationFile:
ration ? await fileToBase64(ration) : "",


rationName:
ration ? ration.name : "",


rationType:
ration ? ration.type : "",



paymentFile:
await fileToBase64(payment),


paymentName:
payment.name,


paymentType:
payment.type



};
  // SEND DATA TO GOOGLE SCRIPT


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


alert(
"Server Error : "+error
);


});



});



}





});








// FILE TO BASE64


function fileToBase64(file){


return new Promise((resolve)=>{


let reader = new FileReader();



reader.onload = function(){


let result = reader.result.split(",")[1];


resolve(result);


};



reader.readAsDataURL(file);



});



}







// CLOSE SUCCESS POPUP


function closePopup(){


document.getElementById("successPopup").style.display="none";


}


window.closePopup = closePopup;
