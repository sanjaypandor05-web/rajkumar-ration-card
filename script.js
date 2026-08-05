// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SIMPLE SCRIPT.JS PART 1
// FORM SUBMIT SYSTEM
// ==========================================



// ---------- GOOGLE APPS SCRIPT URL ----------

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxjgujpnsOQbO0gFVPdFkZ9oDuPFgLnFld22QmNzkwhkeeNEVbVzwXuS3Zu8HBfHt1UoA/exec";




// ---------- SUBMIT APPLICATION ----------

function submitApplication(){


let name =
document.getElementById("name").value;


let mobile =
document.getElementById("mobile").value;


let service =
document.getElementById("service").value;


let village =
document.getElementById("village").value;


let aadhaar =
document.getElementById("aadhaar").value;


let ration =
document.getElementById("ration").value;





// BASIC VALIDATION


if(
name=="" ||
mobile==""
){


alert(
"નામ અને મોબાઇલ નંબર જરૂરી છે"
);


return;


}





let data={


action:
"submitApplication",


name:name,


mobile:mobile,


service:service,


village:village,


aadhaar:aadhaar,


ration:ration


};






// SEND DATA TO GOOGLE SCRIPT


fetch(
SCRIPT_URL,
{


method:"POST",


body:
JSON.stringify(data)


}

)



.then(
response =>
response.json()

)



.then(
result=>{


if(result.success){


alert(

"✅ અરજી સફળતાપૂર્વક મોકલાઈ\n\n"+
"Application ID : "+
result.applicationId

);



document
.getElementById("applicationForm")
.reset();



}

else{


alert(
"❌ "+
result.message
);


}


}

)



.catch(
error=>{


alert(
"Server Error : "+
error
);


}

);



}
// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SIMPLE SCRIPT.JS PART 2
// PDF BASE64 SYSTEM
// ==========================================



// ---------- GLOBAL FILE DATA ----------

let uploadedFileData = "";

let uploadedFileName = "";





// ---------- PDF FILE CHANGE ----------

function handleFileUpload(){


let file =

document.getElementById(
"documentFile"
).files[0];



if(!file){

return;

}





// ONLY PDF CHECK


if(
file.type !== "application/pdf"
){


alert(
"ફક્ત PDF File Upload કરો"
);


return;


}





uploadedFileName =
file.name;





// CONVERT PDF TO BASE64


let reader =
new FileReader();



reader.onload=function(e){


uploadedFileData =

e.target.result
.split(",")[1];



console.log(
"PDF Ready"
);



};



reader.readAsDataURL(file);



}






// ---------- LOADING SHOW ----------


function showLoading(){


let btn =

document.getElementById(
"submitBtn"
);



if(btn){


btn.disabled=true;


btn.innerHTML=
"⏳ Submit થઈ રહ્યું છે...";


}


}




// ---------- LOADING HIDE ----------


function hideLoading(){


let btn =

document.getElementById(
"submitBtn"
);



if(btn){


btn.disabled=false;


btn.innerHTML=
"Submit Application";


}


}
// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SIMPLE SCRIPT.JS PART 3
// FINAL APPLICATION SUBMIT
// ==========================================



// ---------- FINAL SUBMIT APPLICATION ----------

async function submitApplication(){


showLoading();



let name =
document.getElementById("name").value;


let mobile =
document.getElementById("mobile").value;


let service =
document.getElementById("service").value;


let village =
document.getElementById("village").value;


let aadhaar =
document.getElementById("aadhaar").value;


let ration =
document.getElementById("ration").value;





if(
name=="" ||
mobile==""
){


hideLoading();


alert(
"નામ અને મોબાઇલ જરૂરી છે"
);


return;


}




let data={


action:
"submitApplication",


name:name,


mobile:mobile,


service:service,


village:village,


aadhaar:aadhaar,


ration:ration,


fileName:
uploadedFileName,


fileData:
uploadedFileData



};





fetch(
SCRIPT_URL,
{

method:"POST",

body:
JSON.stringify(data)

}

)



.then(
res=>res.json()

)



.then(
result=>{


hideLoading();



if(result.success){



alert(

"✅ અરજી સફળ\n\n"+
"Application ID : "+
result.applicationId

);




// WhatsApp Message

sendWhatsApp(

mobile,

result.applicationId

);





// Reset Form


document
.getElementById(
"applicationForm"
)
.reset();




uploadedFileData="";

uploadedFileName="";



}



else{


alert(
"❌ "+result.message
);


}



}



)



.catch(
error=>{


hideLoading();


alert(
"Server Error"
);


}



);



}





// ---------- WHATSAPP CONFIRMATION ----------


function sendWhatsApp(
mobile,
appId
){



let message =


"નમસ્તે 🙏\n\n"+

"તમારી રેશન કાર્ડ અરજી સ્વીકારવામાં આવી છે.\n\n"+

"Application ID : "+
appId+

"\n\n"+

"Rajkumar Online Work";





let url =


"https://wa.me/91"+

mobile+

"?text="+

encodeURIComponent(message);





window.open(
url,
"_blank"
);



}
