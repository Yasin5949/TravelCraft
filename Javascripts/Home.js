import { places } from '../Data/favoritePlaces.js';
let modeCounter=0;
let currentIndex=0;
function mode(){
    if(modeCounter===0){
    document.querySelector(".modeContainer").style.background="cyan";
    document.querySelector(".toggler").style.transform=`translateX(30px)`;
    document.querySelector("body").style.background="black";
    document.querySelector("body").style.color="white";
    document.querySelectorAll(".currentlyOn").forEach((button)=>{
    button.style.color="#ededed";
    });
    modeCounter=1;
    }
    else{
        document.querySelector(".modeContainer").style.background="gray";
        document.querySelector(".toggler").style.transform=`translateX(0px)`;
        document.querySelector("body").style.background="#ededed";
        document.querySelector("body").style.color="black";
        document.querySelectorAll(".currentlyOn").forEach((button)=>{
            button.style.color="black";
        });
        modeCounter=0;
    }
}
console.log("hello");
function Menu(){            
    document.querySelector('.menu').style.height='200px';
    document.querySelector('.menu').innerHTML=`
    <div class="account">
            <div class="exit" onclick="Exit();">
                <div class="line"></div>
                <div class="lineTwo"></div>
            </div>
            <div class="customerName" id="customerName"></div>
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
document.querySelectorAll(".currentlyOn").forEach((button)=>{
    button.addEventListener(`click`,()=>{
        if(button.classList.contains('One')){
        document.querySelector('.One').classList.add('currentOne');
        document.querySelector('.Two').classList.remove('currentOne');
        document.querySelector('.Three').classList.remove('currentOne');

            }
        if(button.classList.contains('Two')){
            document.querySelector('.One').classList.remove('currentOne');
            document.querySelector('.Two').classList.add('currentOne');
            document.querySelector('.Three').classList.remove('currentOne');
    
            }
        if(button.classList.contains('Three')){
                document.querySelector('.One').classList.remove('currentOne');
                document.querySelector('.Two').classList.remove('currentOne');
                document.querySelector('.Three').classList.add('currentOne');
        
            }
    });
});
function UpdateFirst(){
    let list=document.querySelectorAll('.favorites');
    list.forEach((list)=>{
        list.classList.remove('favoriteInView');
    });
    list[0].classList.add('favoriteInView');
}
function UpdateSecond(){
    let list=document.querySelectorAll('.favorites');
    list.forEach((list)=>{
        list.classList.remove('secondInView');
    });
    list[1].classList.add('secondInView');
}
function UpdateThird(){
    let list=document.querySelectorAll('.favorites');
    list.forEach((list)=>{
        list.classList.remove('thirdInView');
    });
    list[2].classList.add('thirdInView');
}
function UpdateFour(){
    let list=document.querySelectorAll('.favorites');
    list.forEach((list)=>{
        list.classList.remove('fourthInView');
    });
    list[3].classList.add('fourthInView');
}
function UpdateFive(){
    let list=document.querySelectorAll('.favorites');
    list.forEach((list)=>{
        list.classList.remove('fivethInView');
    });
    list[4].classList.add('fivethInView');
}
function UpdateSix(){
    let list=document.querySelectorAll('.favorites');
    list.forEach((list)=>{
        list.classList.remove('sixthInView');
    });
    list[5].classList.add('sixthInView');
}
function nextView(){
    currentIndex = currentIndex + 1;
    if(currentIndex === 6){
        currentIndex = 0;
    }
    let list=document.querySelectorAll('.favorites');
    document.querySelector('.favoritePlaces').appendChild(list[0]);
    document.querySelector('.favDetail').innerHTML=`
        <h1>${places[currentIndex].aboutPlace.placeName}</h1>
        <p>${places[currentIndex].aboutPlace.discription}</p>
    `;
    UpdateFirst();
    UpdateSecond();
    UpdateThird();
    UpdateFour();
    UpdateFive();
    UpdateSix();
}
function preView(){
    currentIndex = currentIndex - 1;
    if(currentIndex === -1){
        currentIndex = 5;
    }

    let list=document.querySelectorAll('.favorites');
    document.querySelector('.favoritePlaces').prepend(list[5]);
    document.querySelector('.favDetail').innerHTML=`
        <h1>${places[currentIndex].aboutPlace.placeName}</h1>
        <p>${places[currentIndex].aboutPlace.discription}</p>
    `;


    UpdateFirst();
    UpdateSecond();
    UpdateThird();
    UpdateFour();
    UpdateFive();
    UpdateSix();
}
let found=false;
function search(){
    let find=document.querySelector('.searchBar').value;
    if(find){
    document.querySelector('body').innerHTML=``;
    places.forEach((place)=>{
        if(place.aboutPlace.placeName === find){
            found=true;
            document.querySelector('body').innerHTML+=`
                <a href='Home.html'><h2>Back</h2></a>
                <div style="width:80%;height:400px;">
                <h1>${find}</h1><br>
                <div class="favorites "><a href='favorite.html'><image src="${place.aboutPlace.image}" style="width:300px;height:400px;border-radius:20px;float:right;"></image></a></div>
                <div class="favDetail">${place.aboutPlace.discription}</div>
                </div>
                <button class="Book" id="book" style="width:300px;height:50px;background:orange;border:none;color:white;
                font-size:larger;border-radius:20px;margin-left:50px" onclick="Book();">Book</button>
                <div class="formContainer useForm">
                <form>
                <div class="Exit" onclick="closeForm();">Exit</div>
                <h1>Booking</h1>
                <label>Place:${find}</label><br>
                <label for="goingDate">GoingDate:</label>
                <input type="date" id="goingDate"><br>
                <label for="endingDate">Ending Date:</label>
                <input type="date" id="endingDate"><br>
                <label for="hotels">Hotel:</label>
                <select id="hotel">
                <option>Select Choice</option>
                <option>No Hotel</option>
                <option>Choose Hotel</option>
                </select><br>
                <label for="price">Price:${find}</label><br>
                <label for="payment">Payment:</label>
                <select id="payment">
                <option>Cash</option>
                </select>
                <div class="display">
                <div class="hotels"></div>
                <div class="hotelsForm">
                <label for="bed">Bed:</label>
                <select id="bed">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <label for="roomType">Type:</label>
                <select id="roomType">
                    <option>Economy</option>
                    <option>VIP</option>
                </select>
                </div></div>
                <button type="button">Book</button>
                </form>
                <div class="formImage">
                <image src="${place.aboutPlace.image}"></image>
                </div>
                </div>
            `;
        }
    })
    if(!found){
        document.querySelector('body').innerHTML+=`
                <a href='Home.html'><h2>Back</h2></a>
                <h1>Sorry we Currently Didn't start Tour To ${find}</h1>
                `
                ;
    }}
    else{
        alert("Please Enter Place To Search");
    }
}
function Book(){
    document.querySelector(".formContainer").classList.remove('useForm');
    
}
function closeForm(){
    document.querySelector(".formContainer").classList.add('useForm');
    
}
function viewOromia(){
    document.querySelector('body').style.background='url(../images/Awash-park-5.jpg)';
    document.querySelector('body').style.backgroundAttachment='fixed';

    document.querySelector('body').innerHTML=`
                <a href='Home.html' style="color:white;position:fixed;z-index:2;"><h2>Back</h2></a>

    `;
    places.forEach((place)=>{
        if(place.aboutPlace.region === "Oromia"){
            document.querySelector('body').innerHTML+=`
                <div style="width:45%;height:500px;display:inline-block;margin:20px;border:2px solid gray;
                background:rgba(128, 128, 128, 0.353); backdrop-filter:blur(10px);">
                <h1>${place.aboutPlace.placeName}</h1><br>
                <div class="favorites "><a href='favorite.html'><image src="${place.aboutPlace.image}" style="width:300px;height:400px;border-radius:20px;float:right;"></image></a></div>
                <div class="favDetail">${place.aboutPlace.discription}</div>
                </div>
            `;

        }
    })
}
function viewAmhara(){
    document.querySelector('body').style.background='url(../images/abay.jpg)';
    document.querySelector('body').innerHTML=`
                <a href='Home.html'><h2>Back</h2></a>

    `;
    places.forEach((place)=>{
        if(place.aboutPlace.region === "Amhara"){
            document.querySelector('body').innerHTML+=`
                <div style="width:45%;height:500px;display:inline-block;margin-bottom:20px;border:2px solid gray;
                background:rgba(128, 128, 128, 0.353); backdrop-filter:blur(10px);">
                <h1>${place.aboutPlace.placeName}</h1><br>
                <div class="favorites "><a href='favorite.html'><image src="${place.aboutPlace.image}" style="width:300px;height:400px;border-radius:20px;float:right;"></image></a></div>
                <div class="favDetail">${place.aboutPlace.discription}</div>
                </div>
            `;

        }
    })
}
function Language(Lang){
    fetch(`../translations/${Lang}.json`)
    .then(response => response.json())
    .then(translations =>{
        document.getElementById('slogan').innerText = translations.Slogan;
        document.getElementById('famous').innerText = translations.FamousPlace;
        document.getElementById('home').innerText =translations.Home;
        document.getElementById('support').innerText=translations.Support;
        document.getElementById('about').innerText=translations.About;
        document.getElementById('service').innerText=translations.Service;
        document.getElementById('packages').innerText=translations.Packages;
        document.getElementById('getStart').innerText=translations.GetStarted;
        document.getElementById('bookbtn').innerText=translations.BookNow;
        document.getElementById('addis').innerText=translations.Addis;
        document.getElementById('oromia').innerText=translations.Oromia;
        document.getElementById('amhara').innerText=translations.Amhara;
        document.getElementById('somali').innerText=translations.Somali;
        document.getElementById('tigray').innerText=translations.Tigray;
        document.getElementById('harar').innerText=translations.Harar;
        document.getElementById('beni').innerText=translations.Benishangul;
        document.getElementById('gambela').innerText=translations.Gambela;
        document.getElementById('south').innerText=translations.South;
        localStorage.setItem('Language',Lang);
    });
}
document.addEventListener('DOMContentLoaded',()=>{
    const savedLanguage=localStorage.getItem('Language') || 'English';
    document.getElementById('language').value=savedLanguage;
    Language(savedLanguage);
    console.log(savedLanguage);
});
    

function waitForElement(selector, callback) {
    let observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
            observer.disconnect(); // Stop observing once the element is found
            callback(document.querySelector(selector));
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Example usage: Wait for `#userInfo` to be added
waitForElement("customerName", (element) => {
    fetch("http://localhost/TravelCraft/Backend/getUser.php") 
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("User Data:", data); 
    
    element.innerText=`${data.firstName}`;
    
  })
  .catch(error => console.error("Error fetching user data:", error));
});
window.preView=preView;
window.Language=Language;
window.nextView=nextView;
window.mode=mode;
window.search=search;
window.viewOromia=viewOromia;
window.viewAmhara=viewAmhara;
window.Menu=Menu;
window.Exit=Exit;
window.Book=Book;
window.closeForm=closeForm;
UpdateFirst();
UpdateSecond();
UpdateThird();
UpdateFour();
UpdateFive();
UpdateSix();
