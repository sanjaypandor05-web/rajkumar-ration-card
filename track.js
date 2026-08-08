// ==========================================
// RAJKUMAR RATION CARD PORTAL
// FINAL TRACK.JS
// ==========================================


// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxPWEsUdFkEB_g4RyWHqEI2bPT5TluwZOa30qqiX3QpoGuQUZ5Jt73Utvyqa7XfjRYlfw/exec";


// ==========================================
// TRACK APPLICATION
// ==========================================

async function trackApplication(){

    const input =
        document.getElementById("applicationId");

    const msg =
        document.getElementById("msg");

    const result =
        document.getElementById("result");

    const button =
        document.getElementById("trackButton");


    if(!input || !msg || !result){

        return;

    }


    // ======================================
    // GET APPLICATION ID
    // ======================================

    const applicationId =
        input.value
        .trim()
        .toUpperCase();


    // ======================================
    // VALIDATION
    // ======================================

    if(applicationId === ""){

        msg.innerHTML =
            "❌ Application ID દાખલ કરો";

        msg.style.color =
            "red";

        result.style.display =
            "none";

        input.focus();

        return;

    }


    // ======================================
    // LOADING
    // ======================================

    button.disabled = true;

    button.innerHTML =
        "⏳ શોધી રહ્યા છીએ...";


    msg.innerHTML =
        "⏳ તમારી અરજી શોધી રહ્યા છીએ...";

    msg.style.color =
        "blue";


    result.style.display =
        "none";


    try{


        // ==================================
        // SEND REQUEST
        // ==================================

        const response =
            await fetch(
                SCRIPT_URL,
                {

                    method:"POST",

                    body:JSON.stringify({

                        action:
                            "trackApplication",

                        applicationId:
                            applicationId

                    })

                }
            );


        // ==================================
        // RESPONSE CHECK
        // ==================================

        if(!response.ok){

            throw new Error(
                "Network response error"
            );

        }


        const data =
            await response.json();


        console.log(
            "Track Response:",
            data
        );


        // ==================================
        // SUCCESS
        // ==================================

        if(
            data.status === "success" &&
            data.application
        ){

            const app =
                data.application;


            // ------------------------------
            // APPLICATION ID
            // ------------------------------

            document.getElementById(
                "resultId"
            ).innerText =
                safeValue(
                    app.applicationId
                );


            // ------------------------------
            // NAME
            // ------------------------------

            document.getElementById(
                "resultName"
            ).innerText =
                safeValue(
                    app.finalName
                );


            // ------------------------------
            // MOBILE
            // ------------------------------

            document.getElementById(
                "resultMobile"
            ).innerText =
                safeValue(
                    app.mobile
                );


            // ------------------------------
            // SERVICE
            // ------------------------------

            document.getElementById(
                "resultService"
            ).innerText =
                safeValue(
                    app.service
                );


            // ------------------------------
            // PAYMENT STATUS
            // ------------------------------

            const payment =
                safeValue(
                    app.paymentStatus,
                    "Pending"
                );


            document.getElementById(
                "resultPayment"
            ).innerText =
                payment;


            // ------------------------------
            // APPLICATION STATUS
            // ------------------------------

            const status =
                safeValue(
                    app.applicationStatus,
                    "Pending"
                );


            document.getElementById(
                "resultStatus"
            ).innerText =
                status;


            // ------------------------------
            // DATE
            // ------------------------------

            document.getElementById(
                "resultDate"
            ).innerText =
                formatDate(
                    app.date
                );


            // ------------------------------
            // STATUS COLOR
            // ------------------------------

            applyStatusStyle(
                status
            );


            // ------------------------------
            // SUCCESS MESSAGE
            // ------------------------------

            msg.innerHTML =
                "✅ અરજી મળી ગઈ";


            msg.style.color =
                "green";


            result.style.display =
                "block";


        }

        // ==================================
        // NOT FOUND
        // ==================================

        else{

            msg.innerHTML =
                "❌ Application ID મળ્યું નથી";


            msg.style.color =
                "red";


            result.style.display =
                "none";

        }


    }

    catch(error){

        console.error(
            "Track Error:",
            error
        );


        msg.innerHTML =
            "❌ Server સાથે જોડાણમાં સમસ્યા. થોડા સમય પછી ફરી પ્રયાસ કરો.";


        msg.style.color =
            "red";


        result.style.display =
            "none";

    }


    finally{

        button.disabled =
            false;

        button.innerHTML =
            "🔍 Track Application";

    }

}



// ==========================================
// SAFE VALUE
// ==========================================

function safeValue(
    value,
    defaultValue = "-"
){

    if(
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ){

        return defaultValue;

    }


    return String(value);

}



// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(value){

    if(
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ){

        return "-";

    }


    // Google Apps Script Date
    // સામાન્ય રીતે string તરીકે આવે છે

    try{

        const date =
            new Date(value);


        if(
            isNaN(
                date.getTime()
            )
        ){

            return String(value);

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day:"2-digit",
                month:"2-digit",
                year:"numeric"
            }
        );

    }

    catch(error){

        return String(value);

    }

}



// ==========================================
// APPLICATION STATUS COLOR
// ==========================================

function applyStatusStyle(
    status
){

    const element =
        document.getElementById(
            "resultStatus"
        );


    if(!element){

        return;

    }


    // Remove old classes

    element.classList.remove(
        "status-pending",
        "status-success",
        "status-failed"
    );


    const value =
        String(
            status || ""
        )
        .trim()
        .toLowerCase();


    // ======================================
    // SUCCESS
    // ======================================

    if(
        value === "completed" ||
        value === "successful" ||
        value === "success"
    ){

        element.classList.add(
            "status-success"
        );

        return;

    }


    // ======================================
    // FAILED
    // ======================================

    if(
        value === "rejected" ||
        value === "failed"
    ){

        element.classList.add(
            "status-failed"
        );

        return;

    }


    // ======================================
    // PENDING / PROCESSING
    // ======================================

    element.classList.add(
        "status-pending"
    );

}



// ==========================================
// ENTER KEY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const input =
            document.getElementById(
                "applicationId"
            );


        if(!input){

            return;

        }


        input.addEventListener(
            "keydown",
            function(event){

                if(
                    event.key === "Enter"
                ){

                    event.preventDefault();

                    trackApplication();

                }

            }
        );

    }
);