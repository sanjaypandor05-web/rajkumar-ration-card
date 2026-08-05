/* =====================================
   RAJKUMAR RATION CARD PORTAL
   ADMIN PANEL CSS
===================================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:"Noto Sans Gujarati",Arial,sans-serif;
}

body{
    background:#f3f6fb;
}


/* ================= LOGIN ================= */

.login-container{
    width:100%;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:20px;
}

.login-card{
    width:100%;
    max-width:420px;
    background:#fff;
    padding:35px;
    border-radius:20px;
    box-shadow:0 10px 30px rgba(0,0,0,.12);
    text-align:center;
}

.logo{
    font-size:28px;
    font-weight:bold;
    color:#0066cc;
    margin-bottom:15px;
}

.login-card h1{
    color:#0066cc;
    font-size:26px;
    margin-bottom:8px;
}

.login-card p{
    color:#666;
    margin-bottom:25px;
}

.input-group{
    margin-bottom:18px;
}

.input-group label{
    display:block;
    text-align:left;
    font-weight:600;
    margin-bottom:8px;
}

.input-group input{
    width:100%;
    padding:14px;
    border:1px solid #ccc;
    border-radius:10px;
    outline:none;
    font-size:16px;
}

.input-group input:focus{
    border-color:#0066cc;
}

.password-box{
    display:flex;
}

.password-box input{
    flex:1;
    border-radius:10px 0 0 10px;
}

.password-box button{
    width:60px;
    border:none;
    background:#0066cc;
    color:#fff;
    cursor:pointer;
    border-radius:0 10px 10px 0;
}

.login-btn{
    width:100%;
    padding:15px;
    background:#00a651;
    color:#fff;
    border:none;
    border-radius:30px;
    font-size:18px;
    cursor:pointer;
    margin-top:10px;
}

.login-btn:hover{
    background:#008947;
}

#msg{
    margin-top:15px;
    font-weight:bold;
}

.footer{
    margin-top:20px;
    color:#777;
    font-size:14px;
}


/* ================= HEADER ================= */

header{
    background:#0066cc;
    color:#fff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px 30px;
}

.header-right{
    display:flex;
    align-items:center;
    gap:15px;
}

.header-right button{
    background:#ff4d4d;
    color:#fff;
    border:none;
    padding:10px 18px;
    border-radius:8px;
    cursor:pointer;
}


/* ================= DASHBOARD ================= */

.dashboard{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
    padding:25px;
}

.card{
    background:#fff;
    border-radius:15px;
    padding:25px;
    text-align:center;
    box-shadow:0 5px 15px rgba(0,0,0,.08);
}

.card h3{
    color:#555;
    margin-bottom:12px;
}

.card h2{
    color:#0066cc;
    font-size:34px;
}


/* ================= SEARCH ================= */

.search-area{
    padding:0 25px 25px;
    display:flex;
    gap:10px;
}

.search-area input{
    flex:1;
    padding:14px;
    border:1px solid #ccc;
    border-radius:10px;
    outline:none;
}

.search-area button{
    background:#0066cc;
    color:#fff;
    border:none;
    padding:14px 24px;
    border-radius:10px;
    cursor:pointer;
}


/* ================= TABLE ================= */

.table-area{
    padding:0 25px 30px;
    overflow:auto;
}

table{
    width:100%;
    border-collapse:collapse;
    background:#fff;
    box-shadow:0 5px 15px rgba(0,0,0,.08);
}

th{
    background:#0066cc;
    color:#fff;
    padding:14px;
}

td{
    padding:14px;
    border-bottom:1px solid #eee;
    text-align:center;
}

tr:hover{
    background:#f5f5f5;
}


/* ================= BUTTONS ================= */

.view-btn,
.verify-btn,
.complete-btn,
.whatsapp-btn{

    border:none;
    padding:8px 12px;
    border-radius:8px;
    color:#fff;
    cursor:pointer;
    margin:2px;

}

.view-btn{
    background:#0066cc;
}

.verify-btn{
    background:#ff9800;
}

.complete-btn{
    background:#00a651;
}

.whatsapp-btn{
    background:#25D366;
}


/* ================= MODAL ================= */

.modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.5);
    display:flex;
    justify-content:center;
    align-items:center;
}

.modal-content{
    width:95%;
    max-width:650px;
    background:#fff;
    padding:25px;
    border-radius:15px;
}


/* ================= MOBILE ================= */

@media(max-width:768px){

header{
    flex-direction:column;
    gap:12px;
    text-align:center;
}

.dashboard{
    grid-template-columns:1fr;
}

.search-area{
    flex-direction:column;
}

.search-area button{
    width:100%;
}

table{
    font-size:13px;
}

th,
td{
    padding:10px;
}

.login-card{
    padding:25px;
}

}