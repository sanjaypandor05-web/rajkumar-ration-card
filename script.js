// =============================
// APPWRITE CONFIG
// =============================

const {
  Client,
  Storage,
  TablesDB,
  ID
} = Appwrite;

const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("6a6764fe00186aba36b0");
const storage = new Storage(client);
const tablesDB = new TablesDB(client);

// =============================
// YOUR APPWRITE IDS
// =============================

const DATABASE_ID = "6a677b120036838182b66";
const TABLE_ID = "applications";
const BUCKET_ID = "documents";


// =============================
// HTML ELEMENTS
// =============================

const form = document.querySelector(".application-form");

const service = document.getElementById("service");
const amount = document.getElementById("amount");

const aadhaarInput = document.getElementById("aadhaarFile");
const rationInput = document.getElementById("rationFile");
const paymentInput = document.getElementById("paymentFile");


// =============================
// PRICE CHANGE
// =============================

const priceList = {

    "New Ration Card": 100,

    "Name Add": 100,

    "Name Remove": 100,

    "Correction": 200,

    "Address Change": 250,

    "Father's Name Update": 350

};

service.addEventListener("change", () => {

    const price = priceList[service.value];

    if (price) {

        amount.innerHTML = "₹ " + price;

    } else {

        amount.innerHTML = "--";

    }

});


// =============================
// FILE UPLOAD FUNCTION
// =============================

async function uploadFile(file) {

    if (!file) return null;

    try {

        const response = await storage.createFile(

            BUCKET_ID,

            ID.unique(),

            file

        );

        return response.$id;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}