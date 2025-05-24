const mauntain=`
            <image src="../images/mauntains.jpg" class="comercialImages"></image>
            <div class="introLeft"></div>
            <div class="introMiddleTop"></div>
    `;
    const abay=`
    <image src="../images/abay.jpg" class="comercialImages"></image>
    <div class="introLeft"></div>
    <div class="introMiddleTop"></div>
`;
const ertale=`
            <image src="../images/ertale.jpg" class="comercialImages"></image>
            <div class="introLeft"></div>
            <div class="introMiddleTop"></div>
    `;
const water=`
    <image src="../images/waterFall.jpg" class="comercialImages"></image>
    <div class="introLeft"></div>
    <div class="introMiddleTop"></div>
`;
const sunset=`
            <image src="../images/sunset.jpg" class="comercialImages"></image>
            <div class="introLeft"></div>
            <div class="introMiddleTop"></div>
    `;
let selector=1;
function display(){
    setInterval(()=>{
        if(selector==1){
                document.querySelector(".displayContainer").innerHTML=abay;
                selector++;
            }
        else if(selector==2){
                    document.querySelector(".displayContainer").innerHTML=sunset;
                    selector++;

            }
        else if(selector==3){
                    document.querySelector(".displayContainer").innerHTML=ertale;
                    selector++;

            }
        else if(selector==4){
                    document.querySelector(".displayContainer").innerHTML=water;
                    selector++;

                }
        else{
                    document.querySelector(".displayContainer").innerHTML=mauntain;
                    selector=1;
                    }
    },10000)
};
function login(){
    let form=document.getElementById('loginUser');
    let formData=new FormData(form);
    fetch('../Backend/Login.php',{
        method:"POST",
        body:formData
    }).then(response=>response.json())
    .then(data=>{
        if(data.misMatch){
            document.getElementById('password').style.borderBottom='2px solid red';
        }else if(data.Logged){
            window.location.href='Home.html';
        }
    })
}
function register(){
    let form=document.querySelector('.registerUser');
    let formData=new FormData(form);
    fetch('../Backend/Register.php',{
        method:"POST",
        body:formData
    }).then(response=>response.json())
    .then(data=>{
        if(data.notFilled){
            alert(data.notFilled);
        }
        else if(data.misMatch){
            document.querySelectorAll('.password').forEach(pass=>{
                pass.style.borderBottom='2px solid red';
            })
        }else if(data.Registered){
            window.location.href='Login.html';
        }
    })
}
display();