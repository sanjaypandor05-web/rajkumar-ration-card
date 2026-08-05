// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SCRIPT.JS - PART 1
// ==========================================

// ---------- GOOGLE APPS SCRIPT URL ----------

const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

// ---------- BANNER SLIDER ----------

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach((slide)=>{

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

setInterval(nextSlide,4000);

// ---------- OPEN FORM ----------

function openForm(service){

    document.getElementById("applicationModal").style.display = "block";

    document.getElementById("serviceName").value = service;

    document.body.style.overflow = "hidden";

}

// ---------- CLOSE FORM ----------

function closeForm(){

    document.getElementById("applicationModal").style.display = "none";

    document.body.style.overflow = "auto";

}

// ---------- CLOSE ON OUTSIDE CLICK ----------

window.onclick = function(event){

    const modal = document.getElementById("applicationModal");

    if(event.target == modal){

        closeForm();

    }

}

// ---------- CHANGE RELATION ----------

function changeRelation(){

    const relation = document.getElementById("relation").value;

    const label = document.getElementById("relationLabel");

    if(relation === "પતિનું નામ"){

        label.innerHTML = "પતિનું નામ (આધાર મુજબ)";

    }else{

        label.innerHTML = "પિતાનું નામ (આધાર મુજબ)";

    }

}
// ==========================================
// SCRIPT.JS - PART 2
// FORM VALIDATION
// ==========================================

const form = document.getElementById("applicationForm");

form.addEventListener("submit", submitApplication);

function submitApplication(e){

    e.preventDefault();

    // ---------- GET VALUES ----------

    const applicantName = document.getElementById("applicantName").value.trim();

    const relation = document.getElementById("relation").value;

    const relationName = document.getElementById("relationName").value.trim();

    const mobile =
    document.querySelector('input[type="tel"]').value.trim();

    const aadhar =
    document.querySelector('input[maxlength="12"]').value.trim();

    const ration =
    document.querySelectorAll("input[type='text']")[2].value.trim();

    const village =
    document.querySelectorAll("input[type='text']")[3].value.trim();

    const taluka =
    document.querySelectorAll("input[type='text']")[4].value.trim();

    const district =
    document.querySelectorAll("input[type='text']")[5].value.trim();

    const details =
    document.querySelector("textarea").value.trim();

    // ---------- FILES ----------

    const aadharPdf =
    document.querySelectorAll("input[type='file']")[0].files[0];

    const rationPdf =
    document.querySelectorAll("input[type='file']")[1].files[0];

    const otherPdf =
    document.querySelectorAll("input[type='file']")[2].files[0];

    const payment =
    document.querySelectorAll("input[type='file']")[3].files[0];

    // ---------- VALIDATION ----------

    if(applicantName===""){

        alert("અરજદારનું નામ લખો");

        return;

    }

    if(relationName===""){

        alert(relation+" લખો");

        return;

    }

    if(!/^[6-9]\d{9}$/.test(mobile)){

        alert("માન્ય મોબાઇલ નંબર લખો");

        return;

    }

    if(!/^\d{12}$/.test(aadhar)){

        alert("12 અંકનો આધાર નંબર લખો");

        return;

    }

    if(!aadhaarPdf){

        alert("આધાર PDF અપલોડ કરો");

        return;

    }

    if(aadhaarPdf.type!="application/pdf"){

        alert("આધાર ફક્ત PDF હોવો જોઈએ");

        return;

    }

    if(!rationPdf){

        alert("રેશન કાર્ડ PDF અપલોડ કરો");

        return;

    }

    if(rationPdf.type!="application/pdf"){

        alert("રેશન કાર્ડ ફક્ત PDF હોવો જોઈએ");

        return;

    }

    if(payment==null){

        alert("Payment Screenshot અપલોડ કરો");

        return;

    }

    // ---------- SUCCESS ----------

    alert("Validation Successful");

}
// ==========================================
// SCRIPT.JS - PART 3
// GOOGLE APPS SCRIPT SUBMIT
// ==========================================

async function fileToBase64(file){

    return new Promise((resolve,reject)=>{

        if(!file){
            resolve("");
            return;
        }

        const reader = new FileReader();

        reader.onload = function(){

            resolve(reader.result);

        };

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}

async function sendApplication(){

    const submitBtn = document.querySelector("#applicationForm button");

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting...";

    try{

        const data = {

            service : document.getElementById("serviceName").value,

            applicantName :
            document.getElementById("applicantName").value,

            relation :
            document.getElementById("relation").value,

            relationName :
            document.getElementById("relationName").value,

            mobile :
            document.querySelector("input[type='tel']").value,

            aadhar :
            document.querySelector("input[maxlength='12']").value,

            ration :
            document.querySelectorAll("input[type='text']")[2].value,

            village :
            document.querySelectorAll("input[type='text']")[3].value,

            taluka :
            document.querySelectorAll("input[type='text']")[4].value,

            district :
            document.querySelectorAll("input[type='text']")[5].value,

            details :
            document.querySelector("textarea").value,

            aadharPdf :
            await fileToBase64(document.querySelectorAll("input[type='file']")[0].files[0]),

            rationPdf :
            await fileToBase64(document.querySelectorAll("input[type='file']")[1].files[0]),

            otherPdf :
            await fileToBase64(document.querySelectorAll("input[type='file']")[2].files[0]),

            paymentScreenshot :
            await fileToBase64(document.querySelectorAll("input[type='file']")[3].files[0])

        };

        const response = await fetch(SCRIPT_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        const result = await response.json();

        if(result.success){

            alert(
                "અરજી સફળતાપૂર્વક સબમિટ થઈ.\n\nApplication No: "
                + result.applicationId
            );

            document.getElementById("applicationForm").reset();

            closeForm();

        }else{

            alert(result.message || "Submission Failed");

        }

    }catch(error){

        console.error(error);

        alert("Server Error");

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML = "અરજી સબમિટ કરો";

}