// =====================================================
// RAJKUMAR RATION CARD PORTAL
// FAST APPLY.JS
// =====================================================

https://script.google.com/macros/s/AKfycbwF4N8e9pxd3TYS7fdC73vDdCwZ2vQra_ckTrDYLRAaDvCeGvLeebnVCTpwTPTKMdkYyA/exec

// =====================================================
// FILE TO BASE64
// =====================================================

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        if (!file) {
            resolve(null);
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {

            const result = reader.result;

            resolve({

                name: file.name,

                mimeType:
                    file.type ||
                    "application/octet-stream",

                data:
                    result.split(",")[1]

            });

        };

        reader.onerror = function () {
            reject(
                new Error(
                    "File વાંચવામાં સમસ્યા: " +
                    file.name
                )
            );
        };

        reader.readAsDataURL(file);

    });

}


// =====================================================
// SEND APPLICATION
// =====================================================

async function sendApplication() {

    const msg =
        document.getElementById("msg");


    // -------------------------------------------------
    // PREVENT DOUBLE SUBMIT
    // -------------------------------------------------

    const button =
        document.querySelector(
            'button[onclick="sendApplication()"]'
        );

    if (button) {

        button.disabled = true;

        button.innerText =
            "⏳ અરજી મોકલાઈ રહી છે...";

    }


    try {

        // -------------------------------------------------
        // GET DATA
        // -------------------------------------------------

        const englishName =
            document.getElementById(
                "englishName"
            ).value.trim();


        const gujaratiName =
            document.getElementById(
                "gujaratiName"
            ).value.trim();


        const mobile =
            document.getElementById(
                "mobile"
            ).value.trim();


        const village =
            document.getElementById(
                "village"
            ).value.trim();


        const taluka =
            document.getElementById(
                "taluka"
            ).value.trim();


        const district =
            document.getElementById(
                "district"
            ).value.trim();


        const rationCard =
            document.getElementById(
                "rationNo"
            ).value.trim();


        const service =
            document.getElementById(
                "service"
            ).value;


        const transactionId =
            document.getElementById(
                "transactionId"
            ).value.trim();


        const selectedNameType =
            document.querySelector(
                'input[name="nameType"]:checked'
            );


        const nameType =
            selectedNameType ?
            selectedNameType.value :
            "Self";


        let husbandName = "";


        if (nameType === "Husband") {

            husbandName =
                document.getElementById(
                    "husband"
                ).value.trim();

        }


        // -------------------------------------------------
        // FINAL NAME
        // -------------------------------------------------

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


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!englishName) {

            throw new Error(
                "English Name લખો"
            );

        }


        if (!gujaratiName) {

            throw new Error(
                "ગુજરાતી નામ લખો"
            );

        }


        if (!/^[0-9]{10}$/.test(mobile)) {

            throw new Error(
                "સાચો 10 અંકનો Mobile Number લખો"
            );

        }


        if (!village) {

            throw new Error(
                "ગામ લખો"
            );

        }


        if (!taluka) {

            throw new Error(
                "તાલુકો લખો"
            );

        }


        if (!district) {

            throw new Error(
                "જિલ્લો લખો"
            );

        }


        if (!service) {

            throw new Error(
                "Service પસંદ કરો"
            );

        }


        if (!transactionId) {

            throw new Error(
                "Payment UTR / Transaction ID લખો"
            );

        }


        // -------------------------------------------------
        // FILES
        // -------------------------------------------------

        const aadhaarInput =
            document.getElementById(
                "aadhaar"
            );


        const rationInput =
            document.getElementById(
                "ration"
            );


        const paymentInput =
            document.getElementById(
                "payment"
            );


        const aadhaar =
            aadhaarInput.files[0];


        const ration =
            rationInput.files[0];


        const payment =
            paymentInput.files[0];


        // -------------------------------------------------
        // FILE SIZE CHECK
        // -------------------------------------------------

        const MAX_FILE_SIZE =
            10 * 1024 * 1024;


        if (
            aadhaar &&
            aadhaar.size > MAX_FILE_SIZE
        ) {

            throw new Error(
                "Aadhaar PDF 10MB કરતાં નાની રાખો"
            );

        }


        if (
            ration &&
            ration.size > MAX_FILE_SIZE
        ) {

            throw new Error(
                "Ration PDF 10MB કરતાં નાની રાખો"
            );

        }


        if (
            payment &&
            payment.size > MAX_FILE_SIZE
        ) {

            throw new Error(
                "Payment Screenshot 10MB કરતાં નાનો રાખો"
            );

        }


        // -------------------------------------------------
        // MESSAGE
        // -------------------------------------------------

        msg.innerHTML =
            "📄 Documents તૈયાર થઈ રહ્યા છે...";

        msg.style.color = "blue";


        // -------------------------------------------------
        // CONVERT FILES
        // -------------------------------------------------

        const [aadhaarData, rationData, paymentData] =
            await Promise.all([

                aadhaar ?
                fileToBase64(aadhaar) :
                null,

                ration ?
                fileToBase64(ration) :
                null,

                payment ?
                fileToBase64(payment) :
                null

            ]);


        msg.innerHTML =
            "🚀 Server પર અરજી મોકલાઈ રહી છે...";


        // -------------------------------------------------
        // DATA
        // -------------------------------------------------

        const data = {

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

            aadhaar:
                aadhaarData,

            ration:
                rationData,

            payment:
                paymentData

        };


        // -------------------------------------------------
        // FETCH WITH TIMEOUT
        // -------------------------------------------------

        const controller =
            new AbortController();


        const timeout =
            setTimeout(() => {

                controller.abort();

            }, 120000);


        let response;


        try {

            response =
                await fetch(
                    SCRIPT_URL,
                    {

                        method: "POST",

                        body:
                            JSON.stringify(data),

                        signal:
                            controller.signal

                    }
                );

        }

        finally {

            clearTimeout(timeout);

        }


        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        const result =
            await response.json();


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        if (
            result.status === "success"
        ) {

            msg.innerHTML =

                "✅ <b>અરજી સફળતાપૂર્વક મોકલાઈ છે</b><br><br>" +

                "🆔 Application ID: <b>" +
                result.applicationId +
                "</b><br><br>" +

                "👤 Final Name: <b>" +
                result.finalName +
                "</b><br><br>" +

                "💳 Payment Status: <b>Pending</b>";


            msg.style.color =
                "green";


            if (button) {

                button.innerText =
                    "✅ અરજી મોકલાઈ ગઈ";

            }


            // Form reset
            document
                .querySelectorAll(
                    "input, select"
                )
                .forEach(function(el) {

                    if (
                        el.type !== "radio"
                    ) {

                        el.value = "";

                    }

                });


            return;

        }


        // -------------------------------------------------
        // SERVER ERROR
        // -------------------------------------------------

        throw new Error(
            result.message ||
            "Server Error"
        );


    }

    catch (error) {

        console.error(
            "APPLICATION ERROR:",
            error
        );


        if (
            error.name ===
            "AbortError"
        ) {

            msg.innerHTML =
                "❌ Server response લેવામાં વધારે સમય લાગી રહ્યો છે.<br>" +
                "કૃપા કરીને Documents નાના રાખીને ફરી પ્રયાસ કરો.";

        }

        else {

            msg.innerHTML =
                "❌ " +
                error.message;

        }


        msg.style.color =
            "red";


        if (button) {

            button.disabled =
                false;

            button.innerText =
                "અરજી ફરી મોકલો";

        }

    }

}
