// ===================================
// RAJKUMAR RATION CARD PORTAL
// FINAL APPLY JS
// PAYMENT VERIFY UPDATED
// ===================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwE881L-lGHqmLGuChubXYy3pNxH4CH2cMNI06DtsT6mb_addwFLDT18pzx0arzo_JRYg/exec";




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





let englishName =
document.getElementById("englishName")
.value.trim();




let gujaratiName =
document.getElementById("gujaratiName")
.value.trim();




let mobile =
document.getElementById("mobile")
.value.trim();




let village =
document.getElementById("village")
.value.trim();




let taluka =
document.getElementById("taluka")
.value.trim();




let district =
document.getElementById("district")
.value.trim();




let rationCard =
document.getElementById("rationNo")
.value.trim();




let service =
document.getElementById("service")
.value;





let transactionId =
document.getElementById("transactionId")
.value.trim();






let nameType =
document.querySelector(
'input[name="nameType"]:checked'
).value;






let husbandName="";





if(nameType=="Husband"){


husbandName =
document.getElementById("husband")
.value.trim();


}







// FINAL NAME


let finalName =
gujaratiName;




if(
nameType=="Husband" &&
husbandName!=""
){


finalName =
gujaratiName+" "+husbandName;


}







// FILES


let aadhaar =
document.getElementById("aadhaar")
.files[0];



let ration =
document.getElementById("ration")
.files[0];



let payment =
document.getElementById("payment")
.files[0];









// VALIDATION


if(

englishName=="" ||

gujaratiName=="" ||

mobile=="" ||

village=="" ||

service=="" ||

transactionId==""

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



englishName:englishName,


gujaratiName:gujaratiName,


finalName:finalName,


nameType:nameType,


husbandName:husbandName,


mobile:mobile,


village:village,


taluka:taluka,


district:district,


rationCard:rationCard,


service:service,


transactionId:transactionId,


paymentStatus:"Pending"



};








// FILE UPLOAD



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







// SEND DATA


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

"Payment Status : Pending";



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
