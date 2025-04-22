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
function remove(){
    document.querySelectorAll('.choice').forEach((button)=>{
        button.classList.remove('active');
    })
} 
document.querySelectorAll('.choice').forEach((button)=>{
    button.addEventListener('click',()=>{
        if(button.classList.contains('chat')){
            remove();
            document.querySelector('.chat').classList.add('active');
        }
        if(button.classList.contains('callBack')){
            remove();
            document.querySelector('.callBack').classList.add('active');
        }
        if(button.classList.contains('email')){
            remove();
            document.querySelector('.email').classList.add('active');
        }if(button.classList.contains('call')){
            remove();
            document.querySelector('.call').classList.add('active');
        }
    })
})
function Chat(){
    document.querySelector('.operations').innerHTML=`
        <div class="messagePanel">
            <div class="identifier">Messaging with Admin</div>
            <div class="container">
                <div class="messages">
                    <div class="text"></div>
                </div>
                <div class="messages">
                    <div class="sender"></div>
                </div>
                <div class="messages">
                    <div class="text"></div>
                </div>
                <div class="messages">
                    <div class="sender"></div>
                </div><div class="messages">
                    <div class="text"></div>
                </div><div class="messages">
                    <div class="sender"></div>
                </div><div class="messages">
                    <div class="text"></div>
                </div><div class="messages">
                    <div class="sender"></div>
                </div><div class="messages">
                    <div class="text"></div>
                </div><div class="messages">
                    <div class="sender"></div>
                </div><div class="messages">
                    <div class="text"></div>
                </div>
            </div>
            <textarea name="message" id="messageTyping" placeholder="Send Us A Message"></textarea>
            <button>Send</button>
        </div>
    `;
}
function callBack(){
    document.querySelector('.operations').innerHTML=`
        <div class="callBackContainer">
            <label>Enter Your Number And Reason</label>
            <div class="phoneNumber">
                <label for="phone">+251</label>
                <input type="text" name="" id="phone" placeholder="919123847">
            </div>
            <input class="reasonCallBack" placeholder=" Reason With 8 word">
        </div>
        <button class="callBackButton">CallBack</button>
    `;
}
function email(){
    document.querySelector('.operations').innerHTML=`
        <div class="emailContainer">
            You Can Email Us ON <b>Support@eth.TravelCraft.com</b>
            <br><br><strong>Notice:</strong>
            When You Email Us Please Use The Email you Used To Register To Our 
            Website
        </div>
    `;
}
function call(){
    document.querySelector('.operations').innerHTML=`
        <div class="emailContainer">
            You Can Call Our Free Phone number <b>+251925252525</b>
            <br><br><strong>Notice:</strong>
            While You Call The center Could Be Serving Other Customers Please If 
            You Can't Reach Us Call Back Again Later Or Use Other Methods To Reach Us.
        </div>
    `;
}