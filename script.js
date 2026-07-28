// =======================================
// RAJKUMAR ONLINE SERVICES
// FINAL SCRIPT.JS
// =======================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzIRYI0APQXVc-Opi2ySYH7n9_tWBVm8JeCFwGwGZvWSk6Zl6cM9kTpoDwQHGKAPoeNhg/exec";





document.addEventListener("DOMContentLoaded",()=>{



const form =
document.getElementById("applicationForm");




form.addEventListener("submit",async function(e){


e.preventDefault();




let aadhaar =
document.getElementById("aadhaarFile").files[0];



let ration =
document.getElementById("rationFile").files[0];



let payment =
document.getElementById("paymentFile").files[0];







// PDF CHECK


if(!aadhaar){

alert("Aadhaar PDF upload karo");

return;

}


if(aadhaar.type !== "application/pdf"){

alert("Aadhaar PDF format ma hovu joie");

return;

}






if(ration && ration.type !== "application/pdf"){


alert("Ration Card PDF format ma hovu joie");


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







document.getElementById("loading").style.display="block";







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
await fileConvert(aadhaar),


aadhaarName:
aadhaar.name,


aadhaarType:
aadhaar.type,







rationFile:
ration ? await fileConvert(ration) : "",


rationName:
ration ? ration.name : "",


rationType:
ration ? ration.type : "",






paymentFile:
await fileConvert(payment),


paymentName:
payment.name,


paymentType:
payment.type



};








fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

})



.then(res=>res.json())



.then(result=>{



document.getElementById("loading").style.display="none";





if(result.success){


document.getElementById("successPopup").style.display="block";


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




});









// FILE CONVERT


function fileConvert(file){


return new Promise(resolve=>{


let reader = new FileReader();



reader.onload=function(){


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


window.closePopup = closePopup;
