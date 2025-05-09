import { places } from '../Data/favoritePlaces.js';
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
function changeLang(Lang){
    fetch(`/translations/${Lang}.json`)
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
        document.getElementById('expense').innerText=translations.Wages;
        document.getElementById('history').innerText=translations.AllHistory;
        document.getElementById('terms').innerText=translations.Terms;
        localStorage.setItem('Language',Lang);
    })
};
const savedLanguage=localStorage.getItem('Language') || 'English';
changeLang(savedLanguage);
const theme=localStorage.getItem('Theme') || 'hello';
document.querySelector('body').style.background=theme;
function displayPlaces(){
    document.querySelector('.displayContainer').innerHTML=``;
    places.forEach((places)=>{
        document.querySelector('.displayContainer').innerHTML+=`
            <div class="placeHolder">
            <div class="placeName">
                <div class="description">
                    ${places.aboutPlace.discription}
                </div>
                <div class="pricing">
                    <div class="phrase">from</div>
                    <div class="priceAmount">$665</div>
                    <div class="bookBtn"  onclick="bookForm()">Book</div>
                    <div class="guidContainer">
                    ${places.aboutPlace.placeName}</div>
                </div>
            </div>
            <div class="placeImage">
            <img src='${places.aboutPlace.image}' class='places'><img></div>
        </div>
        `;})
    }
