// =====================================================
// RAJKUMAR RATION CARD PORTAL
// TRACK APPLICATION
// =====================================================


// =====================================================
// GOOGLE APPS SCRIPT URL
// =====================================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwF4N8e9pxd3TYS7fdC73vDdCwZ2vQra_ckTrDYLRAaDvCeGvLeebnVCTpwTPTKMdkYyA/exec";


// =====================================================
// TRACK APPLICATION
// =====================================================

async function trackApplication() {


    const input =
        document.getElementById(
            "applicationId"
        );


    const button =
        document.getElementById(
            "trackBtn"
        );


    const msg =
        document.getElementById(
            "msg"
        );


    const result =
        document.getElementById(
            "result"
        );


    // -------------------------------------------------
    // GET APPLICATION ID
    // -------------------------------------------------

    const applicationId =
        input.value
            .trim()
            .toUpperCase();


    // -------------------------------------------------
    // HIDE OLD RESULT
    // -------------------------------------------------

    result.style.display =
        "none";


    msg.innerHTML =
        "";


    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!applicationId) {

        msg.innerHTML =
            "❌ Application Number નાખો";

        msg.className =
            "error-message";

        input.focus();

        return;

    }


    // -------------------------------------------------
    // BASIC FORMAT CHECK
    // -------------------------------------------------

    if (
        !/^RC\d{8}$/.test(
            applicationId
        )
    ) {

        msg.innerHTML =
            "❌ Application Number સાચો નાખો<br>" +
            "ઉદાહરણ: RC20260001";

        msg.className =
            "error-message";

        input.focus();

        return;

    }


    // -------------------------------------------------
    // LOADING
    // -------------------------------------------------

    button.disabled =
        true;


    button.innerText =
        "⏳ શોધી રહ્યું છે...";


    msg.innerHTML =
        "🔎 તમારી અરજી શોધી રહ્યા છીએ...";

    msg.className =
        "loading-message";


    // -------------------------------------------------
    // SEND REQUEST
    // -------------------------------------------------

    try {


        const controller =
            new AbortController();


        const timeout =
            setTimeout(
                function () {

                    controller.abort();

                },
                30000
            );


        const response =
            await fetch(
                SCRIPT_URL,
                {

                    method: "POST",

                    body:
                        JSON.stringify({

                            action:
                                "trackApplication",

                            applicationId:
                                applicationId

                        }),

                    signal:
                        controller.signal

                }
            );


        clearTimeout(
            timeout
        );


        const data =
            await response.json();


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        if (
            data.status ===
            "success"
        ) {


            msg.innerHTML =
                "";


            // Application ID

            document.getElementById(
                "showId"
            ).innerText =
                data.applicationId ||
                applicationId;


            // Name

            document.getElementById(
                "showName"
            ).innerText =
                data.finalName ||
                "-";


            // Service

            document.getElementById(
                "showService"
            ).innerText =
                getGujaratiService(
                    data.service
                );


            // Date

            document.getElementById(
                "showDate"
            ).innerText =
                formatDate(
                    data.date
                );


            // Payment Status

            setPaymentStatus(
                data.paymentStatus
            );


            // Application Status

            setApplicationStatus(
                data.applicationStatus
            );


            // SHOW RESULT

            result.style.display =
                "block";


            // Scroll

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


        }

        else {


            msg.innerHTML =
                "❌ " +
                (
                    data.message ||
                    "Application Not Found"
                );


            msg.className =
                "error-message";


        }


    }


    catch (error) {


        console.error(
            "TRACK ERROR:",
            error
        );


        if (
            error.name ===
            "AbortError"
        ) {

            msg.innerHTML =
                "❌ Server response લેવામાં વધારે સમય લાગી રહ્યો છે.";

        }

        else {

            msg.innerHTML =
                "❌ Server સાથે connection કરવામાં સમસ્યા આવી.";

        }


        msg.className =
            "error-message";

    }


    finally {


        button.disabled =
            false;


        button.innerText =
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
        "status";


    if (
        value ===
        "verified"
    ) {

        element.classList.add(
            "success"
        );

        element.innerText =
            "🟢 Payment Verified";

    }

    else if (
        value ===
        "failed"
    ) {

        element.classList.add(
            "failed"
        );

        element.innerText =
            "🔴 Payment Failed";

    }

    else {

        element.classList.add(
            "pending"
        );

        element.innerText =
            "🟡 Payment Pending";

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
        "status";


    if (
        value ===
        "completed" ||
        value ===
        "successful"
    ) {

        element.classList.add(
            "success"
        );

        element.innerText =
            "🟢 Successful";

    }

    else if (
        value ===
        "rejected" ||
        value ===
        "failed"
    ) {

        element.classList.add(
            "failed"
        );

        element.innerText =
            "🔴 Failed";

    }

    else if (
        value ===
        "processing"
    ) {

        element.classList.add(
            "processing"
        );

        element.innerText =
            "🔵 Processing";

    }

    else {

        element.classList.add(
            "pending"
        );

        element.innerText =
            "🟡 Pending";

    }

}


// =====================================================
// SERVICE NAME
// =====================================================

function getGujaratiService(
    service
) {


    const value =
        String(
            service || ""
        ).trim();


    const services = {

        "New Ration Card":
            "નવું રેશન કાર્ડ",

        "Add Name":
            "નામ ઉમેરવું",

        "Remove Name":
            "નામ કાપવું",

        "Correction":
            "રેશન કાર્ડ સુધારો",

        "Mobile Link":
            "મોબાઇલ નંબર લિંક",

        "Duplicate":
            "ડુપ્લિકેટ રેશન કાર્ડ"

    };


    return (
        services[value] ||
        value ||
        "-"
    );

}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(
    value
) {


    if (!value) {

        return "-";

    }


    try {


        const date =
            new Date(value);


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return String(
                value
            );

        }


        return date.toLocaleDateString(
            "en-IN",
            {

                day: "2-digit",

                month: "2-digit",

                year: "numeric"

            }
        );


    }

    catch (error) {

        return String(
            value
        );

    }

}


// =====================================================
// ENTER KEY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const input =
            document.getElementById(
                "applicationId"
            );


        if (input) {


            input.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        trackApplication();

                    }

                }
            );


        }

    }
);
