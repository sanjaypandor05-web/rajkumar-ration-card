// =====================================================
// RAJKUMAR RATION CARD PORTAL
// FINAL APPLY.JS
// MATCHED WITH FINAL CODE.GS
// =====================================================


// =====================================================
// GOOGLE APPS SCRIPT URL
// =====================================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbw6fQ_vLgVSLDayJrN7zf_A4bUYGlOq02PMSl3jqAAQRnyGGkmG5at2QAVDe-ERyGw6sg/exec";


// =====================================================
// FILE TO BASE64
// =====================================================

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function () {

            const result =
                reader.result.split(",")[1];

            resolve({

                name: file.name,

                mimeType:
                    file.type ||
                    "application/octet-stream",

                data: result

            });

        };

        reader.onerror = function () {

            reject(
                new Error(
                    "File read failed"
                )
            );

        };

        reader.readAsDataURL(file);

    });

}


// =====================================================
// NAME TYPE CHANGE
// =====================================================

function nameTypeChange() {

    const selected =
        document.querySelector(
            'input[name="nameType"]:checked'
        );

    const husbandBox =
        document.getElementById(
            "husbandBox"
        );

    const husband =
        document.getElementById(
            "husband"
        );

    if (!selected) return;


    if (
        selected.value === "Husband"
    ) {

        husbandBox.style.display =
            "block";

    }

    else {

        husbandBox.style.display =
            "none";

        husband.value = "";

    }

}


// =====================================================
// SHOW MESSAGE
// =====================================================

function showMessage(
    text,
    type
) {

    const msg =
        document.getElementById(
            "msg"
        );

    if (!msg) return;


    msg.innerHTML = text;


    if (type === "success") {

        msg.style.color =
            "green";

    }

    else if (type === "error") {

        msg.style.color =
            "red";

    }

    else {

        msg.style.color =
            "blue";

    }

}


// =====================================================
// SEND APPLICATION
// =====================================================

