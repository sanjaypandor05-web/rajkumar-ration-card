const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";


document.addEventListener("DOMContentLoaded",()=>{


const form=document.querySelector(".application-form");


if(form){


form.addEventListener("submit",async function(e){


e.preventDefault();


const data={

name:document.getElementById("name").value,

mobile:document.getElementById("mobile").value,

service:document.getElementById("service").value,

address:document.getElementById("address").value,

district:document.getElementById("district").value,

pincode:document.getElementById("pincode").value,

email:document.getElementById("email").value

};



try{


let response = await fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

});


let result = await response.json();


if(result.success){

alert("Application Submit Successfully");

form.reset();

}

else{

alert(result.error);

}


}

catch(err){

alert("Server Error : "+err);

}



});


}


});
