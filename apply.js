// ==========================================
// RAJKUMAR RATION CARD PORTAL
// FINAL APPLY.JS
// CUSTOMER APPLICATION
// ==========================================


// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxPWEsUdFkEB_g4RyWHqEI2bPT5TluwZOa30qqiX3QpoGuQUZ5Jt73Utvyqa7XfjRYlfw/exec";


// ==========================================
// FILE TO BASE64
// ==========================================

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();

        reader.onload = function () {

            const result =
                reader.result.split(",")[1];

            resolve({

                name:
                    file.name,

                mimeType:
                    file.type,

                data:
                    result

            });

        };

        reader.onerror = function () {

            reject(
                new Error(
                    "File reading failed"
                )
            );

        };

        reader.readAsDataURL(file);

    });

}


// ==========================================
// SEND APPLICATION
// ==========================================

async function sendApplication() {

    const msg =
        document.getElementById("msg");

    const submitBtn =
        document.getElementById("submitBtn");


    // ======================================
    // GET FORM VALUES
    // ======================================

    const englishName =
        document
            .getElementById("englishName")
            .value
            .trim();


    const gujaratiName =
        document
            .getElementById("gujaratiName")
            .value
            .trim();


    const mobile =
        document
            .getElementById("mobile")
            .value
            .trim();


    const village =
        document
            .getElementById("village")
            .value
            .trim();


    const taluka =
        document
            .getElementById("taluka")
            .value
            .trim();


    const district =
        document
            .getElementById("district")
            .value
            .trim();


    const rationCard =
        document
            .getElementById("rationNo")
            .value
            .trim();


    const service =
        document
            .getElementById("service")
            .value;


    const transactionId =
        document
            .getElementById("transactionId")
            .value
            .trim();


    // ======================================
    // NAME TYPE
    // ======================================

    const selectedNameType =
        document.querySelector(
            'input[name="nameType"]:checked'
        );


    const nameType =
        selectedNameType
            ? selectedNameType.value
            : "Self";


    let husbandName = "";


    if (
        nameType === "Husband"
    ) {

        husbandName =
            document
                .getElementById("husband")
                .value
                .trim();

    }


    // ======================================
    // FINAL NAME
    // ======================================

    let finalName =
        gujaratiName;


    if (
        nameType === "Husband" &&
        husbandName !== ""
    ) {

        finalName =
            gujaratiName +
            " W/O " +
            husbandName;

    }


    // ======================================
    // FILES
    // ======================================

    const aadhaar =
        document
            .getElementById("aadhaar")
            .files[0];


    const ration =
        document
            .getElementById("ration")
            .files[0];


    const payment =
        document
            .getElementById("payment")
            .files[0];


    // ======================================
    // VALIDATION
    // ======================================

    if (
        englishName === "" ||
        gujaratiName === "" ||
        mobile === "" ||
        village === "" ||
        taluka === "" ||
        district === "" ||
        service === "" ||
        transactionId === ""
    ) {

        msg.innerHTML =
            "❌ કૃપા કરીને બધી જરૂરી માહિતી ભરો";

        msg.style.color =
            "red";

        return;

    }


    // ======================================
    // MOBILE VALIDATION
    // ======================================

    if (
        !/^[6-9][0-9]{9}$/.test(
            mobile
        )
    ) {

        msg.innerHTML =
            "❌ સાચો 10 અંકનો મોબાઇલ નંબર નાખો";

        msg.style.color =
            "red";

        return;

    }


    // ======================================
    // HUSBAND NAME VALIDATION
    // ======================================

    if (
        nameType === "Husband" &&
        husbandName === ""
    ) {

        msg.innerHTML =
            "❌ પતિનું નામ નાખો";

        msg.style.color =
            "red";

        return;

    }


    // ======================================
    // FILE VALIDATION
    // ======================================

    if (!aadhaar) {

        msg.innerHTML =
            "❌ Aadhaar PDF અપલોડ કરો";

        msg.style.color =
            "red";

        return;

    }


    if (!ration) {

        msg.innerHTML =
            "❌ Ration Card PDF અપલોડ કરો";

        msg.style.color =
            "red";

        return;

    }


    if (!payment) {

        msg.innerHTML =
            "❌ Payment Screenshot અપલોડ કરો";

        msg.style.color =
            "red";

        return;

    }


    // ======================================
    // AADHAAR PDF CHECK
    // ======================================

    if (
        aadhaar.type !==
        "application/pdf"
    ) {

        msg.innerHTML =
            "❌ Aadhaar File માત્ર PDF હોવી જોઈએ";

        msg.style.color =
            "red";

        return;

    }


    // ======================================
    // RATION PDF CHECK
    // ======================================

    if (
        ration.type !==
        "application/pdf"
    ) {

        msg.innerHTML =
            "❌ Ration Card File માત્ર PDF હોવી જોઈએ";

        msg.style.color =
            "red";

        return;

    }


    // ======================================
    // PAYMENT FILE CHECK
    // ======================================

    const allowedPayment =
        payment.type.startsWith("image/") ||
        payment.type === "application/pdf";


    if (!allowedPayment) {

        msg.innerHTML =
            "❌ Payment Screenshot image અથવા PDF હોવો જોઈએ";

        msg.style.color =
            "red";

        return;

    }


    // ======================================
    // SHOW LOADING
    // ======================================

    msg.innerHTML =
        "⏳ અરજી તૈયાર થઈ રહી છે...";

    msg.style.color =
        "blue";


    if (submitBtn) {

        submitBtn.disabled =
            true;

        submitBtn.innerHTML =
            "⏳ અરજી મોકલાઈ રહી છે...";

    }


    try {

        // ==================================
        // CONVERT FILES
        // ==================================

        msg.innerHTML =
            "⏳ Documents upload માટે તૈયાર થઈ રહ્યા છે...";


        const aadhaarData =
            await fileToBase64(
                aadhaar
            );


        const rationData =
            await fileToBase64(
                ration
            );


        const paymentData =
            await fileToBase64(
                payment
            );


        // ==================================
        // APPLICATION DATA
        // ==================================

        const data = {

            // IMPORTANT
            action:
                "submitApplication",


            englishName:
                englishName,


            gujaratiName:
                gujaratiName,


            finalName:
                finalName,


            nameType:
                nameType,


            husbandName:
                husbandName,


            mobile:
                mobile,


            village:
                village,


            taluka:
                taluka,


            district:
                district,


            rationCard:
                rationCard,


            service:
                service,


            transactionId:
                transactionId,


            paymentStatus:
                "Pending",


            applicationStatus:
                "Pending",


            aadhaar:
                aadhaarData,


            ration:
                rationData,


            payment:
                paymentData

        };


        // ==================================
        // SEND TO GOOGLE APPS SCRIPT
        // ==================================

        msg.innerHTML =
            "⏳ અરજી Google Server પર મોકલાઈ રહી છે...
