/* =====================================
   RAJKUMAR RATION CARD PORTAL
   HOME PAGE SCRIPT
===================================== */



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
