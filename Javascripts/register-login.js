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
function register(){
    document.querySelector(".formContainer").innerHTML=`
    <form class="registerUser">
            <h1>Register</h1>
            <label><legend>FirstName</legend>
                <input type="text" placeholder="">
            </label>
            <label><legend>LastName</legend>
                <input type="text" placeholder="">
            </label>
            <label><legend>Email</legend>
                <input type="text" placeholder="">
            </label>
            <label><legend>password</legend>
                <input type="password" placeholder="">
            </label>
            <label><legend>confirmPassword</legend>
                <input type="password" placeholder="">
            </label><br>
            <button class="registerBtn" onclcik="RegisterUser()">Register</button>
        </form>
        <div class="message">
            <h2>Hey!</h2>
            <p>Join Us On Exploring Te beautiful nature of Ethiopia </p>
            <button class="loginbtn" onclick="loginPage();">I Have Account</button>
        </div>
    `;
}
function loginPage(){
    document.querySelector(".formContainer").innerHTML=`
    <form id="loginUser">
            <h1>Login</h1>
            <label><legend>Email</legend>
                <input type="text" placeholder="" name="email">
            </label>
            <label><legend>Password</legend>
                <input type="password" placeholder="" name="password">
            </label><br>
            <a href="#">Forget Password</a>
            <button type="button"  class="LoginBtn" id="loginBtn" style="width:300px;height:40px;" onclick="LoginUser()">Login</button>
        </form>
        <div class="message">
            <h2>WELCOME!</h2>
            <p>we are dedicated in providing a clear and fast service to our users </p>
            <button class="registerBtn" id="loginBtn" onclick="register();">Create Account</button>
        </div>
    `;
}
function RegisterUser(){
document.querySelector('.registerBtn').addEventListener('click',function(event){
    let form =document.querySelector('.registerUser');
    let formData= new FormData(form);
    fetch('http://localhost:8000/Backend/register.php',{
        method:"POST",
        body:formData
    }).then(response => response.json())
    .then(data =>{
        console.log(data);
    });
});
}
function LoginUser(){
    document.getElementById("loginBtn").addEventListener("click", function() {
        fetch("register-login.html")
        .then(response => response.text())
        .then(html => {
        document.querySelector(".formContainer").innerHTML = html;
            const loginBtn = document.querySelector("loginBtn");
            if (loginBtn) {
                loginBtn.addEventListener("click", function(event) {
                    event.preventDefault();
                    console.log("Register button clicked!");
                    let form=document.getElementById("loginBtn");
                    let formData=new FormData(form);
                    fetch("http://localhost:8000/Backend/login.php",{
                        method:"POST",
                        body:formData
                    }).then(response=> response.text())
                    .then(data=> console.log(data));
                });
            }
        })
        .catch(error => console.error("Error loading file:", error));
    });
    
}
display();
register()