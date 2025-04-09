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
                <div style="width:45%;height:400px;">
                <h1>${find}</h1><br>
                <div class="favorites "><a href='favorite.html'><image src="${place.aboutPlace.image}" style="width:300px;height:400px;border-radius:20px;float:right;"></image></a></div>
                <div class="favDetail">${place.aboutPlace.discription}</div>
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
function viewOromia(){
    document.querySelector('body').style.background='url(../images/Awash-park-5.jpg)';
    document.querySelector('body').style.backgroundAttachment='fixed';

    document.querySelector('body').innerHTML=`
                <a href='Home.html' style="color:white;"><h2>Back</h2></a>

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
window.preView=preView;
window.nextView=nextView;
window.mode=mode;
window.search=search;
window.viewOromia=viewOromia;
window.viewAmhara=viewAmhara;


UpdateFirst();
UpdateSecond();
UpdateThird();
UpdateFour();
UpdateFive();
UpdateSix();
