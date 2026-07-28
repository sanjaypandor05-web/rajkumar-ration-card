const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";


document.addEventListener("DOMContentLoaded", function(){

const form = document.querySelector(".application-form");

if(!form){
console.log("Form not found");
return;
}


form.addEventListener("submit", function(e){

e.preventDefault();


let data = {};

let fields = [
"name",
"mobile",
"service",
"address",
"district",
"pincode",
"email"
];


fields.forEach(function(id){

let element = document.getElementById(id);

if(element){
data[id] = element.value;
}
else{
data[id] = "";
console.log(id+" missing");
}

});


fetch(SCRIPT_URL,{
method:"POST",
body:JSON.stringify(data)
})

.then(res=>res.json())

.then(result=>{

console.log(result);

if(result.success){

alert("Application Submit Successfully");
form.reset();

}
else{

alert(result.error);

}

})

.catch(err=>{

alert(err);

});


});


});
