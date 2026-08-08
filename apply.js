// =====================================================
// RAJKUMAR RATION CARD PORTAL
// FINAL APPLY.JS
// =====================================================


// =====================================================
// GOOGLE APPS SCRIPT URL
// =====================================================

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxPWEsUdFkEB_g4RyWHqEI2bPT5TluwZOa30qqiX3QpoGuQUZ5Jt73Utvyqa7XfjRYlfw/exec";


// =====================================================
// FILE TO BASE64
// =====================================================

function fileToBase64(file) {

  return new Promise(
    function(resolve, reject) {

      const reader =
        new FileReader();


      reader.onload =
        function() {

          const result =
            reader.result;


          const base64 =
            result.split(",")[1];


          resolve({

            name:
              file.name,

            mimeType:
              file.type,

            data:
              base64

          });

        };


      reader.onerror =
        function(error) {

          reject(error);

        };


      reader.readAsDataURL(
        file
      );

    }
  );

}


// =====================================================
// MESSAGE
// =====================================================

function showMessage(
  text,
  color
) {

  const msg =
    document.getElementById(
      "msg"
    );


  if (!msg) return;


  msg.innerHTML =
    text;


  msg.style.color =
    color;

}


// =====================================================
// SEND APPLICATION
// =====================================================

async function sendApplication() {

  try {

    // -----------------------------------------------
    // GET INPUTS
    // -----------------------------------------------

    const englishName =
      document
        .getElementById(
          "englishName"
        )
        .value
        .trim();


    const gujaratiName =
      document
        .getElementById(
          "gujaratiName"
        )
        .value
        .trim();


    const mobile =
      document
        .getElementById(
          "mobile"
        )
        .value
        .trim();


    const village =
      document
        .getElementById(
          "village"
        )
        .value
        .trim();


    const taluka =
      document
        .getElementById(
          "taluka"
        )
        .value
        .trim();


    const district =
      document
        .getElementById(
          "district"
        )
        .value
        .trim();


    const rationCard =
      document
        .getElementById(
          "rationNo"
        )
        .value
        .trim();


    const service =
      document
        .getElementById(
          "service"
        )
        .value;


    const transactionId =
      document
        .getElementById(
          "transactionId"
        )
        .value
        .trim();


    const selectedNameType =
      document.querySelector(
        'input[name="nameType"]:checked'
      );


    const nameType =
      selectedNameType
        ? selectedNameType.value
        : "Self";


    let husbandName =
      "";


    if (
      nameType ===
      "Husband"
    ) {

      husbandName =
        document
          .getElementById(
            "husband"
          )
          .value
          .trim();

    }


    // -----------------------------------------------
    // FINAL NAME
    // -----------------------------------------------

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


    // -----------------------------------------------
    // FILES
    // -----------------------------------------------

    const aadhaar =
      document
        .getElementById(
          "aadhaar"
        )
        .files[0];


    const ration =
      document
        .getElementById(
          "ration"
        )
        .files[0];


    const payment =
      document
        .getElementById(
          "payment"
        )
        .files[0];


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (
      englishName === "" ||
      gujaratiName === "" ||
      mobile === "" ||
      village === "" ||
      service === "" ||
      transactionId === ""
    ) {

      showMessage(
        "❌ બધી જરૂરી માહિતી ભરો",
        "red"
      );

      return;

    }


    // -----------------------------------------------
    // MOBILE
    // -----------------------------------------------

    if (
      !/^[0-9]{10}$/.test(
        mobile
      )
    ) {

      showMessage(
        "❌ Mobile Number 10 digit હોવો જોઈએ",
        "red"
      );

      return;

    }


    // -----------------------------------------------
    // HUSBAND VALIDATION
    // -----------------------------------------------

    if (
      nameType === "Husband" &&
      husbandName === ""
    ) {

      showMessage(
        "❌ પતિનું નામ દાખલ કરો",
        "red"
      );

      return;

    }


    // -----------------------------------------------
    // REQUIRED DOCUMENTS
    // -----------------------------------------------

    if (!aadhaar) {

      showMessage(
        "❌ Aadhaar PDF Upload કરો",
        "red"
      );

      return;

    }


    if (!ration) {

      showMessage(
        "❌ Ration Card PDF Upload કરો",
        "red"
      );

      return;

    }


    if (!payment) {

      showMessage(
        "❌ Payment Screenshot Upload કરો",
        "red"
      );

      return;

    }


    // -----------------------------------------------
    // PDF VALIDATION
    // -----------------------------------------------

    if (
      aadhaar.type !==
      "application/pdf"
    ) {

      showMessage(
        "❌ Aadhaar PDF જ હોવી જોઈએ",
        "red"
      );

      return;

    }


    if (
      ration.type !==
      "application/pdf"
    ) {

      showMessage(
        "❌ Ration Card PDF જ હોવી જોઈએ",
        "red"
      );

      return;

    }


    // -----------------------------------------------
    // PAYMENT FILE TYPE
    // -----------------------------------------------

    const allowedPaymentTypes = [

      "image/jpeg",

      "image/jpg",

      "image/png",

      "application/pdf"

    ];


    if (
      !allowedPaymentTypes.includes(
        payment.type
      )
    ) {

      showMessage(
        "❌ Payment Screenshot JPG, PNG અથવા PDF હોવો જોઈએ",
        "red"
      );

      return;

    }


    // -----------------------------------------------
    // START
    // -----------------------------------------------

    showMessage(
      "⏳ અરજી તૈયાર થઈ રહી છે...",
      "blue"
    );


    // -----------------------------------------------
    // CONVERT FILES
    // -----------------------------------------------

    const aadhaarData =
      await fileToBase64(
        aadhaar
      );


    showMessage(
      "⏳ Aadhaar Upload થઈ રહ્યું છે...",
      "blue"
    );


    const rationData =
      await fileToBase64(
        ration
      );


    showMessage(
      "⏳ Ration Card Upload થઈ રહ્યું છે...",
      "blue"
    );


    const paymentData =
      await fileToBase64(
        payment
      );


    showMessage(
      "⏳ Payment Screenshot Upload થઈ રહ્યું છે...",
      "blue"
    );


    // -----------------------------------------------
    // DATA
    // -----------------------------------------------

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


    // -----------------------------------------------
    // SEND TO GOOGLE APPS SCRIPT
    // -----------------------------------------------

    showMessage(
      "⏳ અરજી Google Server પર મોકલાઈ રહી છે...",
      "blue"
    );


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


    const result =
      await response.json();


    // -----------------------------------------------
    // SUCCESS
    // -----------------------------------------------

    if (
      result.status ===
      "success"
    ) {

      showMessage(
        `
        <div style="
        padding:15px;
        border-radius:10px;
        background:#e8f8ee;
        ">

        <h3>✅ અરજી સફળતાપૂર્વક મોકલાઈ છે</h3>

        <p>
        <b>Application ID:</b>
        ${result.applicationId}
        </p>

        <p>
        <b>Final Name:</b>
        ${result.finalName}
        </p>

        <p>
        <b>Payment Status:</b>
        Pending
        </p>

        <p>
        કૃપા કરીને તમારો
        <b>Application ID</b>
        સાચવી રાખો.
        </p>

        <a
        href="track.html"
        style="
        display:inline-block;
        padding:10px 15px;
        background:#007bff;
        color:white;
        text-decoration:none;
        border-radius:6px;
        "
        >
        📋 Track Application
        </a>

        </div>
        `,
        "green"
      );


      // -------------------------------------------
      // RESET
      // -------------------------------------------

      document
        .getElementById(
          "englishName"
        ).value = "";


      document
        .getElementById(
          "gujaratiName"
        ).value = "";


      document
        .getElementById(
          "mobile"
        ).value = "";


      document
        .getElementById(
          "village"
        ).value = "";


      document
        .getElementById(
          "taluka"
        ).value = "";


      document
        .getElementById(
          "district"
        ).value = "";


      document
        .getElementById(
          "rationNo"
        ).value = "";


      document
        .getElementById(
          "service"
        ).value = "";


      document
        .getElementById(
          "transactionId"
        ).value = "";


      document
        .getElementById(
          "aadhaar"
        ).value = "";


      document
        .getElementById(
          "ration"
        ).value = "";


      document
        .getElementById(
          "payment"
        ).value = "";


      const husband =
        document.getElementById(
          "husband"
        );


      if (husband) {

        husband.value = "";

      }


    }

    else {

      showMessage(

        "❌ " +
        (
          result.message ||
          "અરજી મોકલવામાં સમસ્યા"
        ),

        "red"

      );

    }

  }

  catch (error) {

    console.error(
      error
    );


    showMessage(

      "❌ Server Error: " +
      error.message,

      "red"

    );

  }

}
