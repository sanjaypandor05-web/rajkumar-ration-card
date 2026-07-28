// =====================================
// RAJKUMAR RATION CARD
// PAYMENT + DOCUMENT UPLOAD SYSTEM
// =====================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";



document.addEventListener("DOMContentLoaded",()=>{


const form=document.querySelector(".application-form");

const service=document.getElementById("service");

const paymentFile=document.getElementById("paymentFile");

const submitBtn=document.getElementById("submitBtn");

const paymentBox=document.getElementById("paymentBox");




// SERVICE SELECT

if(service){

service.addEventListener("change",()=>{


if(service.value!=""){

if(paymentBox){

paymentBox.style.display="block";

}

}

});


}



// PAYMENT SCREENSHOT CHECK

if(paymentFile){


paymentFile.addEventListener("change",()=>{


let file=paymentFile.files[0];


if(!file) return;



let type=file.type;



if(
type!="image/jpeg" &&
type!="image/png"
){

alert("Payment Screenshot JPG/PNG format ma hovu joie");

paymentFile.value="";

return;

}



if(submitBtn){

submitBtn.disabled=false;

}



});


}





// SUBMIT


if(form){


form.addEventListener("submit",async(e)=>{


e.preventDefault();




// FILES


let aadhaar=
document.getElementById("aadhaarFile").files[0];


let ration=
document.getElementById("rationFile").files[0];


let payment=
document.getElementById("paymentFile").files[0];





// PDF CHECK


if(aadhaar && aadhaar.type!="application/pdf"){

alert("Aadhaar Card PDF format ma upload karo");

return;

}



if(ration && ration.type!="application/pdf"){

alert("Ration Card PDF format ma upload karo");

return;

}



if(!payment){

alert("Payment Screenshot upload karo");

return;

}




document.getElementById("loading").style.display="flex";





let data={



gujaratiName:
gujaratiName.value,


englishName:
englishName.value,


mobile:
mobile.value,


village:
village.value,


taluka:
taluka.value,


district:
district.value,


address:
address.value,


pincode:
pincode.value,


email:
email.value,


service:
service.value,


details:
details.value,




aadhaarFile:
await fileToBase64(aadhaar),


aadhaarName:
aadhaar ? aadhaar.name:"",


aadhaarType:
aadhaar ? aadhaar.type:"",





rationFile:
await fileToBase64(ration),


rationName:
ration ? ration.name:"",


rationType:
ration ? ration.type:"",





paymentFile:
await fileToBase64(payment),


paymentName:
payment.name,


paymentType:
payment.type


};






fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)


})

.then(r=>r.json())


.then(result=>{


document.getElementById("loading").style.display="none";



if(result.success){


document.getElementById("successPopup").style.display="flex";


form.reset();


if(submitBtn){

submitBtn.disabled=true;

}


}

else{


alert(result.error);

}



})


.catch(err=>{


document.getElementById("loading").style.display="none";

alert(err);


});




});



}



});






// FILE CONVERT


function fileToBase64(file){


return new Promise(resolve=>{


if(!file){

resolve("");

return;

}



let reader=new FileReader();


reader.onload=()=>resolve(reader.result);


reader.readAsDataURL(file);



});


}





// POPUP CLOSE


function closePopup(){


document.getElementById("successPopup").style.display="none";


}


window.closePopup=closePopup;
