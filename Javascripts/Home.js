import { places } from '../Data/favoritePlaces.js';
let currentIndex=0;
function toggle(){
    let a=document.getElementById('theme').value;
    if(a === 'Dark'){
        a='Bright';
        document.getElementById('theme').value='Bright';
        document.querySelector(".modeContainer").style.background="gray";
        document.querySelector(".toggler").style.transform=`translateX(0px)`;
        document.querySelector("body").style.background="#ededed";
        document.querySelector("body").style.color="black";
        document.querySelectorAll(".currentlyOn").forEach((button)=>{
        button.style.color="black";
        });
        localStorage.setItem('Theme',a);
    }else{
        a="Dark";
        document.getElementById('theme').value='Dark';
        document.querySelector(".modeContainer").style.background="cyan";
        document.querySelector(".toggler").style.transform=`translateX(30px)`;
        document.querySelector("body").style.background="black";
        document.querySelector("body").style.color="white";
        document.querySelectorAll(".currentlyOn").forEach((button)=>{
        button.style.color="#ededed";
        });
            localStorage.setItem('Theme',a);
        }
}
function mode(counter){
    if(counter === 'Dark'){
    document.querySelector(".modeContainer").style.background="cyan";
    document.querySelector(".toggler").style.transform=`translateX(30px)`;
    document.querySelector("body").style.background="black";
    document.querySelector("body").style.color="white";
    document.querySelectorAll(".currentlyOn").forEach((button)=>{
    button.style.color="#ededed";
    });
    localStorage.setItem('Theme',counter);
    }
    else{
        document.querySelector(".modeContainer").style.background="gray";
        document.querySelector(".toggler").style.transform=`translateX(0px)`;
        document.querySelector("body").style.background="#ededed";
        document.querySelector("body").style.color="black";
        document.querySelectorAll(".currentlyOn").forEach((button)=>{
        button.style.color="black";
        });
        counter='Bright';
        localStorage.setItem('Theme',counter);
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    const theme=localStorage.getItem('Theme') || 'Bright';
    document.getElementById('theme').value=theme;
    mode(theme);
});
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
});
function search(){
    let query = document.querySelector(".searchBar").value.trim();
     document.querySelector('body').innerHTML=`
     <a href="Home.html" style="position:fixed;top:10px;width:60px;height:30px;left:10px;text-decoration:none;
                                color:grey;font-size:larger;
                                Background:orange;text-align:center;align-content:center;border-radius:20px;">Back</a>
     <div class="tourFormContainer"></div>
     <div class="operationField"></div>`;
        fetch(`../Backend/searchPlace.php?query=${query}`)
        .then(response =>{
            if(!response.ok){
                throw new Error(`${response.status}`);
            }
            return response.text();
        }).then(text=>{
            if(!text){
                throw new Error(`empty response`);
            }
            return JSON.parse(text);
        })
        .then(data => {
            let output = "<h3>Search Results:</h3>";
            if (data.length > 0) {
                data.forEach(user => {
            document.querySelector('.operationField').innerHTML+=`
            <div class="TourContainer">
                <div class="image">
                    <img src="../${user.TourImage}" alt="">
                </div>
                <div class="place">
                    <div class="placeName">${user.TourName}</div>
                    <div class="description">
                        ${user.Descriptions}
                    <div class="price">Price: $${user.TourPrice}</div>
                    <div class="region">region:${user.Region}</div>
                </div>
                <div class="searchTourBookBtn" style="width:100px;height:40px;
                                                    background:blue;color:white;
                                                    position:absolute;bottom:0;
                                                    right:10px;text-align:center;
                                                    align-content:center;
                                                    border-radius:10px;font-size:larger;
                                                    cursor:pointer;" onclick="searchTourBookForm('${user.TourName}','${user.TourPrice}','${user.TourID}')">Book</div>
            </div>
                    
                    `;
                    
                });
            } else {
                document.querySelector('.operationField').innerHTML=`
                    <h1>No Result Found</h1>
                `;
            }
        })
        .catch(error => console.error("Error:", error));
}
function searchTourBookForm(tourName,Price,id){
    document.querySelector('.tourFormContainer').innerHTML=`
        <form id="searchTourBookBtn">
        <h1>Book Tour To ${tourName}</h1>
        <label for="searchTourName" style="width:80%;height:50px;font-size:30px;">
            Tour to:${tourName}
        </label><br>
        <label for="searchTourName" style="width:80%;height:50px;font-size:30px;" class="searchTourPrice">
            Tour Price:$${Price}
        </label><br>
        <input type="hidden" value="${Price}" name="Total">
        <input type="hidden" value="${id}" name="TourID">
        <label for="searchTourDate" style="width:50%;height:30px;position:absolute;right:5%;bottom:100px;">
            Tour Ending Date:<input type="date" id="searchTourDate" name="endingDate" class="endingDate" onchange="calculateTour(${Price})">
        </label><br>
        <label for="searchTourEndDate" style="width:50%;height:30px;position:absolute;left:5%;bottom:100px;">
            Tour Starting Date:<input type="date" id="searchTourEndDate" name="BookedFor" class="BookedFor" onchange="calculateTour(${Price})">
        </label><br>
        <button type="button" value="Book" style="width:70%;height:50px;background:green;
                                                border-radius:20px;position:absolute;bottom:30px;left:15%;
                                                text-align:center;align-content:center;font-size:30px;color:#ededed;
                                                " onclick="sendInfo()">Book</button>
        <label for="Hotel" style="position:absolute;right:5%;top:30%;width:50%;height:30px;">
            Hotel:
            <select name="hotels" id="Hotel">
                <option>No</option>
            </select>
        </label><br>
        <label for="paymentMethod" style="position:absolute;right:5%;top:40%;width:50%;height:30px;">
            paymentMethod:
            <select name="payments" id="paymentMethod">
                <option value="1">Cash</option>
            </select>
        </label>
        <div class="message" style="position:absolute;top:50px;right:40%;color:green;"></div>
        </form>
    
    `;
}
function calculateTour(Price){
    const date1=new Date(document.querySelector('.BookedFor').value);
    const date2=new Date(document.querySelector('.endingDate').value);
    if(!date1 || !date2){
        alert("fill the date");
        return;
    }
    const diffInMillisecond=date2-date1;
    const dayDiff=diffInMillisecond / (1000 * 60 * 60 * 24);
    let value=parseInt(Price);
    const result = dayDiff * value;
    document.querySelector('.searchTourPrice').innerText="Total Cost: $"+result}