function bookForm(){
    const form=document.getElementById('bookForm');
    if(form){
        form.remove();
    }
    document.querySelector('body').innerHTML+=`
    <form action=""id="bookForm">
        <h1>Book</h1>
        <label for="Place">
            Place:
        </label><br>
        <label for="startDate">
            GoingDate:<input type="date" id="startDate">
        </label><br>
        <label for="endDate">
            EndingDate:<input type="date" id="endDate">
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
            <select name="hotels" id="paymentMethod">
                <option>one</option>
            </select>
        </label>
        <div class="hotelDisplay"></div>
        <button id="confirmBook">Book</button>
        <div class="exit" onclick="removeForm()">Exit</div>
    </form>
    `;
}
function removeForm(){
    const form=document.getElementById('bookForm');
    form.remove();
}
function canceledBooking(){
    document.querySelector('.displayContainer').innerHTML=`
        <div class="canceledContainer">
            <div class="detailsMenu" onclick="viewDetail()">
                View
            </div>
            <div class="canceledImageContainer" >
                <img src="../images/abay.jpg" alt="">
            </div>
            <div class="canceledPlaceName">
                Lalibela
            </div>
            <div class="canceledLabel">
                Canceled ON
            </div>
            <div class="canceledDate">
                00/00/0000
            </div>
        </div>
    `;
}
function cancelBooking(){
    document.querySelector('.displayContainer').innerHTML=`
        <div class="cancelContainer">
            <div class="imageToCancel">
                <img src="../images/Awash-park-5.jpg" alt="">
            </div>
            <div class="cancelName">
                Awash
            </div>
            <div class="dateContainer">
                <div class="label">Booked On:</div>
                <div class="BookedDate">00/00/0000</div>
            </div>
            <textarea placeholder="Reason" id="reason"></textarea>
            <button id="cancelBooking">Cancel</button>
        </div>
    `;
}
let viewed=1;
function viewDetail(){
document.querySelectorAll('.detailsMenu').forEach(menu=>{
    menu.addEventListener('click',()=>{
    let container = menu.parentElement;
    if(viewed === 0){
        container.style.height="150px";
        container.innerHTML=`
            <div class="detailsMenu" onclick="viewDetail()">
                View
            </div>
            <div class="canceledImageContainer" >
                <img src="../images/abay.jpg" alt="">
            </div>
            <div class="canceledPlaceName">
                Lalibela
            </div>
            <div class="canceledLabel">
                Canceled ON
            </div>
            <div class="canceledDate">
                00/00/0000
            </div>
        `;
        menu.innerText='view';
        viewed=1;
    }
    else{
    menu.innerText='Close';
    container.style.height='400px';
    container.innerHTML+=`
        <div class="reason"></div>
    `;
    viewed=0;
    }
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
function Expense(){
    document.querySelector('.displayContainer').innerHTML=`
        <div class="totalTourExpense">
            <div class="tourExpensePercent"></div>
            <div class="totalTourExpenseCalculated">Total Tour :$23456789</div>
        </div>
        <div class="totalHotelExpense">
            <div class="totalHotelExpenseCalculated">Total Hotel :$23456789</div>
            <div class="hotelExpensePercent"></div>
        </div>
        <div class="overAllExpense">
            <div class="overAllExpenseCalculated">OverAll :$23456789</div>
            <div class="overAllExpensePercent"></div>
        </div>
        <div class="tourExpense">
            <div class="tourExpenseLabel">
                Tour Expense
            </div>
            <div class="tourExpenseDisplay">
                <div class="individualTour">
                    <div class="tourImage">
                        <img src="../images/baleViewFour.jpg" alt="">
                    </div>
                    <div class="placeAndExpense">
                        <div class="placeNameExpense">
                            Bale Mountains
                        </div>
                        <div class="totalDurations">
                            From:<strong> 00/00/000</strong><br>
                            To:<strong>   00/00/000</strong>
                            <div class="totalCost">$100000</div>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
        <div class="hotelExpense">
            <div class="hotelExpenseLabel">
                Hotel Expense
            </div>
            <div class="hotelExpenseDisplay">
                <div class="individualTour">
                    <div class="tourImage">
                        <img src="../images/baleViewFour.jpg" alt="">
                    </div>
                    <div class="placeAndExpense">
                        <div class="placeNameExpense">
                            Bale Lodge
                        </div>
                        <div class="totalDurations">
                            From:<strong> 00/00/000</strong><br>
                            To:<strong>   00/00/000</strong>
                            <div class="totalCost">$100000</div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        </div>
    `;
}
function allHistory(){
    document.querySelector('.displayContainer').innerHTML=`
        <div class="bookedHistory">
            <div class="HistoryLabel">
                Booked
            </div>
            <div class="historyDisplay">
                <div class="individualHistory">
                    <div class="historyImage">
                        <img src="../images/baleViewFour.jpg" alt="">
                    </div>
                    <div class="historyName">
                        Bale Mountains
                    </div>
                    <div class="historyDate">
                        Booked On:<strong>00/00/0000</strong>
                    </div>
                </div>
            </div>
        </div>
        <div class="canceledHistory">
            <div class="HistoryLabel">
                Canceled
            </div>
            <div class="historyDisplay">
                <div class="individualHistory">
                    <div class="historyImage">
                        <img src="../images/baleViewThree.jpg" alt="">
                    </div>
                    <div class="historyName">
                        Bale Mountains
                    </div>
                    <div class="historyDate">
                        Canceled On:<strong>00/00/0000</strong>
                    </div>
                </div>
            </div>

        </div>
        <div class="updatedHistory">
            <div class="HistoryLabel">
                Updated
            </div>
            <div class="historyDisplay">
                <div class="individualHistory">
                    <div class="historyImage">
                        <img src="../images/baleViewTwo.jpg" alt="">
                    </div>
                    <div class="historyName">
                        Bale Mountains
                    </div>
                    <div class="historyDate">
                        Updated On:<strong>00/00/0000</strong>
                    </div>
                </div>
            </div>

        </div>
    `;
}
displayPlaces();
window.displayPlaces=displayPlaces;
window.canceledBooking=canceledBooking;
window.Book=Book;
window.Menu=Menu;
window.Exit=Exit;
window.allHistory=allHistory;
window.Expense=Expense;
window.terms=terms;
window.viewDetail=viewDetail;
window.cancelBooking=cancelBooking;
window.bookForm=bookForm;
window.removeForm=removeForm;
