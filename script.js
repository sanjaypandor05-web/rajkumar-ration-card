const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";


document.addEventListener("DOMContentLoaded",()=>{


const form=document.querySelector(".application-form");


if(form){

form.addEventListener("submit",function(e){

e.preventDefault();


let data={

name:document.getElementById("name").value,

mobile:document.getElementById("mobile").value,

service:document.getElementById("service").value,

address:document.getElementById("address").value,

district:document.getElementById("district").value,

pincode:document.getElementById("pincode").value,

email:document.getElementById("email").value

};



fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

})

.then(res=>res.json())

.then(result=>{


if(result.success){

alert("Application Submit Successfully");

form.reset();

}

else{

alert(result.error);

}


})

.catch(error=>{

alert(error);

});


});


}


});
