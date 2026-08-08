// ==========================================
// RAJKUMAR RATION CARD PORTAL
// ADMIN.JS - FINAL
// ==========================================


// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwF4N8e9pxd3TYS7fdC73vDdCwZ2vQra_ckTrDYLRAaDvCeGvLeebnVCTpwTPTKMdkYyA/exec";


// ==========================================
// COMMON API FUNCTION
// ==========================================

async function apiRequest(data) {

    const response = await fetch(SCRIPT_URL, {

        method: "POST",

        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify(data)

    });

    const text = await response.text();

    let result;

    try {

        result = JSON.parse(text);

    } catch (error) {

        console.error("Invalid Server Response:", text);

        throw new Error("Server did not return valid JSON");

    }

    return result;

}


// ==========================================
// ADMIN LOGIN
// ==========================================

async function login() {

    const usernameElement =
        document.getElementById("username");

    const passwordElement =
        document.getElementById("password");

    const msg =
        document.getElementById("msg");


    if (!usernameElement || !passwordElement) {

        console.error("Username or Password field not found.");

        return;

    }


    const username =
        usernameElement.value.trim();

    const password =
        passwordElement.value.trim();


    if (username === "" || password === "") {

        if (msg) {

            msg.innerHTML =
                "❌ Username અને Password દાખલ કરો";

            msg.style.color = "red";

        }

        return;

    }


    if (msg) {

        msg.innerHTML =
            "⏳ Login થઈ રહ્યું છે...";

        msg.style.color = "blue";

    }


    try {

        const result = await apiRequest({

            action: "adminLogin",

            username: username,

            password: password

        });


        console.log("Login Result:", result);


        if (
            result &&
            (
                result.status === "success" ||
                result.success === true
            )
        ) {

            localStorage.setItem(
                "adminLogin",
                "true"
            );


            localStorage.setItem(
                "adminName",
                result.name || username
            );


            if (msg) {

                msg.innerHTML =
                    "✅ Login Successful...";

                msg.style.color = "green";

            }


            setTimeout(function () {

                window.location.href =
                    "admin.html";

            }, 500);

        }

        else {

            if (msg) {

                msg.innerHTML =
                    "❌ Username અથવા Password ખોટો છે";

                msg.style.color = "red";

            }

        }

    }

    catch (error) {

        console.error(
            "Login Error:",
            error
        );


        if (msg) {

            msg.innerHTML =
                "❌ Server સાથે connection થવામાં error આવ્યો";

            msg.style.color = "red";

        }

    }

}


// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

function checkLogin() {

    const loginStatus =
        localStorage.getItem("adminLogin");


    if (loginStatus !== "true") {

        window.location.href =
            "login.html";

        return false;

    }


    const adminName =
        localStorage.getItem("adminName") ||
        "Admin";


    const adminNameElement =
        document.getElementById("adminName");


    if (adminNameElement) {

        adminNameElement.innerHTML =
            adminName;

    }


    return true;

}


```javascript
// =====================================
// ADMIN LOGOUT
// =====================================

function logout(){

    localStorage.removeItem("adminLogin");

    localStorage.removeItem("adminName");

    window.location.replace("login.html");

}
```

    }


    localStorage.removeItem(
        "adminLogin"
    );


    localStorage.removeItem(
        "adminName"
    );


    window.location.href =
        "login.html";

}


// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const result =
            await apiRequest({

                action: "loadDashboard"

            });


        console.log(
            "Dashboard Result:",
            result
        );


        if (
            result &&
            result.status === "success"
        ) {

            setText(
                "totalApplications",
                result.total || 0
            );


            setText(
                "paymentPending",
                result.paymentPending || 0
            );


            setText(
                "paymentVerified",
                result.paymentVerified || 0
            );


            setText(
                "processing",
                result.processing || 0
            );


            setText(
                "completed",
                result.completed || 0
            );


            setText(
                "rejected",
                result.rejected || 0
            );

        }

    }

    catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


// ==========================================
// SET TEXT HELPER
// ==========================================

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.innerHTML =
            value;

    }

}


// ==========================================
// LOAD APPLICATIONS
// ==========================================

async function loadApplications() {

    try {

        const result =
            await apiRequest({

                action: "loadApplications"

            });


        console.log(
            "Applications Result:",
            result
        );


        if (
            result &&
            result.status === "success"
        ) {

            renderTable(
                result.applications || []
            );

        }

        else {

            renderTable([]);

        }

    }

    catch (error) {

        console.error(
            "Load Applications Error:",
            error
        );

    }

}


// ==========================================
// RENDER APPLICATION TABLE
// ==========================================