function sendInfo(){
    let form=document.getElementById('searchTourBookBtn');
    let data=new FormData(form);
    const date1=document.querySelector('.BookedFor').value;
    const date2=document.querySelector('.endingDate').value;
    if(!date1 || !date2){
        alert("fill the date");
        return;
    }
    fetch("../Backend/book.php",{
        method:"POST",
        body:data
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message === "Please Enter The date"){
            document.querySelector('.message').style.color="red";
            document.querySelector('.message').style.fontSize="30px";
        }
        else if(data.message === "Please Enter Valid Schedule!"){
            document.querySelector('.message').style.color="red";
            document.querySelector('.message').style.fontSize="30px";
        }else{
            document.querySelector('.message').style.color="green";
            document.querySelector('.message').style.fontSize="30px";
        }
        document.querySelector('.message').innerHTML=`${data.message}`;
    }).catch(error => console.error("Error:", error));

}
function displayPlaces(region){
document.querySelector('.displayContainer').innerHTML = "";

fetch(`../Backend/getTourByRegion.php?query=${region}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        if (!text.trim()) {
            throw new Error("Empty response from server");
        }
        return JSON.parse(text);
    })
    .then(data => {
        let output = "";

        if (data.length > 0) {
            data.forEach(place => {
                output += `
            <div class="placeHolder">
            <div class="placeName">
                <div class="description">
                    ${place.Descriptions}
                </div>
                <div class="pricing">
                    <div class="phrase">from</div>
                    <div class="priceAmount">$${place.TourPrice}</div>
                    <button class="bookBtn"  onclick="bookForm('${place.TourName}','${place.TourID}','${place.TourPrice}')">Book</button>
                    <div class="guidContainer">
                    ${place.TourName}</div>
                </div>
            </div>
            <div class="placeImage">
            <img src='../${place.TourImage}' class='places'><img></div>
        </div>
                `;
            });
        } else {
            output = `<h1>Currently There Is NO Tour To ${region}</h1>`;
        }

        document.querySelector('.displayContainer').innerHTML = output;
    })
    .catch(error => console.error("Error fetching data:", error));
}
function bookForm(placeName,Id,Price){
    const form=document.getElementById('bookForm');
    if(form){
        form.remove();
    }
    document.querySelector('body').insertAdjacentHTML('beforeend',`
    <form id="bookForm">
        <h1>Book</h1>
        <label for="Place">
            Place:${placeName}
        </label><br>
        <label for="Place" class="searchTourPrice">
            Weekly Cost:$${Price}
        </label><br>
        <input type="hidden" name="Total" value="${Price}">
        <input type="hidden" name="TourID" value="${Id}">
        <label for="startDate">
            GoingDate:<input type="date" id="startDate" name="BookedFor" class="BookedFor">
        </label><br>
        <label for="endDate">
            EndingDate:<input type="date" id="endDate" name="endingDate" class="endingDate" onchange="calculate2(${Price})">
        </label><br>
        <label for="Hotel">
            Hotel:
            <select name="hotels" id="Hotel">
                <option>Yes</option>
                <option>No</option>
            </select>
        </label><br>
        <label for="paymentMethod">
            paymentMethod:
            <select name="payments" id="paymentMethod">
                <option value="1">Cash</option>
            </select>
        </label>
        <div class="hotelDisplay"></div>
        <button type="button" id="confirmBook" onclick="sendInfo2()">Book</button>
        <div class="exit" onclick="removeForm()">Exit</div>
    </form>
    `);
}
function sendInfo2(){
    let form=document.getElementById('bookForm');
    let data=new FormData(form);
    const date1=document.getElementById('startDate').value;
    const date2=document.getElementById('endDate').value;
    if(!date1 || !date2){
        alert("fill the date");
        return;
    }
    fetch("../Backend/book.php",{
        method:"POST",
        body:data
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message === "Please Enter The date"){
            document.querySelector('.hotelDisplay').style.color="red";
            document.querySelector('.hotelDisplay').style.fontSize="30px";
        }
        else if(data.message === "Please Enter Valid Schedule!"){
            document.querySelector('.hotelDisplay').style.color="red";
            document.querySelector('.hotelDisplay').style.fontSize="30px";
        }else{
            document.querySelector('.hotelDisplay').style.color="green";
            document.querySelector('.hotelDisplay').style.fontSize="30px";
        }
        document.querySelector('.hotelDisplay').innerHTML=`${data.message}`;
    }).catch(error => console.error("Error:", error));

}
function calculateTour2(Price){
    const date1=new Date(document.getElementById('startDate').value);
    const date2=new Date(document.getElementById('endDate').value);
    if(!date1 || !date2){
        alert("fill the date");
        return;
    }
    const diffInMillisecond=date2-date1;
    const dayDiff=diffInMillisecond / (1000 * 60 * 60 * 24);
    let value=parseInt(Price);
    const result = dayDiff * value;
    document.querySelector('.Price').innerText="Total Cost: $"+result}
function removeForm(){
    const form=document.getElementById('bookForm');
    form.remove();
}

function privilege(){
    fetch('../Backend/getUser.php')
    .then(response=> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
    .then(data=>{
        if(data.Privilege =='Blocked'){
        document.querySelector('body').innerHTML=`
            <h1>You Have Been Blocked!</h1>
            <p>Please contact Support Center Call +251912345432</p>
        `;
        }
    }).catch(error => console.log("Error fetching user data:", error));
    
}
privilege();

window.calculateTour2=calculateTour2;
window.sendInfo2=sendInfo2;
window.preView=preView;
window.privilege=privilege;
window.toggle=toggle;
window.bookForm=bookForm;
window.removeForm=removeForm;
window.displayPlaces=displayPlaces;
window.calculateTour=calculateTour;
window.sendInfo=sendInfo;
window.searchTourBookForm=searchTourBookForm;
window.Language=Language;
window.nextView=nextView;
window.mode=mode;
window.search=search;
window.viewOromia=viewOromia;
window.viewAmhara=viewAmhara;
window.Exit=Exit;
window.Book=Book;
window.closeForm=closeForm;
UpdateFirst();
UpdateSecond();
UpdateThird();
UpdateFour();
UpdateFive();
UpdateSix();
