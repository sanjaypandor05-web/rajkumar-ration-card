/* =====================================
   RAJKUMAR RATION CARD PORTAL
   HOME PAGE SCRIPT
===================================== */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwF4N8e9pxd3TYS7fdC73vDdCwZ2vQra_ckTrDYLRAaDvCeGvLeebnVCTpwTPTKMdkYyA/exec";



// ================= IMAGE SLIDER =================


let images = [

    "banner1.jpg",
    "banner2.jpg",
    "banner3.jpg"

];


let index = 0;


let banner = document.querySelector(".hero-image img");


if(banner){


setInterval(()=>{


    index++;


    if(index >= images.length){

        index = 0;

    }


    banner.src = images[index];


},4000);


}




// ================= SMOOTH SCROLL =================


document.querySelectorAll('a[href^="#"]').forEach(link=>{


    link.addEventListener("click",function(e){


        let target = document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});




// ================= APPLY BUTTON =================


let applyButtons = document.querySelectorAll(".apply-btn,.main-btn");


applyButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        console.log(
            "Opening Services Page"
        );


    });


});




// ================= PAGE LOAD =================


window.addEventListener("load",()=>{


    console.log(
        "Rajkumar Ration Card Portal Loaded"
    );


});
/* =====================================
   APPLICATION PAGE SCRIPT
===================================== */



// ================= SERVICE NAME AUTO FILL =================


let serviceInput = document.getElementById("service");


if(serviceInput){


    let urlParams = new URLSearchParams(
        window.location.search
    );


    let serviceName = urlParams.get("service");


    if(serviceName){

        serviceInput.value = serviceName;

    }


}




// ================= APPLICATION SUBMIT =================


let applicationForm = document.getElementById("applicationForm");


if(applicationForm){


applicationForm.addEventListener("submit",function(e){


    e.preventDefault();



    let randomNumber = 
    Math.floor(10000 + Math.random() * 90000);



    let applicationNo =
    "RC2026" + randomNumber;



    alert(
        "તમારી અરજી સફળતાપૂર્વક મોકલાઈ છે.\n\nApplication No: "
        + applicationNo
    );



    // Future Google Sheet Save Here


    applicationForm.reset();


});


}
