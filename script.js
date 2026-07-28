// ===============================
// RAJKUMAR RATION CARD API
// GOOGLE SHEET + DRIVE UPLOAD
// ===============================


const SHEET_ID = "1qd8e9u_6bNsrHJ_UR1EpqxGRX6TeRp27OkHqOFGAhfg";

const SHEET_NAME = "Applications";


// Google Drive Folder ID

const FOLDER_ID = "19NSwU-WyLPSATmYaAfqCnTAVc2tXE6HG";



// TEST API

function doGet(){

  return ContentService
  .createTextOutput(JSON.stringify({

    success:true,
    message:"API Working"

  }))
  .setMimeType(ContentService.MimeType.JSON);

}



// RECEIVE DATA

function doPost(e){


try{


const sheet = SpreadsheetApp
.openById(SHEET_ID)
.getSheetByName(SHEET_NAME);



const data = JSON.parse(e.postData.contents);



// Application ID

const applicationId = "RC-" + new Date().getTime();



// DRIVE FOLDER

const folder = DriveApp.getFolderById(FOLDER_ID);



// Upload Aadhaar

let aadhaarURL = "";

if(data.aadhaarFile){

let file1 = folder.createFile(
  Utilities.newBlob(
    Utilities.base64Decode(data.aadhaarFile.split(",")[1]),
    data.aadhaarType,
    data.aadhaarName
  )
);

aadhaarURL = file1.getUrl();

}



// Upload Ration Card

let rationURL = "";

if(data.rationFile){

let file2 = folder.createFile(
 Utilities.newBlob(
  Utilities.base64Decode(data.rationFile.split(",")[1]),
  data.rationType,
  data.rationName
 )
);

rationURL = file2.getUrl();

}



// Upload Payment Screenshot

let paymentURL = "";

if(data.paymentFile){

let file3 = folder.createFile(
 Utilities.newBlob(
  Utilities.base64Decode(data.paymentFile.split(",")[1]),
  data.paymentType,
  data.paymentName
 )
);

paymentURL = file3.getUrl();

}



// SAVE SHEET


sheet.appendRow([

applicationId,

new Date(),

data.gujaratiName,

data.englishName,

data.mobile,

data.village,

data.taluka,

data.district,

data.address,

data.pincode,

data.email,

data.service,

data.details,

aadhaarURL,

rationURL,

paymentURL


]);





return ContentService
.createTextOutput(JSON.stringify({

success:true,

message:"Application Saved"

}))
.setMimeType(ContentService.MimeType.JSON);



}

catch(error){


return ContentService
.createTextOutput(JSON.stringify({

success:false,

error:error.toString()

}))
.setMimeType(ContentService.MimeType.JSON);



}


}
