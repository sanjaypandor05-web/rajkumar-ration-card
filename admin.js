// ==========================================
// RAJKUMAR RATION CARD PORTAL
// ADMIN.JS
// PART - 1
// ==========================================


// ================= SCRIPT URL =================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbweg8Yrtw-CpQqa5h5W6pk0WofK6tnPcKd5SWFf9BPkpxDxrv87WR5wsRF5N6E2lj4C2g/exec";



// ================= LOGIN =================

async function login(){

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    const msg =
    document.getElementById("msg");


    if(username=="" || password==""){

        msg.innerHTML="❌ Username અને Password દાખલ કરો";
        msg.style.color="red";
        return;

    }


    msg.innerHTML="⏳ Login થઈ રહ્યું છે...";
    msg.style.color="blue";


    try{

        const response =
        await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"adminLogin",

                username:username,

                password:password

            })

        });


        const result =
        await response.json();


        if(result.status=="success"){

            localStorage.setItem(
                "adminLogin",
                "true"
            );

            localStorage.setItem(
                "adminName",
                result.name
            );

            window.location.href="admin.html";

        }

        else{

            msg.innerHTML=
            "❌ Username અથવા Password ખોટો છે";

            msg.style.color="red";

        }

    }

    catch(error){

        console.log(error);

        msg.innerHTML=
        "❌ Server Error";

        msg.style.color="red";

    }

}



// ================= CHECK LOGIN =================

function checkLogin(){

    const login =
    localStorage.getItem("adminLogin");

    if(login!="true"){

        window.location.href="login.html";

        return;

    }


    const adminName =
    localStorage.getItem("adminName");

    if(document.getElementById("adminName")){

        document.getElementById("adminName").innerHTML=
        adminName || "Admin";

    }

}



// ================= LOGOUT =================

function logout(){

    if(!confirm("શું તમે Logout કરવા માંગો છો?")){

        return;

    }

    localStorage.removeItem("adminLogin");
    localStorage.removeItem("adminName");

    window.location.href="login.html";

}
// ==========================================
// PART - 2
// LOAD DASHBOARD & APPLICATIONS
// ==========================================


// ================= LOAD DASHBOARD =================

async function loadDashboard(){

    try{

        const response = await fetch(SCRIPT_URL,{
            method:"POST",
            body:JSON.stringify({
                action:"loadDashboard"
            })
        });

        const result = await response.json();

        if(result.status=="success"){

            if(document.getElementById("totalApplications"))
                document.getElementById("totalApplications").innerHTML = result.total;

            if(document.getElementById("paymentPending"))
                document.getElementById("paymentPending").innerHTML = result.paymentPending;

            if(document.getElementById("paymentVerified"))
                document.getElementById("paymentVerified").innerHTML = result.paymentVerified;

            if(document.getElementById("processing"))
                document.getElementById("processing").innerHTML = result.processing;

            if(document.getElementById("completed"))
                document.getElementById("completed").innerHTML = result.completed;

            if(document.getElementById("rejected"))
                document.getElementById("rejected").innerHTML = result.rejected;

        }

    }

    catch(err){

        console.log(err);

    }

}



// ================= LOAD APPLICATIONS =================

async function loadApplications(){

    try{

        const response = await fetch(SCRIPT_URL,{
            method:"POST",
            body:JSON.stringify({
                action:"loadApplications"
            })
        });

        const result = await response.json();

        if(result.status=="success"){

            renderTable(result.applications);

        }

    }

    catch(err){

        console.log(err);

    }

}
// ==========================================
// PART - 3A-1
// RENDER TABLE (START)
// ==========================================

