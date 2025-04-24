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
function unSelect(){
    document.querySelectorAll('.service').forEach((button)=>{
        button.classList.remove('selected');
    })
} 
document.querySelectorAll('.service').forEach((button)=>{
    button.addEventListener('click',()=>{
    unSelect();
    button.classList.add('selected');
})
})
function Book(){
    document.querySelector('.displayContainer').innerHTML=`
        <div class="booked">
            <div class="placeImage ">
                <img src="../images/abay.jpg" alt="">
            </div>
            <div class="placeName">ABAY</div>
            <div class="note"></div>
        </div>
        <div class="detailsContainer">
            <div class="details">
                <div class="bookedDate">Booked ON: 12/12/2025</div>
                <div class="goingDate">Going ON: 12/12/2025</div>
                <button class="button">Change Date</button>
                <div class="dateEdit">
                    <input type="date">
                    <button>Apply</button>
                </div>
            </div>
            <div class="bookedHotel"></div>
        </div><div class="booked">
            <div class="placeImage ">
                <img src="../images/abay.jpg" alt="">
            </div>
            <div class="placeName">ABAY</div>
            <div class="note"></div>
        </div>
        <div class="detailsContainer">
            <div class="details">
                <div class="bookedDate">Booked ON: 12/12/2025</div>
                <div class="goingDate">Going ON: 12/12/2025</div>
                <button class="button">Change Date</button>
                <div class="dateEdit">
                    <input type="date">
                    <button>Apply</button>
                </div>
            </div>
            <div class="bookedHotel"></div>
        </div>
    `;
}
function Role(){
    fetch('../Backend/htmlGenerate.php')
    .then(res=>res.json())
    .then(data=>{
        document.querySelector('.operationContainer').innerHTML=`
            <p>${data.Role}</p>
        `;
    })
}