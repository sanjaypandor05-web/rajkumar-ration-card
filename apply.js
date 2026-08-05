// ===================================
// RAJKUMAR RATION CARD PORTAL
// FINAL APPLY JS
// ===================================


// Google Apps Script URL

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzrnTNRCOJswqpFE-xCmmiGA869uWxcmlqEO6SjF3D5PQeboPOBwDVbqYTgYv-4N0AWEA/exec";





// ================= FILE TO BASE64 =================


function fileToBase64(file){


return new Promise((resolve,reject)=>{


const reader = new FileReader();


reader.onload = ()=>{


let result = reader.result.split(",");



resolve({


name:file.name,


mimeType:file.type,


data:result[1]


});


};



reader.onerror = reject;


reader.readAsDataURL(file);



});


}






// ================= SEND APPLICATION =================



async function sendApplication(){



let msg =
document.getElementById("msg");



let name =
document.getElementById("name").value.trim();



let mobile =
document.getElementById("mobile").value.trim();



let village =
document.getElementById("village").value.trim();



let service =
document.getElementById("service").value;





let aadhaar =
document.getElementById("aadhaar").files[0];



let ration =
document.getElementById("ration").files[0];



let payment =
document.getElementById("payment").files[0];







// VALIDATION


if(
name=="" ||
mobile=="" ||
village=="" ||
service==""
){


msg.innerHTML =
"❌ બધી માહિતી ફરજિયાત ભરો";


msg.style.color="red";


return;


}






msg.innerHTML =
"⏳ અરજી મોકલાઈ રહી છે...";

msg.style.color="blue";





try{



let data = {

name:name,

mobile:mobile,

village:village,

service:service

};





// FILE UPLOAD CONVERT



if(aadhaar){

data.aadhaar =
await fileToBase64(aadhaar);

}



if(ration){

data.ration =
await fileToBase64(ration);

}



if(payment){

data.payment =
await fileToBase64(payment);

}








// SEND TO APPS SCRIPT



fetch(SCRIPT_URL,{


method:"POST",


body:JSON.stringify(data)


})



.then(res=>res.json())



.then(result=>{



if(result.status=="success"){



msg.innerHTML =

"✅ અરજી સફળતાપૂર્વક મોકલાઈ<br><br>"+
"તમારી અરજી નંબર : <b>"+
result.id+
"</b><br><br>"+
"Status : Pending";



msg.style.color="green";





// CLEAR FORM


document.getElementById("name").value="";

document.getElementById("mobile").value="";

document.getElementById("village").value="";

document.getElementById("service").value="";

document.getElementById("aadhaar").value="";

document.getElementById("ration").value="";

document.getElementById("payment").value="";



}



else{


msg.innerHTML =
"❌ અરજી મોકલવામાં સમસ્યા";


msg.style.color="red";


}



})





}catch(error){



msg.innerHTML =
"❌ Server Error";


msg.style.color="red";


console.log(error);


}



}
