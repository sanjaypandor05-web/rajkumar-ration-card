// =====================================================
// RAJKUMAR RATION CARD PORTAL
// FINAL TRACK.JS
// MATCHED WITH CODE.GS
// =====================================================


// =====================================================
// GOOGLE APPS SCRIPT URL
// =====================================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxPWEsUdFkEB_g4RyWHqEI2bPT5TluwZOa30qqiX3QpoGuQUZ5Jt73Utvyqa7XfjRYlfw/exec";


// =====================================================
// TRACK APPLICATION
// =====================================================

async function trackApplication() {


    const input =
        document.getElementById(
            "applicationId"
        );


    const msg =
        document.getElementById(
            "msg"
        );


    const resultBox =
        document.getElementById(
            "result"
        );


    const button =
        document.getElementById(
            "trackBtn"
        );


    // =============================================
    // GET APPLICATION ID
    // =============================================

    const applicationId =
        input.value
        .trim()
        .toUpperCase();


    // =============================================
    // HIDE OLD RESULT
    // =============================================

    resultBox.style.display =
        "none";


    msg.innerHTML =
        "";


    // =============================================
    // VALIDATION
    // =============================================

    if (
        applicationId === ""
    ) {

        msg.innerHTML =
            "❌ Application ID નાખો.";

        msg.style.color =
            "red";

        input.focus();

        return;

    }


    // =============================================
    // BASIC ID VALIDATION
    // =============================================

    if (
        !/^RC\d{4}\d{4,}$/.test(
            applicationId
        )
    ) {

        msg.innerHTML =
            "❌ સાચી Application ID નાખો. ઉદાહરણ: RC20260001";

        msg.style.color =
            "red";

        input.focus();

        return;

    }


    // =============================================
    // LOADING
    // =============================================

    button.disabled =
        true;


    button.innerHTML =
        "⏳ તપાસી રહ્યા છીએ...";


    msg.innerHTML =
        "⏳ Application Status તપાસી રહ્યા છીએ...";


    msg.style.color =
        "blue";


    // =============================================
    // REQUEST DATA
    // =============================================

    const data = {

        action:
            "trackApplication",

        applicationId:
            applicationId

    };


    try {


        // =========================================
        // SEND REQUEST
        // =========================================

        const response =
            await fetch(
                SCRIPT_URL,
                {

                    method:
                        "POST",

                    body:
                        JSON.stringify(
                            data
                        )

                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Server Error"
            );

        }


        // =========================================
        // READ RESPONSE
        // =========================================

        const result =
            await response.json();


        // =========================================
        // SUCCESS
        // =========================================

        if (
            result.status ===
            "success"
        ) {


            msg.innerHTML =
                "✅ Application મળી ગઈ.";

            msg.style.color =
                "green";


            // =====================================
            // APPLICATION ID
            // =====================================

            document
                .getElementById(
                    "showApplicationId"
                )
                .textContent =
                    result.applicationId ||
                    applicationId;


            // =====================================
            // NAME
            // =====================================

            document
                .getElementById(
                    "showName"
                )
                .textContent =
                    result.finalName ||
                    "-";


            // =====================================
            // SERVICE
            // =====================================

            document
                .getElementById(
                    "showService"
                )
                .textContent =
                    result.service ||
                    "-";


            // =====================================
            // DATE
            // =====================================

            document
                .getElementById(
                    "showDate"
                )
                .textContent =
                    formatDate(
                        result.date
                    );


            // =====================================
            // PAYMENT STATUS
            // =====================================

            setPaymentStatus(
                result.paymentStatus
            );


            // =====================================
            // APPLICATION STATUS
            // =====================================

            setApplicationStatus(
                result.applicationStatus
            );


            // =====================================
            // SHOW RESULT
            // =====================================

            resultBox.style.display =
                "block";


        }

        // =========================================
        // NOT FOUND
        // =========================================

        else {


            msg.innerHTML =
                "❌ " +
                (
                    result.message ||
                    "Application મળી નથી."
                );


            msg.style.color =
                "red";


            resultBox.style.display =
                "none";

        }


    }

    catch (error) {


        console.error(
            "TRACK ERROR:",
            error
        );


        msg.innerHTML =
            "❌ Server સાથે connection થઈ શક્યું નથી. થોડા સમય પછી ફરી પ્રયાસ કરો.";


        msg.style.color =
            "red";


        resultBox.style.display =
            "none";

    }


    finally {


        button.disabled =
            false;


        button.innerHTML =
            "🔍 Track Application";

    }

}


// =====================================================
// PAYMENT STATUS
// =====================================================

function setPaymentStatus(
    status
) {


    const element =
        document.getElementById(
            "paymentStatus"
        );


    const value =
        String(
            status || "Pending"
        )
        .trim()
        .toLowerCase();


    element.className =
        "";


    if (
        value === "verified" ||
        value === "successful" ||
        value === "success"
    ) {

        element.innerHTML =
            "🟢 Verified";

        element.classList.add(
            "status-success"
        );

    }

    else if (
        value === "failed" ||
        value === "rejected"
    ) {

        element.innerHTML =
            "🔴 Failed";

        element.classList.add(
            "status-failed"
        );

    }

    else {

        element.innerHTML =
            "🟡 Pending";

        element.classList.add(
            "status-pending"
        );

    }

}


// =====================================================
// APPLICATION STATUS
// =====================================================

function setApplicationStatus(
    status
) {


    const element =
        document.getElementById(
            "applicationStatus"
        );


    const value =
        String(
            status || "Pending"
        )
        .trim()
        .toLowerCase();


    element.className =
        "";


    if (
        value === "completed" ||
        value === "successful" ||
        value === "success"
    ) {

        element.innerHTML =
            "🟢 Successful";

        element.classList.add(
            "status-success"
        );

    }

    else if (
        value === "failed" ||
        value === "rejected"
    ) {

        element.innerHTML =
            "🔴 Failed";

        element.classList.add(
            "status-failed"
        );

    }

    else if (
        value === "processing"
    ) {

        element.innerHTML =
            "🔵 Processing";

        element.classList.add(
            "status-processing"
        );

    }

    else {

        element.innerHTML =
            "🟡 Pending";

        element.classList.add(
            "status-pending"
        );

    }

}


// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(
    date
) {


    if (
        !date
    ) {

        return "-";

    }


    try {


        const d =
            new Date(
                date
            );


        if (
            isNaN(
                d.getTime()
            )
        ) {

            return String(
                date
            );

        }


        return (
            String(
                d.getDate()
            ).padStart(2, "0")
            + "/" +
            String(
                d.getMonth() + 1
            ).padStart(2, "0")
            + "/" +
            d.getFullYear()
        );


    }

    catch (
        error
    ) {

        return String(
            date
        );

    }

}


// =====================================================
// ENTER KEY SUPPORT
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        const input =
            document.getElementById(
                "applicationId"
            );


        if (!input) return;


        input.addEventListener(
            "keydown",
            function(event) {


                if (
                    event.key ===
                    "Enter"
                ) {

                    trackApplication();

                }

            }
        );


    }
);
