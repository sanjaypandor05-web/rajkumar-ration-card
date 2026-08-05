// ===================================
// RAJKUMAR RATION CARD PORTAL
// FINAL APPLY JS
// ===================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxQ6XJzA_q0PcxtARS7AzLI4lI3bKGWdo9h5UWfBvHh0vzWMCVLeIYVDNljb2DMRYIUpA/exec";




// ================= FILE TO BASE64 =================

function fileToBase64(file){

return new Promise((resolve,reject)=>{

const reader = new FileReader();


reader.onload=()=>{

let result = reader.result.split(",");


resolve({

name:file.name,

mimeType:file.type,

data:result[1]

});


};


reader.onerror=reject;


reader.readAsDataURL(file);


});


}






// ================= SEND APPLICATION =================


async function sendApplication(){


let msg=document.getElementById("msg");



let name =
document.getElementById("name").value.trim();


let mobile =
document.getElementById("mobile").value.trim();


let village =
document.getElementById("village").value.trim();


let taluka =
document.getElementById("taluka").value.trim();


let district =
document.getElementById("district").value.trim();


let rationCard =
document.getElementById("rationNo").value.trim();


let service =
document.getElementById("service").value;





let checked =
document.querySelector(
'input[name="nameType"]:checked'
);



let nameType =
checked ? checked.value : "Self";



let husbandName="";



if(nameType=="Husband"){


husbandName =
document.getElementById("husband").value.trim();


}




let finalName=name;



if(nameType=="Husband" && husbandName!=""){


finalName =
name+" W/O "+husbandName;


}





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


msg.innerHTML=
"❌ બધી જરૂરી માહિતી ભરો";


msg.style.color="red";

return;


}





msg.innerHTML=
"⏳ અરજી મોકલાઈ રહી છે...";

msg.style.color="blue";





let data={


name:name,


finalName:finalName,


nameType:nameType,


husbandName:husbandName,


mobile:mobile,


village:village,


taluka:taluka,


district:district,


rationCard:rationCard,


service:service



};






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







fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)


})


.then(res=>res.json())


.then(result=>{



if(result.status=="success"){



msg.innerHTML=

"✅ અરજી સફળતાપૂર્વક મોકલાઈ<br><br>"+

"Application ID : <b>"+
result.id+
"</b><br><br>"+

"Final Name : <b>"+
finalName+
"</b><br><br>"+

"Status : Pending";



msg.style.color="green";



document.querySelector("form")?.reset();


}



else{


msg.innerHTML=
"❌ અરજી મોકલવામાં સમસ્યા";


msg.style.color="red";


}



})

.catch(error=>{


msg.innerHTML=
"❌ Server Error";


msg.style.color="red";


console.log(error);


});



}
