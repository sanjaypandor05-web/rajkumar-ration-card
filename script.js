// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SIMPLE CODE.GS PART 1
// ==========================================


// ---------- GOOGLE SHEET ID ----------

const SPREADSHEET_ID = 
"YOUR_GOOGLE_SHEET_ID";


// ---------- SHEET NAME ----------

const APPLICATION_SHEET =
"Applications";


// ---------- OPEN SHEET ----------

function getSheet(){

  const ss =
  SpreadsheetApp.openById(
    SPREADSHEET_ID
  );

  return ss.getSheetByName(
    APPLICATION_SHEET
  );

}



// ---------- WEBSITE LOAD ----------

function doGet(){

  return HtmlService
  .createTemplateFromFile(
    "index"
  )
  .evaluate()
  .setTitle(
    "Rajkumar Ration Card Portal"
  )
  .setXFrameOptionsMode(
    HtmlService.XFrameOptionsMode.ALLOWALL
  );

}



// ---------- JSON RESPONSE ----------

function jsonResponse(data){

 return ContentService
 .createTextOutput(
   JSON.stringify(data)
 )
 .setMimeType(
   ContentService.MimeType.JSON
 );

}
// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SIMPLE CODE.GS PART 2
// FORM SUBMIT SYSTEM
// ==========================================



// ---------- RECEIVE FORM DATA ----------

function doPost(e){

  try{


    let data =
    JSON.parse(
      e.postData.contents
    );



    if(data.action=="submitApplication"){


      let result =
      saveApplication(data);



      return jsonResponse(result);


    }



    return jsonResponse({

      success:false,

      message:"Invalid Action"

    });



  }

  catch(error){


    return jsonResponse({

      success:false,

      message:error.toString()

    });


  }


}




// ---------- GENERATE APPLICATION ID ----------

function generateApplicationID(){


  let sheet =
  getSheet();


  let lastRow =
  sheet.getLastRow();


  let id =
  lastRow;



  return "RC" +
  Utilities.formatString(
    "%06d",
    id
  );


}





// ---------- SAVE APPLICATION ----------

function saveApplication(data){


  let sheet =
  getSheet();



  let appId =
  generateApplicationID();



  sheet.appendRow([


    appId,


    data.name,


    data.mobile,


    data.service,


    data.village,


    data.aadhaar,


    data.ration,


    "Pending",


    new Date()


  ]);





  return {


    success:true,


    message:
    "Application Submitted Successfully",


    applicationId:
    appId


  };


}
// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SIMPLE CODE.GS PART 3
// GOOGLE DRIVE UPLOAD SYSTEM
// ==========================================



// ---------- GOOGLE DRIVE FOLDER ID ----------

const DRIVE_FOLDER_ID =
"YOUR_DRIVE_FOLDER_ID";




// ---------- UPLOAD PDF TO DRIVE ----------

function uploadFileToDrive(
fileName,
base64Data
){


  try{


    let folder =
    DriveApp.getFolderById(
      DRIVE_FOLDER_ID
    );



    let bytes =
    Utilities.base64Decode(
      base64Data
    );



    let blob =
    Utilities.newBlob(
      bytes,
      MimeType.PDF,
      fileName
    );



    let file =
    folder.createFile(
      blob
    );



    return file.getUrl();



  }


  catch(error){


    return "";

  }


}





// ---------- SAVE DOCUMENT URL ----------

function updateDocumentURL(
appId,
fileURL
){


 let sheet =
 getSheet();



 let data =
 sheet.getDataRange()
 .getValues();



 for(let i=1;i<data.length;i++){



   if(data[i][0]==appId){



     // Column 10 = Document URL

     sheet.getRange(
       i+1,
       10
     )
     .setValue(
       fileURL
     );



     break;


   }


 }


}
// ==========================================
// RAJKUMAR RATION CARD PORTAL
// SIMPLE CODE.GS PART 4
// FINAL APPLICATION SYSTEM
// ==========================================



// ---------- FINAL SAVE APPLICATION ----------

function saveApplication(data){


  let sheet =
  getSheet();



  // CREATE APPLICATION ID

  let appId =
  generateApplicationID();



  let documentURL="";



  // PDF AVAILABLE THEN UPLOAD

  if(
    data.fileData &&
    data.fileName
  ){


    documentURL =
    uploadFileToDrive(
      data.fileName,
      data.fileData
    );


  }





  // SAVE DATA IN SHEET


  sheet.appendRow([


    appId,


    data.name,


    data.mobile,


    data.service,


    data.village,


    data.aadhaar,


    data.ration,


    "Pending",


    new Date(),


    documentURL


  ]);





  return {


    success:true,


    message:
    "Application Submitted Successfully",


    applicationId:
    appId,


    documentURL:
    documentURL


  };


}





// ---------- GET APPLICATION HISTORY ----------

function getApplicationHistory(
mobile
){


 let sheet =
 getSheet();


 let data =
 sheet.getDataRange()
 .getValues();


 let result=[];



 for(let i=1;i<data.length;i++){



   if(
    data[i][2]
    .toString()
    ==
    mobile.toString()
   ){



     result.push(
       data[i]
     );


   }


 }



 return result;


}
