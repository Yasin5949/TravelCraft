function addPlace(){
    document.querySelector('.operationField').innerHTML=`
    <form action="../Backend/addPlace.php" method="POST" id="addTour" enctype="multipart/form-data">
                <h1>Add Tour</h1>
                <label for="TourName">
                    Tour Name:<input type="text" id="TourName" name="TourName">
                </label><br>
                <label for="Dscription">
                    Description:<br><textarea id="Dscription" name="Description"></textarea>
                </label><br>
                <label for="TourImage">
                    Upload Image:<input type="file" id="TourImage" name="TourImage">
                </label><br>
                <label for="Price">
                    Price:<input type="number" id="Price" name="Price" step="0.01" min="0">
                </label><br>
                </label>
                Region:
                <select id="region" name="Region">
                    <option value=""></option>
                    <option value="Oromia">Oromia</option>
                    <option value="Amhara">Amhara</option>
                    <option value="Tigray">Tigray</option>
                    <option value="Somali">Somali</option>
                    <option value="Afar">Afar</option>
                    <option value="Harari">Harari</option>
                    <option value="Gambela">Gambela</option>
                    <option value="Benishangul">Benishangul</option>
                    <option value="South People">South People</option>
                    </select>
                    </label><br>
                <input type="submit" value="ADD" id="addBtn">
            </form>
    `;
}
function Search() {
    let query = document.getElementById("search").value.trim();
    let mode=document.querySelector("input[name='type']:checked").value;
    if(query == ""){
        alert("Enter " + mode + " Name to Search");
        return;
    }
    if(mode === 'User'){
        let output='';
        let method;
    document.querySelector('.operationField').innerHTML=``;
    fetch(`../Backend/searchUser.php?query=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(user => {
                    if(user.Privilege === 'Blocked'){
                        method=`
                            <div class="delete" style="background:green;" onclick="unBlock(${user.UserID})">UnBlock</div>    
                        `
                    }else{
                        method=`<div class="delete" onclick="Block(${user.UserID})">Block</div>`;
                    }
                    output+=`
                    <div class="searchUser">
                <div class="userProfile">
                    <img src="../${user.ProfilePicture}" alt="">
                </div>
                <div class="userDetails">
                    <div class="userName">${user.firstName} ${user.lastName}</div>
                    <div class="created">Joined On: ${user.CreatedAt}</div>
                    <div class="email">E-mail: ${user.Email}</div>
                </div>
                <div class="viewBooking">
                    <div class="view view${user.UserID}" onclick="bookedTours('${user.UserID}')">View</div>
                    ${method}
                </div>
            </div>
            <div class="userInfo" id="${user.UserID}"></div>
                    `;
                });
            } else {
                output += `<p>User  with ${query} firstName Not found.</p>`;
            }
            document.querySelector('.operationField').innerHTML=output;
        }).catch(error => console.log("Error:", error));
    }else if(mode === "Place"){
        document.querySelector('.operationField').innerHTML=``;
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
                        ${user.Description}
                    <div class="price">Price: $${user.TourPrice}</div>
                    <div class="region">region:${user.Region}</div>
                </div>
                <button style="width:100px;height:40px;background:red;
                                color:#ededed; border:none;position:absolute;
                                bottom:0;right:20px;
                                border-radius:10px;" onclick="deletePlace('${user.TourID}')">Delete</button>
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
    }else{
        alert('duhhhhh');
    }
}
function Block(id){
    fetch(`../Backend/Block.php?query=${id}`)
    .then(response=>response.json())
    .then(data=>{
        alert(data.message);
    }).catch(error=>console.log(error));
}
function view(){
    document.querySelector('.userDetail').innerHTML=`
                <button onclick="getUserBooking()">User Booking</button>
                <button onclick="getUserCanceledBooking()">User's Canceled Booking</button>
                <button>User Info</button>
    `;
}
function blockedUser(){
    let output='';
    document.querySelector('.operationField').innerHTML=``;
    fetch(`../Backend/getBlockedUsers.php`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(user => {
                    if(user.Privilege == 'Blocked'){
                    document.querySelector('.operationField').innerHTML+=`
                    <div class="blockedUsers">
                <div class="nameContainer">
                    <div class="name">${user.firstName} ${user.lastName}</div>
                    <div class="email">${user.Email}</div>
                </div>
                <div class="imageContainer">
                    <img src="../${user.ProfilePicture}" alt="">
                </div>
                <div class="unBlockBtn" onclick="unBlock(${user.UserID})">UnBlock</div>
            </div>
                    `;
                }
            
                });
            }else{
                output=`<h1>No Blocked User!</h1>`
            }
        });
        document.querySelector('.operationField').innerHTML=output;
}
function unBlock(id){
    fetch(`../Backend/unBlock.php?query=${id}`)
    .then(response=>response.json())
    .then(data=>{
        alert(data.message);
        blockedUser();
    }).catch(error=>console.log(error));
}
function viewPlace(){
document.querySelector('.operationField').innerHTML = "";

fetch('../Backend/displayPlaces.php')
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
                    <div class="TourContainer">
                        <div class="image">
                            <img src="../${place.TourImage}" alt="${place.TourName}">
                        </div>
                        <div class="place">
                            <div class="placeName">${place.TourName}</div>
                            <div class="description">${place.Descriptions}</div>
                            <div class="price">Price: $${place.TourPrice}</div>
                            <div class="region">Region: ${place.Region}</div>
                        </div>
                    </div>
                `;
            });
        } else {
            output = `<h1>No Result Found</h1>`;
        }

        document.querySelector('.operationField').innerHTML = output;
    })
    .catch(error => console.error("Error fetching data:", error));
}
let messageCount=0;
function callRequest(){
    fetch('../Backend/callBackRequest.php')
    .then(response=>response.json())
    .then(data=>{
        if(data.message){
            document.querySelector('.newMessage').innerHTML=``;
            document.querySelector('.newMessage').style.background=`transparent`;
            messageCount=0;
        }else{
            data.forEach(request=>{
                messageCount+=1;
                document.querySelector('.newMessage').style.background=`red`;
                document.querySelector('.newMessage').innerHTML=messageCount;

            })
        }
    })
}
callRequest();
function getRequest(){
    document.querySelector('.operationField').innerHTML=``;
    let response='';
    fetch('../Backend/getRequest.php',{
        method:"POST"
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.message){
            document.querySelector('.operationField').innerHTML=`<h1>No Request Found</h1>`;
        }else{
            data.forEach(request=>{
                response+=`
                <div class="requestContainer">
                <div class="profile">
                    <img src="../${request.ProfilePicture}" alt="">
                </div>
                <div class="reason">
                    <div class="reasonText">${request.Reason}</div>
                    <div class="requestedAt">Requested At: ${request.RequestedAt}</div>
                </div>
                <div class="phoneNumber">PhoneNumber: +251${request.PhoneNumber}</div>
                    <div class="responded" onclick="respond(${request.RequestID})">Responded</div>
                </div>
                `;

            })
        }
    document.querySelector('.operationField').innerHTML=response;
    })
}
function respond(id){
    id=parseInt(id);
    fetch(`../Backend/responded.php?query=${id}`)
    .then(response=>response.json())
    .then(data=>{
        if(data.message){
            alert(data);
            callRequest();
            getRequest();
        }else{
            
        }
    })
}
function toggle(){
    let a=document.getElementById('adminTheme').value;
    if(a === 'Dark'){
        a='Bright';
        document.getElementById('adminTheme').value='Bright';
        document.querySelector(".modeContainer").style.background="gray";
        document.querySelector(".toggler").style.transform=`translateX(0px)`;
        document.querySelector("body").style.background="#ededed";
        document.querySelector("body").style.color="black";
        document.querySelectorAll(".currentlyOn").forEach((button)=>{
        button.style.color="black";
        });
        localStorage.setItem('adminTheme',a);
    }else{
        a="Dark";
        document.getElementById('adminTheme').value='Dark';
        document.querySelector(".modeContainer").style.background="cyan";
        document.querySelector(".toggler").style.transform=`translateX(30px)`;
        document.querySelector("body").style.background="black";
        document.querySelector("body").style.color="white";
        document.querySelectorAll(".currentlyOn").forEach((button)=>{
        button.style.color="#ededed";
        });
            localStorage.setItem('adminTheme',a);
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
    localStorage.setItem('adminTheme',counter);
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
        localStorage.setItem('adminTheme',counter);
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    const theme=localStorage.getItem('adminTheme') || 'Bright';
    document.getElementById('adminTheme').value=theme;
    mode(theme);
});
function canceledBooking(){
    let canceledFound=false;
    document.querySelector('.operationField').innerHTML="";
    let result="";
    fetch('../Backend/allBookedHistory.php')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(user=>{ 
        if(user.BookingStatus === 'Canceled'){
        result+=`
        <div class="canceledContainer">
          
            <div class="canceledImageContainer" >
                <img src="../${user.TourImage}" alt="${user.TourName}">
            </div>
            <div class="canceledPlaceName">
                ${user.TourName}
                <p style="font-size:large;">Canceled By ${user.firstName}</p>
            </div>
            <div class="canceledLabel">
                Booked ON
            </div>
            <div class="canceledDate">
                ${user.BookedAt}
            </div>
            
        </div>
    `; canceledFound=true;
        }
    });
    document.querySelector('.operationField').innerHTML=result;
    if(!canceledFound){
        document.querySelector('.operationField').innerHTML=`<h1>You Have No Canceled Booking</h1>`;
    }
    })   .catch(error => console.error("Error:", error));

}
function BookedBooking(){
    let canceledFound=false;
    document.querySelector('.operationField').innerHTML="";
    let result="";
    fetch('../Backend/allBookedHistory.php')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(user=>{ 
        if(user.BookingStatus === 'Pending'){
        result+=`
        <div class="canceledContainer">
            <div class="canceledImageContainer" >
                <img src="../${user.TourImage}" alt="${user.TourName}">
            </div>
            <div class="canceledPlaceName">
                ${user.TourName}
                <p style="font-size:large;">Booked By ${user.firstName}</p>
            </div>
            <div class="canceledLabel">
                Booked ON
            </div>
            <div class="canceledDate">
                ${user.BookedAt}
            </div>
            
        </div>
    `; canceledFound=true;
        }
    });
    document.querySelector('.operationField').innerHTML=result;
    if(!canceledFound){
        document.querySelector('.operationField').innerHTML=`<h1>There Is No Pending Booked Tour</h1>`;
    }
    })   .catch(error => console.error("Error:", error));

}
function bookedTours(id){
    let selector="view"+id;
    let action=document.querySelector(`.${selector}`);
    if(action.innerText === 'Close'){
        document.getElementById(`${id}`).innerHTML='';
        action.innerText = 'view';
        action.style.background="blue";
    }else{
        action.innerText='Close';
        action.style.background="orange";
    fetch(`../Backend/getUserHistory.php?query=${id}`)
    .then(response=>response.json())
    .then(data=>{
        document.getElementById(`${id}`).innerHTML=``;
        if(data.length > 0){
            data.forEach(user=>{
            document.getElementById(`${id}`).innerHTML+=`
                    <div class="bookedContainer">
            <div class="bookedImage">
                <img src="../${user.TourImage}" alt="">
            </div>
            <div class="detailContainer">
                <div id="bookingStatus">${user.BookingStatus}</div>
                <div class="nameContainer">${user.TourName}</div>
                <div class="bookedOn">Booked On: ${user.BookedAt}</div>
                <div class="bookedFor">Booked For: ${user.BookedFor}</div>
                <div class="endOn">End On: ${user.EndingDate}</div>
            </div>
        </div>
            `;
            })
        }else{
            document.getElementById(`${id}`).innerHTML=`<h1>No Booking Found</h1>`
        }
    })   .catch(error => console.log("Error:", error));
    }   
}
function calculate(){
    let canceled=0;
    let booked=0;
    let total=0;
    fetch('../Backend/allBookedHistory.php')
    .then(response=>response.json())
    .then(data =>{
        if(data.message){
    document.querySelector('.report').innerHTML=data.message;
        }else{
                data.forEach(user=>{
                    total+=parseInt(user.Total);
                    if(user.BookingStatus === 'Pending'){
                        booked+=parseInt(user.Total);
                    }else if(user.BookingStatus === 'Canceled'){
                        canceled+=parseInt(user.Total);
        }
    });
    document.querySelector('.report').innerHTML=`
            <div class="total">Booked : $${total}</div>
            <div class="canceled">Canceled : -$${canceled}</div>
            <div class="earned">Earned: +$${booked}</div>
    `;
        }
    }).catch(error => console.error("Error:", error));

}
let menuIndicator=0;
function menu(){
    if(menuIndicator === 0){
    document.querySelector('.menu').innerHTML=`
        <button onclick="newAdmin()">New Admin</button>
        <button onclick="change()">Change Password</button>
        <button onclick="logOut()">logOut</button>
    `;
    menuIndicator=1;
    }else{
    document.querySelector('.menu').innerHTML=``
    menuIndicator=0;
    }
}
function exit(){
    let form=document.getElementById('newAdmin');
    let form2=document.getElementById('changePassword');
    if(form || form2){
        if(form){
        form.remove()
        }else{
        form2.remove();
        }
    }
}
function newAdmin(){
    const form=document.getElementById('changePassword');
    if(form){
        form.remove();
    }
    const formD=document.getElementById('newAdmin');
    if(formD){
        formD.remove();
    }
    document.querySelector('.menu').innerHTML=``;
    document.querySelector('body').insertAdjacentHTML('beforeend',`
    <form id="newAdmin">
        <h1>Change Admin</h1>
        <div class="exit" onclick="exit()">Exit</div>
        <label for="firstName">
            First Name:<input type="text" id="firstName" name="firstName">
        </label>
        <label for="lastName">
            Last Name:<input type="text" id="lastName" name="lastName">
        </label>
        <label for="password">
            password:<input type="password" id="password" name="password">
        </label>
        <label for="confirm">
            confirm Password:<input type="password" id="confirm" name="confirm">
        </label>
        <label for="old">
            Old Admin Password<input type="password" id="old" name="oldAdmin">
        </label>
        <button type="button" onclick="changeAdmin()">Change</button>
    </form>
    `);
}
function change(){
    const form=document.getElementById('newAdmin');

    if(form){
        form.remove();
    }
    const formD=document.getElementById('changePassword');
    if(formD){
        formD.remove();
    }
    document.querySelector('.menu').innerHTML=``;
    document.querySelector('body').insertAdjacentHTML('beforeend',`
    <form id="changePassword">
        <h1>Change Password</h1>
        <div class="exit" onclick="exit()">Exit</div>
        <label for="new">
            New Password:<input type="password" id="new" name="password">
        </label>
        <label for="conirmPass">
            Confirm New Password:<input type="password" id="confirmPass" name="confirm">
        </label>
        <label for="oldPassword">
            Old Password:<input type="password" id="oldPassword" name="oldPassword">
        </label>
        <button type="button" onclick="changePassword()">Change</button>
    </form>
    `);
}
function changeAdmin(){
    let form=document.getElementById('newAdmin');
    let formData=new FormData(form);
    fetch('../Backend/newAdmin.php',{
        method:"POST",
        body:formData
    }).then(response=>response.json())
    .then(data=>{
        if(data.Changed){
            alert("Admin Changed!");
            window.location.href='adminLogin.html';
        }else if(data.misMatch){
            alert("password Don't match")
        }else{
            alert(data.notAdmin);
        }
    }).catch(error => {
    alert("Failed to connect to the server!");
});

}
function changePassword(){
    let form =document.getElementById('changePassword');
    let formData=new FormData(form);
    fetch('../Backend/changeAdminPassword.php',{
        method:"POST",
        body:formData
    }).then(response=>response.json())
    .then(data=>{
        if(data.Changed){
            alert(data.Changed);
        }else if(data.misMatch){
            alert(data.misMatch)
        }else{
            alert(data.notAdmin);
        }
    })
}
function logOut(){
    window.location.href='adminLogin.html';
}
calculate();
