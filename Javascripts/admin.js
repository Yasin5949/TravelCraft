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
                    <option value="South">South People</option>
                    </select>
                    </label><br>
                <input type="submit" value="ADD" id="addBtn">
            </form>
    `;
}
function Search() {
    let query = document.getElementById("search").value;

    fetch(`../Backend/searchUser.php?query=${query}`)
        .then(response => response.json())
        .then(data => {
            let output = "<h3>Search Results:</h3>";
            if (data.length > 0) {
                data.forEach(user => {
                    output = `<div class="user">
                <div class="userProfile">
                    <img src="" alt="Yasin">
                </div>
                <div class="emailContainer">${user.Email}</div>
                <div class="detail" onclick="view()">Views</div>
                <div class="delete">Delete</div>
            </div>
            <div class="userDetail">
                <button onclick="getUserBooking(${user.UserID})">User Booking</button>
                <button onclick="getUserCanceledBooking()">User's Canceled Booking</button>
                <button>User Info</button>
            </div>`;
                });
            } else {
                output += `<p>No users  width ${query} Email found.</p>`;
            }
            document.querySelector('.operationField').innerHTML=`${output}`;
        })
        .catch(error => console.error("Error:", error));
}
function view(){
    document.querySelector('.userDetail').innerHTML=`
                <button onclick="getUserBooking()">User Booking</button>
                <button onclick="getUserCanceledBooking()">User's Canceled Booking</button>
                <button>User Info</button>
    `;
}
function getUserBooking(userInfo){
    /*document.querySelector('.userDetail').innerHTML=`
    <div class="back" onclick="view()">Back</div>
                <div class="bookedContainer">
                    <div class="tourImage">
                        <img src="../images/abay.jpg" alt="">
                    </div>
                    <div class="tourName">Bale Mountains</div>
                        <div class="bookedOn">Booked On:00/00/0000</div>
                        <div class="bookedFor">Booked For:00/00/0000</div>
                </div>
    `;*/
    fetch(`../Backend/userBooking.php?query=${userInfo}`)
    .then(response=>response.json())
    .then(data=>{
        let output=``;
        if (!data) {
                data.forEach(user => {
                    output = `<div class="user">
                <div class="userProfile">
                    <img src="" alt="Yasin">
                </div>
                <div class="emailContainer"></div>
                <div class="detail" onclick="view()">Views</div>
                <div class="delete">Delete</div>
            </div>
            <div class="userDetail">
                <button onclick="getUserBooking(${user.firstName})">User Booking</button>
                <button onclick="getUserCanceledBooking()">User's Canceled Booking</button>
                <button>User Info</button>
            </div>`;
                });
            } else {
                output += `<p>No users  width ${userInfo} Email found.</p>`;
                document.querySelector('.userDetail').innerHTML=`
                <div class="back" onclick="view()">Back</div>
                <h1>User Have Not Booked a Tour!</h1>`;
            }
            console.log(output);
    })

}
function getUserCanceledBooking(userInfo){
    fetch(`../Backend/userCanceledBooking.php?query=${userInfo}`)
    .then(response=>response.json())
    .then(data=>{
        let output=``;
        if (data.length > 0) {
                data.forEach(user => {
                    output = `<div class="user">
                <div class="userProfile">
                    <img src="" alt="Yasin">
                </div>
                <div class="emailContainer">${user.Email}</div>
                <div class="detail" onclick="view()">Views</div>
                <div class="delete">Delete</div>
            </div>
            <div class="userDetail">
                <button onclick="getUserBooking(${user.firstName})">User Booking</button>
                <button onclick="getUserCanceledBooking()">User's Canceled Booking</button>
                <button>User Info</button>
            </div>`;
                });
            } else {
                output += `<p>No users  width ${userInfo} Email found.</p>`;
                document.querySelector('.userDetail').innerHTML=`
                <div class="back" onclick="view()">Back</div>
                <h1>User Have No Canceled Booking!</h1>`;
            }
            console.log(output);
    })

}