function renderTable(applications) {

    const tbody =
        document.getElementById(
            "tableBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    if (
        !applications ||
        applications.length === 0
    ) {

        tbody.innerHTML = `
            <tr>
                <td
                    colspan="8"
                    style="text-align:center;padding:20px;"
                >
                    કોઈ અરજી મળી નથી
                </td>
            </tr>
        `;

        return;

    }


    applications.forEach(function (app) {


        const paymentStatus =
            app.paymentStatus || "Pending";


        const applicationStatus =
            app.applicationStatus || "Pending";


        let paymentBadge;


        if (
            paymentStatus.toLowerCase() ===
            "verified"
        ) {

            paymentBadge =
                `<span class="badge green">
                    Verified
                </span>`;

        }

        else {

            paymentBadge =
                `<span class="badge orange">
                    Pending
                </span>`;

        }


        let statusBadge;


        switch (applicationStatus) {

            case "Completed":

                statusBadge =
                    `<span class="badge green">
                        Completed
                    </span>`;

                break;


            case "Rejected":

                statusBadge =
                    `<span class="badge red">
                        Rejected
                    </span>`;

                break;


            case "Processing":

                statusBadge =
                    `<span class="badge blue">
                        Processing
                    </span>`;

                break;


            default:

                statusBadge =
                    `<span class="badge orange">
                        Pending
                    </span>`;

        }


        const applicationId =
            app.applicationId || "-";


        const name =
            app.finalName ||
            app.englishName ||
            "-";


        const mobile =
            app.mobile || "-";


        const village =
            app.village || "-";


        const service =
            app.service || "-";


        const appJson =
            JSON.stringify(app)
            .replace(/'/g, "&#39;");


        const row = `

            <tr>

                <td>
                    ${escapeHTML(applicationId)}
                </td>

                <td>
                    ${escapeHTML(name)}
                </td>

                <td>
                    ${escapeHTML(mobile)}
                </td>

                <td>
                    ${escapeHTML(village)}
                </td>

                <td>
                    ${escapeHTML(service)}
                </td>

                <td>
                    ${paymentBadge}
                </td>

                <td>
                    ${statusBadge}
                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick='viewApplication(${appJson})'
                    >
                        👁 View
                    </button>


                    <button
                        class="whatsapp-btn"
                        onclick="openWhatsApp('${escapeJS(mobile)}','${escapeJS(name)}')"
                    >
                        📲 WhatsApp
                    </button>


                    <button
                        class="verify-btn"
                        onclick="verifyPayment('${escapeJS(applicationId)}')"
                    >
                        💳 Verify
                    </button>


                    <button
                        class="status-btn"
                        onclick="changeStatus('${escapeJS(applicationId)}')"
                    >
                        ✅ Status
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteApplication('${escapeJS(applicationId)}')"
                    >
                        🗑 Delete
                    </button>

                </td>

            </tr>

        `;


        tbody.innerHTML += row;

    });

}


// ==========================================
// HTML ESCAPE
// ==========================================

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// JAVASCRIPT STRING ESCAPE
// ==========================================

function escapeJS(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");

}


// ==========================================
// VIEW APPLICATION
// ==========================================

function viewApplication(app) {

    const modal =
        document.getElementById(
            "viewModal"
        );


    const content =
        document.getElementById(
            "viewContent"
        );


    if (!modal || !content) {

        return;

    }


    content.innerHTML = `

        <h2>
            📄 Application Details
        </h2>

        <hr>

        <p>
            <b>Application ID:</b>
            ${escapeHTML(app.applicationId)}
        </p>

        <p>
            <b>English Name:</b>
            ${escapeHTML(app.englishName)}
        </p>

        <p>
            <b>Gujarati Name:</b>
            ${escapeHTML(app.gujaratiName)}
        </p>

        <p>
            <b>Final Name:</b>
            ${escapeHTML(app.finalName)}
        </p>

        <p>
            <b>Name Type:</b>
            ${escapeHTML(app.nameType)}
        </p>

        <p>
            <b>Husband Name:</b>
            ${escapeHTML(app.husbandName || "-")}
        </p>

        <p>
            <b>Mobile:</b>
            ${escapeHTML(app.mobile)}
        </p>

        <p>
            <b>Village:</b>
            ${escapeHTML(app.village)}
        </p>

        <p>
            <b>Taluka:</b>
            ${escapeHTML(app.taluka)}
        </p>

        <p>
            <b>District:</b>
            ${escapeHTML(app.district)}
        </p>

        <p>
            <b>Ration Card No:</b>
            ${escapeHTML(app.rationNo)}
        </p>

        <p>
            <b>Service:</b>
            ${escapeHTML(app.service)}
        </p>

        <p>
            <b>Payment Status:</b>
            ${escapeHTML(app.paymentStatus)}
        </p>

        <p>
            <b>Application Status:</b>
            ${escapeHTML(app.applicationStatus)}
        </p>

        <br>

        <a
            href="${escapeHTML(app.aadhaarFile || "#")}"
            target="_blank"
        >
            📄 Aadhaar File
        </a>

        <br><br>

        <a
            href="${escapeHTML(app.rationFile || "#")}"
            target="_blank"
        >
            📄 Ration File
        </a>

        <br><br>

        <a
            href="${escapeHTML(app.paymentFile || "#")}"
            target="_blank"
        >
            💳 Payment Screenshot
        </a>

    `;


    modal.style.display =
        "flex";

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    const modal =
        document.getElementById(
            "viewModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// ==========================================
// SEARCH APPLICATION
// ==========================================

async function searchApplication() {

    const searchBox =
        document.getElementById(
            "searchBox"
        );


    if (!searchBox) {

        return;

    }


    const keyword =
        searchBox.value.trim();


    if (keyword === "") {

        loadApplications();

        return;

    }


    try {

        const result =
            await apiRequest({

                action:
                    "searchApplication",

                keyword:
                    keyword

            });


        if (
            result &&
            result.status === "success"
        ) {

            renderTable(
                result.applications || []
            );

        }

        else {

            renderTable([]);

            alert(
                "કોઈ અરજી મળી નથી"
            );

        }

    }

    catch (error) {

        console.error(
            "Search Error:",
            error
        );


        alert(
            "Search Error"
        );

    }

}


// ==========================================
// CLEAR SEARCH
// ==========================================

function clearSearch() {

    const searchBox =
        document.getElementById(
            "searchBox"
        );


    if (searchBox) {

        searchBox.value = "";

    }


    loadApplications();

}


// ==========================================
// VERIFY PAYMENT
// ==========================================

async function verifyPayment(appId) {

    if (
        !confirm(
            "Payment Verify કરવું છે?"
        )
    ) {

        return;

    }


    try {

        const result =
            await apiRequest({

                action:
                    "updatePayment",

                applicationId:
                    appId,

                paymentStatus:
                    "Verified"

            });


        if (
            result &&
            result.status === "success"
        ) {

            alert(
                "✅ Payment Verified"
            );


            loadDashboard();

            loadApplications();

        }

        else {

            alert(
                result.message ||
                "Payment Update Failed"
            );

        }

    }

    catch (error) {

        console.error(
            "Payment Error:",
            error
        );


        alert(
            "Payment Update Error"
        );

    }

}


// ==========================================
// CHANGE STATUS
// ==========================================

async function changeStatus(appId) {

    const status =
        prompt(
            "Status લખો:\n\nPending\nProcessing\nCompleted\nRejected"
        );


    if (!status) {

        return;

    }


    const allowedStatuses = [
        "Pending",
        "Processing",
        "Completed",
        "Rejected"
    ];


    if (
        !allowedStatuses.includes(
            status
        )
    ) {

        alert(
            "❌ Invalid Status"
        );

        return;

    }


    try {

        const result =
            await apiRequest({

                action:
                    "updateStatus",

                applicationId:
                    appId,

                applicationStatus:
                    status

            });


        if (
            result &&
            result.status === "success"
        ) {

            alert(
                "✅ Status Updated"
            );


            loadDashboard();

            loadApplications();

        }

        else {

            alert(
                result.message ||
                "Status Update Failed"
            );

        }

    }

    catch (error) {

        console.error(
            "Status Error:",
            error
        );


        alert(
            "Status Update Error"
        );

    }

}


// ==========================================
// DELETE APPLICATION
// ==========================================

async function deleteApplication(appId) {

    if (
        !confirm(
            "આ અરજી Delete કરવી છે?"
        )
    ) {

        return;

    }


    try {

        const result =
            await apiRequest({

                action:
                    "deleteApplication",

                applicationId:
                    appId

            });


        if (
            result &&
            result.status === "success"
        ) {

            alert(
                "✅ Application Deleted"
            );


            loadDashboard();

            loadApplications();

        }

        else {

            alert(
                result.message ||
                "Delete Failed"
            );

        }

    }

    catch (error) {

        console.error(
            "Delete Error:",
            error
        );


        alert(
            "Delete Error"
        );

    }

}


// ==========================================
// WHATSAPP
// ==========================================

function openWhatsApp(
    mobile,
    name
) {

    let number =
        String(mobile || "")
        .replace(/\D/g, "");


    if (number.length === 10) {

        number =
            "91" + number;

    }


    const message =
        "નમસ્કાર " +
        name +
        ", તમારી રેશન કાર્ડ અરજી બાબતે Rajkumar Ration Card Portal તરફથી સંપર્ક.";


    const url =
        "https://wa.me/" +
        number +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        // ==================================
        // LOGIN PAGE
        // ==================================

        if (
            currentPage === "login.html" ||
            currentPage === ""
        ) {

            // Login page પર
            // checkLogin() ન ચલાવવું

            return;

        }


        // ==================================
        // ADMIN DASHBOARD
        // ==================================

        if (currentPage === "admin.html") {

            const loggedIn =
                checkLogin();


            if (!loggedIn) {

                return;

            }


            loadDashboard();

            loadApplications();


            const adminName =
                localStorage.getItem(
                    "adminName"
                ) || "Admin";


            const adminNameElement =
                document.getElementById(
                    "adminName"
                );


            if (adminNameElement) {

                adminNameElement.innerHTML =
                    adminName;

            }

        }

    }
);


// ==========================================
// AUTO REFRESH
// ==========================================

setInterval(
    function () {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        // Login page પર refresh નહીં કરવું

        if (
            currentPage === "login.html" ||
            currentPage === ""
        ) {

            return;

        }


        const loginStatus =
            localStorage.getItem(
                "adminLogin"
            );


        if (
            loginStatus === "true" &&
            currentPage === "admin.html"
        ) {

            loadDashboard();

            loadApplications();

        }

    },
    30000
);