function renderTable(applications){

    const tbody =
    document.getElementById("tableBody");

    if(!tbody) return;

    tbody.innerHTML="";

    if(applications.length==0){

        tbody.innerHTML=`
        <tr>
            <td colspan="12" style="text-align:center;padding:20px;">
                કોઈ અરજી મળી નથી
            </td>
        </tr>
        `;

        return;

    }

    applications.forEach(app=>{

        let paymentBadge =
        app.paymentStatus=="Verified"
        ? "<span class='badge green'>Verified</span>"
        : "<span class='badge orange'>Pending</span>";



        let statusBadge="";

        switch(app.applicationStatus){

            case "Completed":
                statusBadge="<span class='badge green'>Completed</span>";
                break;

            case "Rejected":
                statusBadge="<span class='badge red'>Rejected</span>";
                break;

            case "Processing":
                statusBadge="<span class='badge blue'>Processing</span>";
                break;

            default:
                statusBadge="<span class='badge orange'>Pending</span>";

        }

        let row = `
        <tr>

            <td>${app.applicationId}</td>

            <td>${app.finalName}</td>

            <td>${app.mobile}</td>

            <td>${app.village}</td>

            <td>${app.service}</td>

            <td>${paymentBadge}</td>

            <td>${statusBadge}</td>
            // ==========================================
// PART - 3A-2
// RENDER TABLE (ROWS + ACTIONS)
// ==========================================


            <td>

                <button 
                class="view-btn"
                onclick='viewApplication(${JSON.stringify(app)})'>

                👁 View

                </button>


                <button 
                class="whatsapp-btn"
                onclick="openWhatsApp('${app.mobile}','${app.finalName}')">

                📲 WhatsApp

                </button>


                <button 
                class="verify-btn"
                onclick="verifyPayment('${app.applicationId}')">

                💳 Verify

                </button>


                <button 
                class="status-btn"
                onclick="changeStatus('${app.applicationId}')">

                ✅ Status

                </button>


                <button 
                class="delete-btn"
                onclick="deleteApplication('${app.applicationId}')">

                🗑 Delete

                </button>


            </td>


        </tr>
        `;


        tbody.innerHTML += row;


    });


}
// ==========================================
// PART - 3B
// VIEW APPLICATION DETAILS
// ==========================================


// ================= VIEW APPLICATION =================

function viewApplication(app){


    const modal =
    document.getElementById("viewModal");


    const content =
    document.getElementById("viewContent");


    if(!modal || !content){

        return;

    }



    content.innerHTML = `

    <h2>
    📄 Application Details
    </h2>


    <hr>


    <p>
    <b>Application ID:</b>
    ${app.applicationId}
    </p>


    <p>
    <b>English Name:</b>
    ${app.englishName}
    </p>


    <p>
    <b>Gujarati Name:</b>
    ${app.gujaratiName}
    </p>


    <p>
    <b>Final Name:</b>
    ${app.finalName}
    </p>


    <p>
    <b>Name Type:</b>
    ${app.nameType}
    </p>


    <p>
    <b>Husband Name:</b>
    ${app.husbandName || "-"}
    </p>


    <p>
    <b>Mobile:</b>
    ${app.mobile}
    </p>


    <p>
    <b>Village:</b>
    ${app.village}
    </p>


    <p>
    <b>Taluka:</b>
    ${app.taluka}
    </p>


    <p>
    <b>District:</b>
    ${app.district}
    </p>


    <p>
    <b>Ration Card No:</b>
    ${app.rationNo}
    </p>


    <p>
    <b>Service:</b>
    ${app.service}
    </p>


    <p>
    <b>Payment Status:</b>
    ${app.paymentStatus}
    </p>


    <p>
    <b>Application Status:</b>
    ${app.applicationStatus}
    </p>


    <br>


    <a href="${app.aadhaarFile}" target="_blank">
    📄 Aadhaar File
    </a>
    <br><br>


    <a href="${app.rationFile}" target="_blank">
    📄 Ration File
    </a>
    <br><br>


    <a href="${app.paymentFile}" target="_blank">
    💳 Payment Screenshot
    </a>


    `;



    modal.style.display="flex";


}





// ================= CLOSE MODAL =================


