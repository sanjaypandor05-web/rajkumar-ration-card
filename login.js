// =====================================
// RAJKUMAR RATION CARD PORTAL
// LOGIN JS
// =====================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby1cAsNRzfvrSLqZrukmEjqIKbCCkOHaShKzmuvVvyVlipSRmaRw8KTefkdKSQgsJkPJg/exec";



function adminLogin(){


let username =
document.getElementById("username").value.trim();


let password =
document.getElementById("password").value.trim();



if(username=="" || password==""){

alert("Username અને Password નાખો");

return;

}



fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify({

action:"adminLogin",

username:username,

password:password

})

})

.then(res=>res.json())


.then(data=>{


if(data.status=="success"){


localStorage.setItem(
"adminLogin",
"true"
);


localStorage.setItem(
"adminName",
data.name
);


window.location.href="admin.html";


}

else{


document.getElementById("msg").innerHTML =
data.message;


}


})


.catch(err=>{


console.log(err);

document.getElementById("msg").innerHTML =
"Server Error";


});


}
