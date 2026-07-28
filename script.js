const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";


document.addEventListener("DOMContentLoaded",()=>{


const form=document.querySelector(".application-form");


if(form){


form.addEventListener("submit",async function(e){

e.preventDefault();


document.getElementById("loading").style.display="flex";



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



// FILE UPLOAD

aadhaarFile:
await getFile("aadhaarFile"),


rationFile:
await getFile("rationFile"),


paymentFile:
await getFile("paymentFile")



};



fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

})


.then(res=>res.json())


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

alert("Submit Error : "+error);


});



});


}



});





// GET FILE FUNCTION


async function getFile(id){


let input=document.getElementById(id);


if(!input || !input.files[0]){

return null;

}


let file=input.files[0];


let base64=await fileToBase64(file);



return {


name:file.name,

type:file.type,

data:base64.split(",")[1]


};


}




function fileToBase64(file){


return new Promise((resolve)=>{


let reader=new FileReader();


reader.onload=()=>{

resolve(reader.result);

};


reader.readAsDataURL(file);


});


}





// POPUP CLOSE


function closePopup(){


let popup=document.getElementById("successPopup");


if(popup){

popup.style.display="none";

}


window.scrollTo({

top:0,

behavior:"smooth"

});


}


window.closePopup=closePopup;
