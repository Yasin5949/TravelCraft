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
function changeLang(Lang){
    fetch(`../translations/${Lang}.json`)
    .then(response => response.json())
    .then(translations => {
        document.getElementById('home').innerText=translations.Home;
        document.getElementById('service').innerText=translations.Service;
        document.getElementById('support').innerText=translations.Support;
        document.getElementById('about').innerText=translations.About;
        document.getElementById('book').innerText=translations.Book;
        document.getElementById('booked').innerText=translations.Booked;
        document.getElementById('cancel').innerText=translations.CancelBook;
        document.getElementById('canceled').innerText=translations.CanceledBooking;
        document.getElementById('refund').innerText=translations.ReFund;
        document.getElementById('terms').innerText=translations.Terms;
        localStorage.setItem('Language',Lang);
    })
};
const savedLanguage=localStorage.getItem('Language') || 'English';
changeLang(savedLanguage);

function displayPlaces(){
document.querySelector('.displayContainer').innerHTML = "";

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
            output = `<h1>No Result Found</h1>`;
        }

        document.querySelector('.displayContainer').innerHTML = output;
    })
    .catch(error => console.log("Error fetching data:", error));
}
function bookForm(placeName,Id,Price){
    const form=document.getElementById('bookForm');
    if(form){
        form.remove();
    }
    document.querySelector('body').insertAdjacentHTML('beforeend',`
    <form id="bookForm">
        <h1>Book</h1>
        <label for="Place" >
            Place:${placeName}
        </label><br>
        <label for="Place" class="Price">
            Daily Cost:$${Price}
        </label><br>
        <input type="hidden" name="Total" value="${Price}">
        <input type="hidden" name="TourID" value="${Id}">
        <label for="startDate">
            GoingDate:<input type="date" id="startDate" name="BookedFor">
        </label><br>
        <label for="endDate">
            EndingDate:<input type="date" id="endDate" name="endingDate" onchange="calculateTour(${Price})">
        </label><br>
        <label for="Hotel">
            Hotel:
            <select name="hotels" id="Hotel">
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
        <button type="button" id="confirmBook" onclick="sendInfo()">Book</button>
        <div class="exit" onclick="removeForm()">Exit</div>
    </form>
    `);
}
function calculateTour(Price){
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
function sendInfo(){
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
function removeForm(){
    const form=document.getElementById('bookForm');
    form.remove();
}
function canceledBooking(){
    let canceledFound=false;
    document.querySelector('.displayContainer').innerHTML="";
    let result="";
    fetch('../Backend/bookingHistory.php')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(user=>{ 
        if(user.BookingStatus === 'Canceled'){
        result+=`
        <div class="canceledContainer">
            <div class="detailsMenu" onclick="viewDetail('${user.BookingID}')">
                View
            </div>
            <div class="canceledImageContainer" >
                <img src="../${user.TourImage}" alt="${user.TourName}">
            </div>
            <div class="canceledPlaceName">
                ${user.TourName}
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
    document.querySelector('.displayContainer').innerHTML=result;
    if(!canceledFound){
        document.querySelector('.displayContainer').innerHTML=`<h1>You Have No Canceled Booking</h1>`;
    }
    })   .catch(error => console.error("Error:", error));

}
let viewed=1;
function viewDetail(id){
    id=parseInt(id,10);
document.querySelectorAll('.detailsMenu').forEach(menu=>{
    menu.addEventListener('click',()=>{
    let container = menu.parentElement;
    fetch(`../Backend/getReason.php?query=${id}`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
    if(viewed === 0){
        container.style.height="150px";
        menu.innerText='view';
                viewed=1;
        document.getElementById('reason').remove();
    }
    else{
    menu.innerText='Close';
    container.style.height='400px';

    data.forEach(user=>{
                container.innerHTML+=`
                <div class="reason" style="color:#ededed;" id="reason">${user.Reason}</div>
                    `;
                    viewed=0;
                
            })
            
            
        
    
    }
    })
    });
});
}
function terms(){
    document.querySelector('.displayContainer').innerHTML=`
        <h1>Terms and Conditions</h1>

    <h2>1. Introduction</h2>
    <p>Welcome to <strong>TravelCraft</strong>. These Terms and Conditions ("Terms") govern your use of our website <strong>www.TravelCraft.com</strong> and any services offered through it. By accessing or using our website, you agree to comply with these Terms. If you do not agree with any part of these Terms, you must refrain from using our services.</p>

    <h2>2. Definitions</h2>
    <ul>
        <li><strong>"User", "You", "Your"</strong> refers to anyone visiting or using our website.</li>
        <li><strong>"Service"</strong> refers to the tours, experiences, and related offerings provided by us.</li>
        <li><strong>"Booking"</strong> refers to reservations made through our website or affiliated platforms.</li>
        <li><strong>"Third-party providers"</strong> refers to suppliers or partners who facilitate certain aspects of the tour services.</li>
    </ul>

    <h2>3. Booking and Payment</h2>
    <ul>
        <li>3.1. All bookings must be made through our website.</li>
        <li>3.2. You must provide accurate information during the booking process.</li>
        <li>3.3. Payment must be completed at the time of booking, unless otherwise stated.</li>
        <li>3.4. We accept payment methods such as credit cards, PayPal, and other specified payment processors.</li>
        <li>3.5. Prices listed on our website are subject to change without notice.</li>
    </ul>

    <h2>4. Cancellation and Refund Policy</h2>
    <ul>
        <li>4.1. Cancellations made <strong>one week</strong> before the scheduled tour may qualify for a full or partial refund, subject to our cancellation policy.</li>
        <li>4.2. Late cancellations and no-shows may not be eligible for refunds.</li>
        <li>4.3. In case of unforeseen circumstances, such as weather conditions or force majeure, we reserve the right to reschedule or cancel a tour. In such cases, refunds or rescheduling options will be provided.</li>
    </ul>

    <h2>5. User Responsibilities</h2>
    <ul>
        <li>5.1. You must ensure you meet all health and fitness requirements for the tour.</li>
        <li>5.2. You are responsible for complying with local laws and regulations at the destination.</li>
        <li>5.3. Misconduct, damage to property, or inappropriate behavior during a tour may result in termination of your participation without a refund.</li>
    </ul>

    <h2>6. Liability and Disclaimers</h2>
    <ul>
        <li>6.1. We strive to provide accurate tour descriptions, but we do not guarantee that all information on our website is error-free.</li>
        <li>6.2. We are not liable for any injuries, losses, or damages incurred during the tour unless caused by our negligence.</li>
        <li>6.3. We are not responsible for delays, cancellations, or disruptions caused by third-party providers or external factors.</li>
    </ul>

    <h2>7. Intellectual Property</h2>
    <ul>
        <li>7.1. All content, images, trademarks, and logos on our website are the property of <strong>TravelCraft</strong> and cannot be used without our permission.</li>
        <li>7.2. Users may not reproduce, distribute, or modify any content from our website without authorization.</li>
    </ul>

    <h2>8. Privacy Policy</h2>
    <ul>
        <li>8.1. Your personal information will be collected and used in accordance with our Privacy Policy.</li>
        <li>8.2. We take appropriate measures to protect your data but cannot guarantee absolute security.</li>
    </ul>

    <h2>9. Changes to Terms</h2>
    <ul>
        <li>9.1. We reserve the right to update or modify these Terms at any time. Changes will be posted on our website.</li>
        <li>9.2. Continued use of our website after changes are made constitutes acceptance of the updated Terms.</li>
    </ul>

    <h2>10. Governing Law</h2>
    <ul>
        <li>10.1. These Terms are governed by the laws of <strong>[Your Country/State]</strong>.</li>
        <li>10.2. Any disputes arising under these Terms shall be resolved in the courts of <strong>[Your Jurisdiction]</strong>.</li>
    </ul>

    <h2>11. Contact Information</h2>
    <p>If you have any questions about these Terms, please contact us at <strong>Support@eth.TravelCraft.com</strong> or <strong>+251925252525</strong>.</p>


    `;
}
let a=document.querySelector('.customerName');
if(a){
console.log(a);
}
function getUser(){
fetch("../Backend/getUser.php") 
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
  .then(data => {
    document.getElementById('servisProfile').innerHTML+=`
    <div class="profileInService" >
                    <img src="../${data.ProfilePicture}" alt="">
    </div>
        <h1>${data.firstName}</h1>
        <p>${data.Email}</p>
    `;
    if(a){
        console.log(a);
        a.innerHTML=`${data.firstName}`
    }
  }).catch(error => console.log("Error fetching user data:", error));
}
function getBooking(){
fetch("../Backend/bookingHistory.php")
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      document.querySelector(".displayContainer").innerHTML = `<h2>No bookings found. You haven't made any reservations yet.</h2>`;
      return;
    }

    console.log("Booking History:", data.bookings); 

    let bookingHTML = "<h2>Booking History</h2><ul>";
    data.bookings.forEach(booking => {
      bookingHTML += `
        <li>
          <strong>Booking ID:</strong> ${booking.bookingID} <br>
          <strong>Destination:</strong> ${booking.destination} <br>
          <strong>Date:</strong> ${booking.bookingDate} <br>
          <strong>Status:</strong> ${booking.status} <br>
        </li><hr>
      `;
    });
    bookingHTML += "</ul>";

  })
  .catch(error => console.error("Error fetching booking history:", error));
}
getUser()
function changeProfile(){
    let newProfile=document.querySelector('.changeProfile');
    let formData=new FormData(newProfile);
    let Profile=document.querySelector('.profile').value;
    fetch("../Backend/handleProfileChange.php",{
        method:"POST",
        body:formData
    }).then(
        response=>response.text()
    ).then(data=>{
        if(!data.error){
            console.log(Profile)
                    document.querySelector(".profile").innerHTML=`
                <img src="../UserPicture/${Profile}" alt="">
                <form class="changeProfile">
                <input type="file" id="profile" name="userProfile">
                </form>
                <div class="confirm" onclick="accountManage()">Change</div>
            
        `;
        }

    })
    .catch(error=>console.log(error));

}
function accountManage(){
    fetch("../Backend/getUser.php")
    .then(response=>
        {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }
    )
    .then(data=>{
        document.querySelector('.displayContainer').innerHTML=`
        <div class="profileContainer">
            <div class="profile">
                <img src="../${data.ProfilePicture}" alt="">
            <form class="changeProfile">
                <input type="file" id="profile" name="userProfile">
            </form>
            <div class="confirm" onclick="changeProfile()">Change</div>
            </div>
        </div>
        <div class="userInfo">
            <label for="firstName">
                fistName:<div class="firstName" id="fistName">${data.firstName}</div>
            </label>
            <label for="">
                lastName:<div class="firstName" id="fistName">${data.lastName}</div>
            </label>
            <label for="firstName">
                Email:<div class="firstName" id="fistName">${data.Email}</div>
            </label>
        </div>
        <div id="Logout" onclick="logOut()">Log-OUt</div>
        `;
    })
}
function logOut(){
     fetch("../Backend/LogOut.php", {
        method: "POST"
    })
    .then(response => response.json())

    .then(data => {
        if (data.success) {
            window.location.href = "login.html"; 
            
        }else{
            alert("Logout failed: " + data.error);
        }
    })

    .catch(error => console.error("Error:", error));
}
function bookedTours(){
    fetch("../Backend/bookingHistory.php")
    .then(response=>response.json())
    .then(data=>{
        document.querySelector('.displayContainer').innerHTML=``;
        if(data.length > 0){
            data.forEach(user=>{
            document.querySelector('.displayContainer').innerHTML+=`
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
            document.querySelector('.displayContainer').innerHTML=`<h1>No Booking Found</h1>`
        }
    })    .catch(error => console.error("Error:", error));

}
function cancelBooking(){
    document.querySelector('.displayContainer').innerHTML="";
    let result="";
    fetch('../Backend/bookingHistory.php')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(user=>{
        if(user.BookingStatus === "Pending"){
        result+=`
        <form class="cancelContainer" id="cancelContainer">
            <div class="imageToCancel">
                <img src="../${user.TourImage}" alt="">
            </div>
            <div class="cancelName">
                ${user.TourName}
            </div>
            <div class="dateContainer">
                <div class="label">Booked On:</div>
                <div class="BookedDate">${user.BookedAt}</div>
            </div>
            <textarea placeholder="Reason" id="reason" name="Reason"></textarea>
            <input type="hidden" value="${user.BookingID}" name="BookingID">
            <button type="button" id="cancelBooking" onclick="cancel('${user.BookingID}')">Cancel</button>
        </form>
    `;
        }
    
    });
    
        document.querySelector('.displayContainer').innerHTML=result;
    })   .catch(error => console.error("Error:", error));

}
function cancel(){
    let form=document.getElementById('cancelContainer');
    let formData=new FormData(form);
    fetch(`../Backend/cancelBooking.php`,{
        method:"POST",
        body:formData
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.error){
            alert('Failed To Cancel Booking')
        }else{
            alert(data.message);
            cancelBooking();
        }

    })
}
function mode(counter){
    if(counter === 'Dark'){
        
        document.querySelector('body').style.background="black";
        document.querySelector('.displayContainer').style.color="#ededed";
    }
    else{
        document.querySelector('.displayContainer').style.color="#252525";
        document.querySelector('body').style.background="white";
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    let theme=localStorage.getItem('Theme') || 'Bright';
    mode(theme);
});
displayPlaces();
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