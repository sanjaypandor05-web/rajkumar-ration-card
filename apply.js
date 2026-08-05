
// ===================================
// RAJKUMAR RATION CARD
// APPLY JS
// ===================================


// Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrnTNRCOJswqpFE-xCmmiGA869uWxcmlqEO6SjF3D5PQeboPOBwDVbqYTgYv-4N0AWEA/exec";





function sendApplication(){



let name = document.getElementById("name").value;

let mobile = document.getElementById("mobile").value;

let village = document.getElementById("village").value;

let service = document.getElementById("service").value;



let msg = document.getElementById("msg");





if(name=="" || mobile=="" || village=="" || service==""){


msg.innerHTML =
"❌ બધી માહિતી ફરજિયાત ભરો";


msg.style.color="red";


return;


}





let data = {


name:name,

mobile:mobile,

village:village,

service:service


};





fetch(SCRIPT_URL,{


method:"POST",

body:JSON.stringify(data)


})



.then(response=>response.json())



.then(result=>{


if(result.status=="success"){


msg.innerHTML =
"✅ અરજી સફળતાપૂર્વક મોકલાઈ<br>તમારી અરજી ID : "
+ result.id;


msg.style.color="green";



document.getElementById("name").value="";

document.getElementById("mobile").value="";

document.getElementById("village").value="";

document.getElementById("service").value="";


}



})



.catch(error=>{


msg.innerHTML =
"❌ Server Error";


msg.style.color="red";


});



}
