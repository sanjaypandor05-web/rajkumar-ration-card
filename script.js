
// =====================================
// RAJKUMAR RATION CARD PORTAL
// SCRIPT JS
// =====================================



// ================= MOBILE MENU =================


const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");


if(menu){

menu.addEventListener("click",()=>{

    nav.classList.toggle("active");

});

}




// ================= COUNTER ANIMATION =================


const counters = document.querySelectorAll(".counter h2");


counters.forEach(counter=>{

    let target = counter.innerText;

    let number = parseInt(target);

    let count = 0;


    let timer = setInterval(()=>{


        count += Math.ceil(number/100);


        if(count >= number){

            count = number;
            clearInterval(timer);

        }


        if(target.includes("+")){

            counter.innerText = count + "+";

        }

        else if(target.includes("%")){

            counter.innerText = count + "%";

        }

        else{

            counter.innerText = count;

        }


    },30);


});







// ================= STATUS SEARCH =================


const searchBtn = document.querySelector(".status button");


if(searchBtn){


searchBtn.addEventListener("click",()=>{


let mobile = document.querySelector(".status input").value;



if(mobile==""){


alert("મોબાઇલ નંબર દાખલ કરો");


}

else{


alert(
"તમારી અરજી તપાસવામાં આવી રહી છે..."
);


}



});


}






// ================= SERVICE CLICK =================


const cards = document.querySelectorAll(".card");


cards.forEach(card=>{


card.addEventListener("click",()=>{


let service = card.querySelector("h3").innerText;


alert(
service + " માટે અરજી શરૂ કરો"
);


});


});






// ================= WHATSAPP BUTTON =================


const whatsapp = document.querySelector(".whatsapp");


if(whatsapp){


whatsapp.href =
"https://wa.me/919876543210?text=મને રેશન કાર્ડ સેવા વિશે માહિતી જોઈએ છે";


whatsapp.target="_blank";


}
