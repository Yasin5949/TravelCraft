function Menu(){
    document.querySelector('.menu').style.height='200px';
    document.querySelector('.menu').innerHTML=`
    <div class="account">
            <div class="exit" onclick="Exit();">
                <div class="line"></div>
                <div class="lineTwo"></div>
            </div>
            <div class="customerName"></div>
            <div class="profileInMenu"></div>
        </div>
        <div class="editProfile">
            Manage Account
        </div>
        <div class="history">
            History
        </div>
        <div class="logOut">
            LogOut
        </div>
    `;

}
function Exit(){
       document.querySelector('.menu').style.height='0';
       document.querySelector('.menu').innerHTML=``;
    }   