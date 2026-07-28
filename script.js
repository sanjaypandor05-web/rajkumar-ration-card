const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPzeal1vevXUO1zCFSGNJg3TUvS1YQwB9ZM7kGD9GFkQmW-LrevGgw3Pa_g9Sj8eM3pA/exec";


document.addEventListener("DOMContentLoaded", function(){


const form = document.querySelector(".application-form");


if(form){


form.addEventListener("submit", async function(e){


e.preventDefault();



let loading = document.getElementById("loading");

if(loading){
loading.style.display="flex";
}



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



try{


let response = await fetch(SCRIPT_URL,{

method:"POST",

mode:"cors",

headers:{
"Content-Type":"text/plain;charset=utf-8"
},

body:JSON.stringify(data)

});



let text = await response.text();


console.log(text);



let result = JSON.parse(text);



if(result.success){


if(loading){
loading.style.display="none";
}



document.getElementById("successPopup").style.display="flex";


form.reset();


}

else{


alert(result.error);


}



}

catch(error){


if(loading){
loading.style.display="none";
}


alert("Submit Error : "+error);


}



});


}


});



// CLOSE POPUP

function closePopup(){


document.getElementById("successPopup").style.display="none";


}
function closePopup(){

    let popup = document.getElementById("successPopup");

    if(popup){
        popup.style.display = "none";
    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


window.closePopup = closePopup;


window.closePopup = closePopup;
