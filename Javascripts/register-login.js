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
display();