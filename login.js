// =====================================
// RAJKUMAR RATION CARD PORTAL
// ADMIN LOGIN JS
// =====================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbweg8Yrtw-CpQqa5h5W6pk0WofK6tnPcKd5SWFf9BPkpxDxrv87WR5wsRF5N6E2lj4C2g/exec";



function adminLogin(){


    let username =
    document.getElementById("username").value.trim();


    let password =
    document.getElementById("password").value.trim();



    if(username=="" || password==""){

        alert("Username અને Password નાખો");

        return;

    }



    fetch(SCRIPT_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"adminLogin",

            username:username,

            password:password

        })

    })


    .then(res=>res.json())


    .then(data=>{


        if(data.status=="success"){


            localStorage.setItem(
                "adminLogin",
                "true"
            );


            localStorage.setItem(
                "adminName",
                username
            );


            window.location.href="admin.html";


        }

        else{


            alert(data.message);


        }


    })


    .catch(error=>{


        console.log(error);

        alert(
        "SERVER ERROR"
        );


    });


}





function togglePassword(){


    let pass =
    document.getElementById("password");


    if(pass.type=="password"){

        pass.type="text";

    }

    else{

        pass.type="password";

    }

}