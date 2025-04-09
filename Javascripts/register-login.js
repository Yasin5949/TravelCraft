const mauntain=`
            <image src="../images/mauntains.jpg" class="comercialImages"></image>
            <div class="introLeft"></div>
            <div class="introRight"></div>
            <div class="introMiddleTop"></div>
            <div class="introMiddleBottom"></div>
    `;
    const abay=`
    <image src="../images/abay.jpg" class="comercialImages"></image>
    <div class="introLeft"></div>
    <div class="introRight"></div>
    <div class="introMiddleTop"></div>
    <div class="introMiddleBottom"></div>
`;
const ertale=`
            <image src="../images/ertale.jpg" class="comercialImages"></image>
            <div class="introLeft"></div>
            <div class="introRight"></div>
            <div class="introMiddleTop"></div>
            <div class="introMiddleBottom"></div>
    `;
const water=`
    <image src="../images/waterFall.jpg" class="comercialImages"></image>
    <div class="introLeft"></div>
    <div class="introRight"></div>
    <div class="introMiddleTop"></div>
    <div class="introMiddleBottom"></div>
`;
const sunset=`
            <image src="../images/sunset.jpg" class="comercialImages"></image>
            <div class="introLeft"></div>
            <div class="introRight"></div>
            <div class="introMiddleTop"></div>
            <div class="introMiddleBottom"></div>
    `;
let selector=1;
function display(){
    setInterval(()=>{
        let current=Math.floor(Math.random()*5)+1;
        console.log(current);
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
    <form>
            <h1>Register</h1>
            <label><legend>username</legend>
                <input type="text" placeholder="">
            </label>
            <label><legend>password</legend>
                <input type="password" placeholder="">
            </label>
            <label><legend>confirmPassword</legend>
                <input type="password" placeholder="">
            </label><br>
            <input type="submit" value="Register" class="LoginBtn">
        </form>
        <div class="message">
            <h2>Hey!</h2>
            <p>Join Us On Exploring Te beautiful nature of Ethiopia </p>
            <button class="registerBtn" onclick="loginPage();">I Have Account</button>
        </div>
    `;
}
function loginPage(){
    document.querySelector(".formContainer").innerHTML=`
    <form>
            <h1>Login</h1>
            <label><legend>username</legend>
                <input type="text" placeholder="">
            </label>
            <label><legend>Password</legend>
                <input type="password" placeholder="">
            </label><br>
            <a href="#">Forget Password</a>
            <input type="submit" value="Login" class="LoginBtn">
        </form>
        <div class="message">
            <h2>WELCOME!</h2>
            <p>we are dedicated in providing a clear and fast service to our users </p>
            <button class="registerBtn" onclick="register();">Create Account</button>
        </div>
    `;
}
display();
