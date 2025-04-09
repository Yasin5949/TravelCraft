import { places } from "../Data/favoritePlaces.js";
let currentIndex=0;

let ThemeMode=0;
function mode(){
    if(ThemeMode===0){
        document.querySelector(".mode").style.background="snow";
        document.querySelector("body").style.background="#13141d";
        document.querySelector(".next").style.background="snow";
        document.querySelector(".prev").style.background="snow";
        document.querySelector(".modeTwo").style.background="#13141d";
        document.querySelector(".bottomNav").style.background="#c6effe";
        document.querySelector(".containerOne").style.background="#b3ff7d";
        document.querySelector(".containerTwo").style.background="#b3ff7d";
        document.querySelector(".topNav").style.background="#b3ff7d";
        document.querySelector(".modeTwo").style.background="#13141d";
        document.querySelector(".betterCafe").style.background="#ededed";

        ThemeMode=1;
    }
    else{
        document.querySelector(".mode").style.background="black";
        document.querySelector("body").style.background="#9188c6";
        document.querySelector(".next").style.background="black";
        document.querySelector(".prev").style.background="black";
        document.querySelector(".modeTwo").style.background="#9188c6";
        document.querySelector(".bottomNav").style.background="#b3ff7d";
        document.querySelector(".containerOne").style.background="#c6effe";
        document.querySelector(".containerTwo").style.background="#c6effe";
        document.querySelector(".topNav").style.background="#c6effe";
        document.querySelector(".betterCafe").style.background="#13141d";
        
        ThemeMode=0;
    }
}
function active(){
    let accumulator=document.querySelectorAll(".nav");
    accumulator.forEach((acumulator)=>{
        acumulator.classList.remove("active");
    })
}
document.querySelector('.next').addEventListener('click',()=>{
    currentIndex=currentIndex + 1;
    if(currentIndex === 6){
        currentIndex = 0;
    }
    document.querySelector(".containerTwo").innerHTML=`
            <div class="imageContainer">
            <image src="${places[currentIndex].aboutPlace.image}" class="image" id="zoomIn">
            </image>
            <div class="zoom">
                <div class="socialMedia"><image src="../images/tiktok.png" class="images" id="tiktok"></image></div>
                <div class="socialMedia"><image src="../images/linkdin.png" class="images" id="linkdin"></image></div>
                <div class="socialMedia"><image src="../images/instagram.webp" class="images " id="instagram"></image></div>
                <div class="socialMedia"><image src="../images/facebook.png" class="images" id="facebook"></image></div>
            </div>
        
        </div>
        `;
        document.querySelector(".innerContainer").innerHTML=`
                <h1 style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;font-size: 50px;">${places[currentIndex].aboutPlace.placeName}</h1>
                <p style="font-size: larger;">${places[currentIndex].aboutPlace.discription}</p>
        `;

})
document.querySelector('.prev').addEventListener('click',()=>{
    currentIndex=currentIndex - 1;
    if(currentIndex === -1){
        currentIndex = 5
    }
    document.querySelector(".containerTwo").innerHTML=`
            <div class="imageContainer">
            <image src="${places[currentIndex].aboutPlace.image}" class="image" id="zoomIn">
            </image>
            <div class="zoom">
                <div class="socialMedia"><image src="../images/tiktok.png" class="images" id="tiktok"></image></div>
                <div class="socialMedia"><image src="../images/linkdin.png" class="images" id="linkdin"></image></div>
                <div class="socialMedia"><image src="../images/instagram.webp" class="images " id="instagram"></image></div>
                <div class="socialMedia"><image src="../images/facebook.png" class="images" id="facebook"></image></div>
            </div>
        
        </div>
        `;
        document.querySelector(".innerContainer").innerHTML=`
                <h1 style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;font-size: 50px;">ABAY RIVER</h1>
                <p style="font-size: larger;">${places[currentIndex].aboutPlace.discription}</p>
        `;

})
document.querySelectorAll(".nav").forEach((nav)=>{
    nav.addEventListener('click',()=>{
        nav.classList.add('active');
        if(nav.classList.contains("Animal")){
        document.querySelector(".containerTwo").innerHTML=`
            <div class="display">
                <image src="${places[currentIndex].animals.image}"></image>
            </div>
        `;
        document.querySelector(".innerContainer").innerHTML=``;
    }
    if(nav.classList.contains("location")){
        document.querySelector(".containerTwo").innerHTML=`
            <div class="imageContainer">
            <image src="${places[currentIndex].aboutPlace.image}" class="image" id="zoomIn">
            </image>
            <div class="zoom">
                <div class="socialMedia"><image src="../images/tiktok.png" class="images" id="tiktok"></image></div>
                <div class="socialMedia"><image src="../images/linkdin.png" class="images" id="linkdin"></image></div>
                <div class="socialMedia"><image src="../images/instagram.webp" class="images " id="instagram"></image></div>
                <div class="socialMedia"><image src="../images/facebook.png" class="images" id="facebook"></image></div>
            </div>
        
        </div>
        `;
        document.querySelector(".innerContainer").innerHTML=`
                <h1 style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;font-size: 50px;">ABAY RIVER</h1>
                <p style="font-size: larger;">${places[currentIndex].aboutPlace.discription}</p>
        `;


    }
    if(nav.classList.contains("Rating")){
        document.querySelector(".innerContainer").innerHTML=`
        <h1 style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;font-size: 50px;">Rate Us</h1>
                <div class="rating">
                    <div class="ratings one" onclick="rating();"></div>
                    <div class="ratings two" onclick="rating();"></div>
                    <div class="ratings three" onclick="rating();"></div>
                    <div class="ratings four" onclick="rating();"></div>
                    <div class="ratings five" onclick="rating();"></div><br>
                    <label class="rateNumber" style="font-size:25px;"></label>
                </div>
                <p style="font-size:larger;">you can rate us based on the exeperiance you had in this place if you have been there before! </p>
                <textarea placeholder="leave a comment" style="text-align:center;width:60%;height:20%;font-size:25px;"></textarea>
                <button style="width:60%;
                height:30px;font-size:larger;color:white;
                background-color:green;
                border:none;
                border-radius:20px;">Send</button>
        `;
        document.querySelector(".containerTwo").innerHTML=`
        <div class="messageContainer">
                <div class="messagePanel">
                    <div class="commentor"></div>
                    <div class="message"></div>
                </div>
                <div class="messagePanel">
                    <div class="commentor"></div>
                    <div class="message"></div>
                </div>
                <div class="messagePanel">
                    <div class="commentor"></div>
                    <div class="message"></div>
                </div>
                <div class="messagePanel">
                    <div class="commentor"></div>
                    <div class="message"></div>
                </div>
             
            </div>
        `;

    }
    });
});
function rate(){
    let rate=document.querySelectorAll(".ratings");
    rate.forEach((rate)=>{
        rate.classList.remove('rated');
    })
    
}
function rating(){
document.querySelectorAll(".ratings").forEach((rating)=>{
    rating.addEventListener('click',()=>{
        if(rating.classList.contains("one")){
            rate();
            rating.classList.add("rated");
            document.querySelector(".rateNumber").innerHTML=`1`;
        }
        if(rating.classList.contains("two")){
            rate();
            document.querySelector(".rateNumber").innerHTML=`2`;
            document.querySelector(".one").classList.add("rated");
            rating.classList.add("rated");
        }
        if(rating.classList.contains("three")){
            rate();
            document.querySelector(".rateNumber").innerHTML=`3`;
            document.querySelector(".one").classList.add("rated");
            document.querySelector(".two").classList.add("rated");

            rating.classList.add("rated");
        }
        if(rating.classList.contains("four")){
            rate();
            document.querySelector(".rateNumber").innerHTML=`4`;
            document.querySelector(".one").classList.add("rated");
            document.querySelector(".two").classList.add("rated");
            document.querySelector(".three").classList.add("rated");
            rating.classList.add("rated");
        }
        if(rating.classList.contains("five")){
            rate();
            document.querySelector(".rateNumber").innerHTML=`5`;
            document.querySelector(".one").classList.add("rated");
            document.querySelector(".two").classList.add("rated");
            document.querySelector(".three").classList.add("rated");
            document.querySelector(".four").classList.add("rated");
            rating.classList.add("rated");
        }
    })
})}
function removeIndex(){
    document.querySelectorAll(".frames").forEach((frame)=>{
        frame.classList.remove("lookInClose");
        frame.style.zIndex="0";
    })
}
window.active=active;
window.rating=rating;

