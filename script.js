// =======================================
// RAJKUMAR RATION CARD SERVICES
// =======================================

// =============================
// APPWRITE CONFIG
// =============================

const { Client, Storage, Databases, ID } = Appwrite;

const client = new Client();

client
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject("6a6764fe00186aba36b0");

const storage = new Storage(client);
const databases = new Databases(client);

// =============================
// APPWRITE IDS
// =============================

const DATABASE_ID = "6a677b120036838182b66";
const COLLECTION_ID = "applications";
const BUCKET_ID = "documents";

// =============================
// HTML ELEMENTS
// =============================

const form = document.querySelector(".application-form");

const service = document.getElementById("service");
const amount = document.getElementById("amount");

const loading = document.getElementById("loading");
const successPopup = document.getElementById("successPopup");

// =============================
// PRICE LIST
// =============================

const priceList = {

    "New Ration Card":100,

    "Name Add":100,

    "Name Remove":100,

    "Correction":200,

    "Address Change":250,

    "Father Name Update":350

};

// =============================
// SERVICE PRICE CHANGE
// =============================

service.addEventListener("change",function(){

    amount.innerHTML="₹"+(priceList[this.value] || 0);

});

// =============================
// SERVICE CARD CLICK
// =============================

function selectService(serviceName){

    service.value=serviceName;

    amount.innerHTML="₹"+(priceList[serviceName] || 0);

    document
    .getElementById("apply")
    .scrollIntoView({
        behavior:"smooth"
    });

}

// =============================
// HERO SLIDER
// =============================

const slides=document.querySelectorAll(".slide");

let currentSlide=0;

function showSlide(index){

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");

}

setInterval(()=>{

    currentSlide++;

    if(currentSlide>=slides.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

},4000);

// =============================
// BACK TO TOP
// =============================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// =============================
// POPUP CLOSE
// =============================

function closePopup(){

    successPopup.style.display="none";

}
// =======================================
// File Upload Functions
// =======================================

// =============================
// FILE INPUTS
// =============================

const aadhaarInput = document.getElementById("aadhaarFile");
const rationInput = document.getElementById("rationFile");
const paymentInput = document.getElementById("paymentFile");

// =============================
// UPLOAD SINGLE FILE
// =============================

async function uploadFile(file){

    if(!file) return "";

    try{

        const response = await storage.createFile(

            BUCKET_ID,

            ID.unique(),

            file

        );

        return response.$id;

    }

    catch(error){

        console.error("Upload Error :",error);

        throw error;

    }

}

// =============================
// UPLOAD ALL FILES
// =============================

async function uploadDocuments(){

    const aadhaarId = await uploadFile(

        aadhaarInput.files[0]

    );

    let rationId="";

    if(rationInput.files.length>0){

        rationId = await uploadFile(

            rationInput.files[0]

        );

    }

    const paymentId = await uploadFile(

        paymentInput.files[0]

    );

    return{

        aadhaarId,

        rationId,

        paymentId

    };

}

// =============================
// SHOW LOADING
// =============================

function showLoading(){

    loading.style.display="flex";

}

// =============================
// HIDE LOADING
// =============================

function hideLoading(){

    loading.style.display="none";

}

// =============================
// SUCCESS POPUP
// =============================

function showSuccess(){

    successPopup.style.display="flex";

}

// =============================
// RESET FORM
// =============================

function clearForm(){

    form.reset();

    amount.innerHTML="₹0";

}

// =============================
// MOBILE VALIDATION
// =============================

function validateMobile(number){

    const regex=/^[6-9]\d{9}$/;

    return regex.test(number);

}
// =======================================
// Form Submit + Database Save
// =======================================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const mobile = document.getElementById("mobile").value.trim();

    if (!validateMobile(mobile)) {
        alert("કૃપા કરીને સાચો 10 અંકનો મોબાઇલ નંબર દાખલ કરો.");
        return;
    }

    showLoading();

    try {

        // ==========================
        // Upload Files
        // ==========================

        const files = await uploadDocuments();

        // ==========================
        // Save Data in Appwrite
        // ==========================

        await databases.createDocument(

            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),

            {
                gujaratiName: document.getElementById("gujaratiName").value,
                englishName: document.getElementById("englishName").value,
                mobile: mobile,
                village: document.getElementById("village").value,
                taluka: document.getElementById("taluka").value,
                district: document.getElementById("district").value,
                address: document.getElementById("address").value,
                pincode: document.getElementById("pincode").value,
                email: document.getElementById("email").value,
                service: service.value,
                amount: priceList[service.value] || 0,
                details: document.getElementById("details").value,

                aadhaarFile: files.aadhaarId,
                rationFile: files.rationId,
                paymentFile: files.paymentId,

                status: "Pending",
                createdAt: new Date().toISOString()

            }

        );

        hideLoading();

        showSuccess();

        clearForm();

    }

    catch (error) {

        hideLoading();

        console.error(error);

        alert("અરજી સબમિટ કરવામાં ભૂલ થઈ. કૃપા કરીને ફરી પ્રયાસ કરો.");

    }

});

// =======================================
// SUCCESS POPUP BUTTON
// =======================================

function closePopup() {

    successPopup.style.display = "none";

}

// =======================================
// PAGE LOADED
// =======================================

window.addEventListener("load", () => {

    amount.innerHTML = "₹0";

});