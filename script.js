// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SCRIPT.JS - PART 1
// ==========================================
// ==========================================
// GOOGLE APPS SCRIPT API URL
// ==========================================

const API_URL = "https://script.google.com/macros/s/AKfycbw3ESOk2lbvEvEjR1TCv_AreBBibLsDcdK4R449vDPhl9Fv71sTYN8F728etwhn385Zxw/exec";
// ---------- PAGE LOADED ----------

document.addEventListener("DOMContentLoaded", function () {

    console.log("Rajkumar Ration Card Portal Loaded");

    smoothScroll();

    activeMenu();

    headerShadow();

});

// ==========================================
// SMOOTH SCROLL
// ==========================================

function smoothScroll() {

    const links = document.querySelectorAll('nav a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target =
            document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}

// ==========================================
// ACTIVE MENU
// ==========================================

function activeMenu(){

    const sections =
    document.querySelectorAll("section");

    const navLinks =
    document.querySelectorAll("nav a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top =
            section.offsetTop-120;

            const height =
            section.clientHeight;

            if(pageYOffset>=top){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(

                link.getAttribute("href")=="#"+current

            ){

                link.classList.add("active");

            }

        });

    });

}

// ==========================================
// HEADER SHADOW
// ==========================================

function headerShadow(){

    const header =
    document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>30){

            header.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.15)";

        }else{

            header.style.boxShadow =
            "0 2px 10px rgba(0,0,0,.08)";

        }

    });

}
// ==========================================
// SCRIPT.JS - PART 2
// SCROLL ANIMATION + BACK TO TOP
// ==========================================

// ---------- SCROLL ANIMATION ----------

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
".feature-card,.why-card,.contact-card"
).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// ---------- BACK TO TOP BUTTON ----------

const topButton = document.createElement("button");

topButton.id = "topBtn";

topButton.innerHTML = "⬆";

document.body.appendChild(topButton);

topButton.style.display = "none";

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        topButton.style.display = "flex";

    }else{

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ---------- BUTTON STYLE ----------

topButton.style.position = "fixed";
topButton.style.right = "20px";
topButton.style.bottom = "95px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#0d6efd";
topButton.style.color = "#fff";
topButton.style.fontSize = "22px";
topButton.style.cursor = "pointer";
topButton.style.zIndex = "999";
topButton.style.alignItems = "center";
topButton.style.justifyContent = "center";
topButton.style.boxShadow = "0 6px 15px rgba(0,0,0,.25)";
// ==========================================
// SCRIPT.JS - PART 3 (FINAL)
// DARK MODE + LOADER + RIPPLE EFFECT
// ==========================================

// ---------- PAGE LOADER ----------

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

// ---------- RIPPLE BUTTON EFFECT ----------

document.querySelectorAll(
".primary-btn,.secondary-btn,.login-btn,.call-btn,.contact-btn"
).forEach(button=>{

    button.addEventListener("click",function(e){

        const circle =
        document.createElement("span");

        const size =
        Math.max(this.clientWidth,this.clientHeight);

        circle.style.width = size+"px";
        circle.style.height = size+"px";

        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.background =
        "rgba(255,255,255,.45)";
        circle.style.pointerEvents = "none";

        circle.style.left =
        e.offsetX-size/2+"px";

        circle.style.top =
        e.offsetY-size/2+"px";

        circle.style.transform =
        "scale(0)";

        circle.style.transition =
        "transform .5s, opacity .6s";

        this.style.position="relative";
        this.style.overflow="hidden";

        this.appendChild(circle);

        requestAnimationFrame(()=>{

            circle.style.transform =
            "scale(4)";

            circle.style.opacity="0";

        });

        setTimeout(()=>{

            circle.remove();

        },600);

    });

});

// ---------- DARK MODE ----------

const darkButton =
document.createElement("button");

darkButton.id="darkModeBtn";

darkButton.innerHTML="🌙";

document.body.appendChild(darkButton);

darkButton.style.position="fixed";
darkButton.style.left="20px";
darkButton.style.bottom="20px";
darkButton.style.width="55px";
darkButton.style.height="55px";
darkButton.style.border="none";
darkButton.style.borderRadius="50%";
darkButton.style.background="#222";
darkButton.style.color="#fff";
darkButton.style.fontSize="22px";
darkButton.style.cursor="pointer";
darkButton.style.zIndex="999";

darkButton.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        darkButton.innerHTML="☀";

        localStorage.setItem("theme","dark");

    }else{

        darkButton.innerHTML="🌙";

        localStorage.setItem("theme","light");

    }

});

// ---------- LOAD SAVED THEME ----------

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark-mode");

    darkButton.innerHTML="☀";

}

console.log("Script Loaded Successfully");