function closeModal(){

    const modal =
    document.getElementById("viewModal");


    if(modal){

        modal.style.display="none";

    }

}
// ==========================================
// PART - 4
// SEARCH APPLICATION
// ==========================================


async function searchApplication(){


    const keyword =
    document.getElementById("searchBox")
    .value
    .trim();



    if(keyword==""){

        loadApplications();

        return;

    }



    try{


        const response =
        await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"searchApplication",

                keyword:keyword

            })

        });



        const result =
        await response.json();



        if(result.status=="success"){


            renderTable(
                result.applications
            );


        }

        else{


            alert(
            "કોઈ અરજી મળી નથી"
            );


        }



    }

    catch(error){


        console.log(error);


        alert(
        "Search Error"
        );


    }


}



// ================= CLEAR SEARCH =================


function clearSearch(){


    const box =
    document.getElementById("searchBox");


    if(box){

        box.value="";

    }


    loadApplications();


}
// ==========================================
// PART - 5
// PAYMENT / STATUS / DELETE / WHATSAPP
// ==========================================



// ================= VERIFY PAYMENT =================


async function verifyPayment(appId){


    if(!confirm("Payment Verify કરવું છે?")){

        return;

    }



    try{


        const response =
        await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"updatePayment",

                applicationId:appId,

                paymentStatus:"Verified"

            })

        });



        const result =
        await response.json();



        if(result.status=="success"){

            alert(
            "Payment Verified"
            );


            loadDashboard();

            loadApplications();


        }

        else{

            alert(result.message);

        }



    }

    catch(error){

        console.log(error);

        alert("Payment Update Error");

    }


}




// ================= CHANGE STATUS =================


async function changeStatus(appId){


    let status =
    prompt(
    "Status લખો:\nPending\nProcessing\nCompleted\nRejected"
    );


    if(!status){

        return;

    }



    try{


        const response =
        await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"updateStatus",

                applicationId:appId,

                applicationStatus:status

            })

        });



        const result =
        await response.json();



        if(result.status=="success"){

            alert(
            "Status Updated"
            );


            loadDashboard();

            loadApplications();

        }

        else{

            alert(result.message);

        }



    }

    catch(error){

        console.log(error);

        alert("Status Update Error");

    }


}





// ================= DELETE APPLICATION =================


async function deleteApplication(appId){


    if(!confirm(
    "આ અરજી Delete કરવી છે?"
    )){

        return;

    }



    try{


        const response =
        await fetch(SCRIPT_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"deleteApplication",

                applicationId:appId

            })

        });



        const result =
        await response.json();



        if(result.status=="success"){

            alert(
            "Application Deleted"
            );


            loadDashboard();

            loadApplications();

        }

        else{

            alert(result.message);

        }


    }

    catch(error){

        console.log(error);

        alert("Delete Error");

    }


}




// ================= WHATSAPP =================


function openWhatsApp(mobile,name){


    const number =
    "91"+mobile;


    const message =
    "નમસ્કાર "+name+
    ", તમારી રેશન કાર્ડ અરજી બાબતે Rajkumar Ration Card Portal તરફથી સંપર્ક.";



    const url =
    "https://wa.me/"+number+
    "?text="+
    encodeURIComponent(message);



    window.open(
        url,
        "_blank"
    );


}
// ==========================================
// PART - 6
// INITIAL LOAD & AUTO REFRESH
// ==========================================



// ================= PAGE LOAD =================


document.addEventListener(
"DOMContentLoaded",
function(){


    checkLogin();


    loadDashboard();


    loadApplications();



    // Show Admin Name

    const name =
    localStorage.getItem(
    "adminName"
    );


    if(
    document.getElementById("adminName")
    ){

        document.getElementById("adminName")
        .innerHTML =
        name || "Admin";

    }



});






// ================= AUTO REFRESH =================


setInterval(function(){


    const login =
    localStorage.getItem(
    "adminLogin"
    );


    if(login=="true"){


        loadDashboard();


        loadApplications();


    }


},30000);
