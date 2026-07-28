// ==========================================
// RAJKUMAR ONLINE SERVICES V4.0
// ==========================================

// Google Apps Script URL

const SCRIPT_URL="https://script.google.com/macros/s/AKfycbwJOQozq9qtGMQ0NEfU2c5zLZ6TYcdkj1Mei8D94qXegxxXWq_Ch7jfJmy2Wx1kDjzZBg/exec";

// =============================
// HTML ELEMENTS
// =============================

const form=document.querySelector(".application-form");

const service=document.getElementById("service");

const amount=document.getElementById("amount");

const loading=document.getElementById("loading");

const successPopup=document.getElementById("successPopup");

const topBtn=document.getElementById("topBtn");

// =============================
// PRICE LIST
// =============================

const priceList={

"New Ration Card":100,

"Name Add":100,

"Name Remove":100,

"Correction":200,

"Address Change":250,

"Father Name Update":350

};

// =============================
// SERVICE CHANGE
// =============================

service.addEventListener("change",()=>{

amount.innerHTML="₹"+(priceList[service.value]||0);

});

// =============================
// CARD CLICK
// =============================

function selectService(serviceName){

service.value=serviceName;

amount.innerHTML="₹"+(priceList[serviceName]||0);

document.getElementById("apply").scrollIntoView({

behavior:"smooth"

});

}

// =============================
// HERO SLIDER
// =============================

const slides=document.querySelectorAll(".slide");

let currentSlide=0;

function showSlide(index){

slides.forEach(slide=>{

slide.classList.remove("active");

});

slides[index].classList.add("active");

}

setInterval(()=>{

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

showSlide(currentSlide);

},4000);

// =============================
// BACK TO TOP
// =============================

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});
// =============================
// MOBILE VALIDATION
// =============================

function validateMobile(number){

    const regex=/^[6-9]\d{9}$/;

    return regex.test(number);

}

// =============================
// LOADING
// =============================

function showLoading(){

    loading.style.display="flex";

}

function hideLoading(){

    loading.style.display="none";

}

// =============================
// SUCCESS POPUP
// =============================

function showSuccess(){

    successPopup.style.display="flex";

}

function closePopup(){

    successPopup.style.display="none";

}

// =============================
// RESET FORM
// =============================

function clearForm(){

    form.reset();

    amount.innerHTML="₹0";

}

// =============================
// FORM SUBMIT
// =============================

form.addEventListener("submit",async function(e){

    e.preventDefault();

    const mobile=document.getElementById("mobile").value.trim();

    if(!validateMobile(mobile)){

        alert("કૃપા કરીને સાચો 10 અંકનો મોબાઇલ નંબર દાખલ કરો.");

        return;

    }

    showLoading();

    const data={

        gujaratiName:document.getElementById("gujaratiName").value,

        englishName:document.getElementById("englishName").value,

        mobile:mobile,

        village:document.getElementById("village").value,

        taluka:document.getElementById("taluka").value,

        district:document.getElementById("district").value,

        address:document.getElementById("address").value,

        pincode:document.getElementById("pincode").value,

        email:document.getElementById("email").value,

        service:service.value,

        amount:priceList[service.value]||0,

        details:document.getElementById("details").value

    };

    try{

        const response=await fetch(SCRIPT_URL,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(data)

        });

        const result=await response.json();

        hideLoading();

        if(result.success){

            showSuccess();

            clearForm();

        }else{

            alert("અરજી સબમિટ થઈ નથી.");

        }

    }

    catch(error){

        hideLoading();

        console.error(error);

        alert("Server સાથે જોડાણ થઈ શક્યું નથી.");

    }

});
    
});
// =====================================
// PAGE LOAD
// =====================================

window.addEventListener("load",()=>{

    amount.innerHTML="₹0";

});

// =====================================
// FILE VALIDATION
// =====================================

const aadhaarFile=document.getElementById("aadhaarFile");

const rationFile=document.getElementById("rationFile");

const paymentFile=document.getElementById("paymentFile");

function checkFile(file){

    if(!file) return true;

    const maxSize=5*1024*1024;

    if(file.size>maxSize){

        alert("File size 5MB થી વધુ ન હોવી જોઈએ.");

        return false;

    }

    return true;

}

aadhaarFile.addEventListener("change",()=>{

    checkFile(aadhaarFile.files[0]);

});

rationFile.addEventListener("change",()=>{

    if(rationFile.files.length>0){

        checkFile(rationFile.files[0]);

    }

});

paymentFile.addEventListener("change",()=>{

    checkFile(paymentFile.files[0]);

});

// =====================================
// ENTER KEY SUPPORT
// =====================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closePopup();

    }

});

// =====================================
// DISABLE BUTTON DURING SUBMIT
// =====================================

const submitBtn=document.querySelector(".submit-btn");

function disableSubmit(){

    submitBtn.disabled=true;

    submitBtn.innerHTML="Submitting...";

}

function enableSubmit(){

    submitBtn.disabled=false;

    submitBtn.innerHTML="Submit Application";

}

// =====================================
// ERROR HANDLER
// =====================================

window.addEventListener("error",(e)=>{

    console.error("JavaScript Error :",e.message);

});

// =====================================
// READY
// =====================================

console.log("Rajkumar Online Services V4 Loaded Successfully");
