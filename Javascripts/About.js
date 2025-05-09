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
function changeLang(Lang){
    fetch(`../translations/${Lang}.json`)
    .then(response => response.json())
    .then(translations=>{
        document.getElementById('home').innerText=translations.Home;
        document.getElementById('service').innerText=translations.Service;
        document.getElementById('support').innerText=translations.Support;
        document.getElementById('about').innerText=translations.About;
        document.getElementById('prev').innerText=translations.AboutPreviousButton;
        document.getElementById('next').innerText=translations.AboutNextButton;


    })
}
const savedLanguage=localStorage.getItem('Language') || 'English';
changeLang(savedLanguage);