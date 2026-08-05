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




// ================= HUSBAND NAME SHOW =================



const service = document.getElementById("service");

const husbandBox = document.getElementById("husbandBox");


if(service){


service.addEventListener("change",()=>{


if(service.value === "husband"){

husbandBox.style.display="block";

}

else{

husbandBox.style.display="none";

}


});


}






// ================= FORM SUBMIT =================



const form = document.getElementById("rationForm");



if(form){



form.addEventListener("submit",(e)=>{


e.preventDefault();




let data = {


name:
document.getElementById("name").value,


mobile:
document.getElementById("mobile").value,


aadhaar:
document.getElementById("aadhaar").value,


ration:
document.getElementById("ration").value,


service:
document.getElementById("service").value,


husbandName:
document.getElementById("husbandName").value,


remark:
document.getElementById("remark").value



};




console.log(data);





alert("તમારી અરજી સફળતાપૂર્વક મોકલાઈ છે");



form.reset();


husbandBox.style.display="none";



});



}





// ================= COUNTER ANIMATION =================



const counters = document.querySelectorAll(".counter h2");


counters.forEach(counter=>{


let target = counter.innerText;


counter.innerText="0";



let count=0;



let timer=setInterval(()=>{


count += 1;


counter.innerText=count+"+";



if(count>=parseInt(target)){


clearInterval(timer);


counter.innerText=target;


}


},30);



});
// =====================================
// RAJKUMAR RATION CARD PORTAL
// SCRIPT.JS FINAL
// =====================================



// ================= MOBILE MENU =================

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");


if(menu){

menu.addEventListener("click",()=>{

nav.classList.toggle("active");

});

}



// ================= SERVICE SELECT =================


const serviceSelect = document.getElementById("service");
const husbandBox = document.getElementById("husbandBox");


if(serviceSelect){


serviceSelect.addEventListener("change",function(){


if(this.value === "husband"){

husbandBox.style.display="block";

}

else{

husbandBox.style.display="none";

}


});


}



// ================= FORM SUBMIT =================


const rationForm = document.getElementById("rationForm");


if(rationForm){


rationForm.addEventListener("submit",function(e){


e.preventDefault();



let formData = {


name:
document.getElementById("name").value,


mobile:
document.getElementById("mobile").value,


aadhaar:
document.getElementById("aadhaar").value,


ration:
document.getElementById("ration").value,


service:
document.getElementById("service").value,


husbandName:
document.getElementById("husbandName").value,


remark:
document.getElementById("remark").value


};



console.log(formData);



// અહીં Google Apps Script URL આવશે

/*
fetch(SCRIPT_URL,{
method:"POST",
body:JSON.stringify(formData)
})
*/


alert(
"તમારી અરજી સફળતાપૂર્વક મોકલાઈ છે"
);



rationForm.reset();


husbandBox.style.display="none";


});


}



// ================= AUTO SCROLL =================


document.querySelectorAll("a[href^='#']").forEach(link=>{


link.addEventListener("click",function(e){


let target=document.querySelector(this.getAttribute("href"));


if(target){

e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}


});


});
