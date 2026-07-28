const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";


document.addEventListener("DOMContentLoaded",()=>{

const form = document.querySelector(".application-form");


if(!form) return;


form.addEventListener("submit", async(e)=>{

e.preventDefault();


const data={

name: form.querySelector('[name="name"]')?.value || "",

mobile: form.querySelector('[name="mobile"]')?.value || "",

service: form.querySelector('[name="service"]')?.value || "",

address: form.querySelector('[name="address"]')?.value || "",

district: form.querySelector('[name="district"]')?.value || "",

pincode: form.querySelector('[name="pincode"]')?.value || "",

email: form.querySelector('[name="email"]')?.value || ""

};



try{


const res = await fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

});


const result = await res.json();


if(result.success){

alert("Application Submit Successfully");

form.reset();

}else{

alert(result.error);

}


}catch(error){

alert("Error: "+error);

}



});


});
