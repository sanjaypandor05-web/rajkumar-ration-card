const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";


document.addEventListener("DOMContentLoaded",()=>{


const form = document.querySelector(".application-form");


if(!form) return;


form.addEventListener("submit", async function(e){

e.preventDefault();


let data = {

gujaratiName: document.getElementById("gujaratiName").value,

englishName: document.getElementById("englishName").value,

mobile: document.getElementById("mobile").value,

village: document.getElementById("village").value,

taluka: document.getElementById("taluka").value,

district: document.getElementById("district").value,

address: document.getElementById("address").value,

pincode: document.getElementById("pincode").value,

email: document.getElementById("email").value,

service: document.getElementById("service").value,

details: document.getElementById("details").value

};



document.getElementById("loading").style.display="flex";


try{


let response = await fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

});


let result = await response.json();


document.getElementById("loading").style.display="none";


if(result.success){


document.getElementById("successPopup").style.display="flex";


form.reset();


}

else{


alert(result.error);


}


}

catch(error){


document.getElementById("loading").style.display="none";

alert("Submit Error : "+error);


}



});


});