async function sendApplication() {

    const msg =
        document.getElementById(
            "msg"
        );


    try {

        // =============================================
        // GET FORM VALUES
        // =============================================

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


        // =============================================
        // NAME TYPE
        // =============================================

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
                document.getElementById(
                    "husband"
                ).value.trim();

        }


        // =============================================
        // FINAL NAME
        // =============================================

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


        // =============================================
        // GET FILES
        // =============================================

        const aadhaar =
            document.getElementById(
                "aadhaar"
            ).files[0];


        const ration =
            document.getElementById(
                "ration"
            ).files[0];


        const payment =
            document.getElementById(
                "payment"
            ).files[0];


        // =============================================
        // REQUIRED VALIDATION
        // =============================================

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

            showMessage(
                "❌ કૃપા કરીને બધી જરૂરી માહિતી ભરો.",
                "error"
            );

            return;

        }


        // =============================================
        // MOBILE VALIDATION
        // =============================================

        if (
            !/^[0-9]{10}$/.test(
                mobile
            )
        ) {

            showMessage(
                "❌ મોબાઇલ નંબર 10 અંકનો હોવો જોઈએ.",
                "error"
            );

            return;

        }


        // =============================================
        // HUSBAND VALIDATION
        // =============================================

        if (
            nameType === "Husband" &&
            husbandName === ""
        ) {

            showMessage(
                "❌ પતિનું નામ લખો.",
                "error"
            );

            return;

        }


        // =============================================
        // FILE VALIDATION
        // =============================================

        if (!aadhaar) {

            showMessage(
                "❌ Aadhaar Card PDF અપલોડ કરો.",
                "error"
            );

            return;

        }


        if (!ration) {

            showMessage(
                "❌ Ration Card PDF અપલોડ કરો.",
                "error"
            );

            return;

        }


        if (!payment) {

            showMessage(
                "❌ Payment Screenshot અપલોડ કરો.",
                "error"
            );

            return;

        }


        // =============================================
        // PDF VALIDATION
        // =============================================

        const aadhaarName =
            aadhaar.name.toLowerCase();


        const rationName =
            ration.name.toLowerCase();


        if (
            !aadhaarName.endsWith(".pdf")
        ) {

            showMessage(
                "❌ Aadhaar Card માત્ર PDF હોવું જોઈએ.",
                "error"
            );

            return;

        }


        if (
            !rationName.endsWith(".pdf")
        ) {

            showMessage(
                "❌ Ration Card માત્ર PDF હોવું જોઈએ.",
                "error"
            );

            return;

        }


        // =============================================
        // PAYMENT SCREENSHOT TYPE
        // =============================================

        const paymentType =
            payment.type.toLowerCase();


        const allowedPayment =
            paymentType === "image/jpeg" ||
            paymentType === "image/jpg" ||
            paymentType === "image/png" ||
            paymentType === "application/pdf";


        if (!allowedPayment) {

            showMessage(
                "❌ Payment Screenshot JPG, PNG અથવા PDF હોવું જોઈએ.",
                "error"
            );

            return;

        }


        // =============================================
        // SHOW LOADING
        // =============================================

        showMessage(
            "⏳ અરજી તૈયાર થઈ રહી છે...",
            "loading"
        );


        // =============================================
        // CONVERT FILES
        // =============================================

        const aadhaarData =
            await fileToBase64(
                aadhaar
            );


        showMessage(
            "⏳ Ration Card Upload થઈ રહ્યું છે...",
            "loading"
        );


        const rationData =
            await fileToBase64(
                ration
            );


        showMessage(
            "⏳ Payment Screenshot Upload થઈ રહ્યું છે...",
            "loading"
        );


        const paymentData =
            await fileToBase64(
                payment
            );


        // =============================================
        // FINAL DATA
        // =============================================

        const data = {

            // IMPORTANT
            // CODE.GS માટે જરૂરી ACTION

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


        // =============================================
        // SEND TO GOOGLE APPS SCRIPT
        // =============================================

        showMessage(
            "⏳ અરજી Server પર મોકલાઈ રહી છે...",
            "loading"
        );


        const response =
            await fetch(
                SCRIPT_URL,
                {

                    method: "POST",

                    body:
                        JSON.stringify(
                            data
                        )

                }
            );


        // =============================================
        // CHECK RESPONSE
        // =============================================

        if (!response.ok) {

            throw new Error(
                "Server response error"
            );

        }


        const result =
            await response.json();


        // =============================================
        // SUCCESS
        // =============================================

        if (
            result.status ===
            "success"
        ) {


            showMessage(

                `
                <div style="
                    padding:15px;
                    border:1px solid #28a745;
                    border-radius:10px;
                    background:#f0fff4;
                ">

                    <h3>
                    ✅ અરજી સફળતાપૂર્વક મોકલાઈ છે
                    </h3>

                    <p>
                    <b>Application ID:</b>
                    ${result.applicationId || result.id}
                    </p>

                    <p>
                    <b>Final Name:</b>
                    ${result.finalName || finalName}
                    </p>

                    <p>
                    <b>Payment Status:</b>
                    🟡 Pending
                    </p>

                    <p>
                    <b>Application Status:</b>
                    🟡 Pending
                    </p>

                    <p>
                    તમારી અરજી નંબર સાચવી રાખો.
                    આ નંબરથી તમે Application Status Track કરી શકો છો.
                    </p>

                </div>
                `,

                "success"

            );


            // =========================================
            // RESET FORM
            // =========================================

            document
                .querySelectorAll(
                    "input"
                )
                .forEach(
                    function(input) {

                        if (
                            input.type ===
                            "radio"
                        ) {

                            input.checked =
                                input.value ===
                                "Self";

                        }

                        else if (
                            input.type ===
                            "file"
                        ) {

                            input.value =
                                "";

                        }

                        else {

                            input.value =
                                "";

                        }

                    }
                );


            const serviceBox =
                document.getElementById(
                    "service"
                );


            if (serviceBox) {

                serviceBox.value =
                    "";

            }


            const husbandBox =
                document.getElementById(
                    "husbandBox"
                );


            if (husbandBox) {

                husbandBox.style.display =
                    "none";

            }


        }

        // =============================================
        // SERVER ERROR
        // =============================================

        else {

            showMessage(

                "❌ " +
                (
                    result.message ||
                    "અરજી મોકલવામાં સમસ્યા આવી."
                ),

                "error"

            );

        }


    }

    catch (error) {

        console.error(
            "APPLICATION ERROR:",
            error
        );


        showMessage(

            "❌ Server Error: અરજી મોકલી શકાઈ નથી. થોડા સમય પછી ફરી પ્રયાસ કરો.",

            "error"

        );

    }

}
