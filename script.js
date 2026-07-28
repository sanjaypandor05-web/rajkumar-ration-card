// ================= GOOGLE APPS SCRIPT URL =================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";



// ================= PAGE LOAD =================

document.addEventListener("DOMContentLoaded", function(){



const form = document.querySelector(".application-form");


// ================= FORM SUBMIT =================

if(form){


form.addEventListener("submit", function(e){


e.preventDefault();



// SHOW LOADING

let loading = document.getElementById("loading");

if(loading){

loading.style.display="flex";

}



// COLLECT DATA

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
document.getElementById("details").value


};




// SEND DATA

fetch(SCRIPT_URL,{


method:"POST",

body:JSON.stringify(data)


})


.then(response=>response.json())


.then(result=>{



// HIDE LOADING

if(loading){

loading.style.display="none";

}



// SUCCESS

if(result.success){



let popup =
document.getElementById("successPopup");


if(popup){

popup.style.display="flex";

}



}



// ERROR

else{


alert(result.error);


}



})



.catch(error=>{


if(loading){

loading.style.display="none";

}


alert("Error : "+error);


});



});


}



});




// ================= CLOSE POPUP =================


function closePopup(){


let popup =
document.getElementById("successPopup");


if(popup){

popup.style.display="none";

}


// RESET FORM

let form =
document.querySelector(".application-form");


if(form){

form.reset();

}


// SCROLL TOP APPLY

document.getElementById("apply")
.scrollIntoView({
behavior:"smooth"
});


}


// MAKE FUNCTION GLOBAL

window.closePopup = closePopup;
