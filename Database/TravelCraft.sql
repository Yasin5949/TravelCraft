create database TravelCraftDB;
use TravelCraftDB;
CREATE TABLE PendingUsers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    hashedPassword VARCHAR(255),
    ProfilePicture VARCHAR(255),
    verificationCode INT
);
create table Users(UserID int primary key auto_increment,
					firstName varchar(20),
                    lastName varchar(20),
                    Email varchar(255) not null unique,
                    hashedPassword varchar(255),
                    CreatedAt timestamp default current_timestamp,
                    ProfilePicture VARCHAR(255),
                    Privilege enum('Blocked','Active')
                    );
create table CallRequest(RequestID int primary key auto_increment,UserID int,
						PhoneNumber int,RequestStatus enum('Pending','Responded'),
                        Reason text,
                        foreign key (UserID) references Users(UserID)
);
create table TourAdmin(AdminID int primary key auto_increment,
                    AdminFirstName varchar(20),
                    AdminLastName varchar(20),
                    hashedPassword varchar(255));
create table Tours(
	TourId int primary key auto_increment,
    TourName varchar(200),
    Descriptions varchar(1000),
    BookedOn timestamp default current_timestamp,
    StartingOn timestamp not null,
    EndOn timestamp null,
    Duration int
);
create table Booking(
	BookingId int primary key auto_increment,
    UserId int,
    TourId int,
    BookingDate timestamp default current_timestamp,
    BookingStatus enum('Pending','Finishhed','Canceled') not null,
    PaymentStatus enum('Pending','Payed','Canceled') not null,
    TotaolPrice decimal(10,2) not null,
    foreign key (UserId) references users(UserId),
    foreign key (TourId) references Tours(TourId)
);
create table Payment(
	PaymentId int primary key auto_increment,
    BookingId int,
    Amount decimal(10,2),
    PaymentMethod enum('Cash','CBE','CBEBirr','TeleBirr') not null,
    PaymentDate timestamp default current_timestamp,
    foreign key(BookingId) references Booking(BookingId)
);
create table Reviews(
	ReviewId int primary key auto_increment,
    UsersId int,
    TourId int,
    Rating decimal(2,2) not null,
    Comments varchar(1000),
    CreatedAt timestamp default current_timestamp
);
CREATE TABLE Guide (
    GuideId INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(20),
    Address VARCHAR(255),
    City VARCHAR(50),
    State VARCHAR(50),
    PostalCode VARCHAR(20),
    Country VARCHAR(50),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
create table TourGuider(
	TourGuiderId int primary key auto_increment,
    GuideId int,
    TourId int,
    foreign key(GuideId) references Guide(GuideId),
    foreign key(TourId) references Tours(TourId)
);
create table Hotels(
	HotelId int primary key auto_increment,
    HotelName varchar(100),
    Location varchar(250),
    Descriptions varchar(500),
    ConatctInfo int
);
create table Rooms(
	RoomId int primary key auto_increment,
    HotelId int,
    RoomType enum('Economy','VIP'),
    Capacity int,
    Price decimal(10,2),
    AvailabilityStatus enum('Booked','Available') not null,
    foreign key(HotelId) references Hotels(HotelId)
);
create table HotelBooking(
	HotelBookingId int primary key auto_increment,
    UserId int,
    HotelId int,
    RoomId int,
    CheckIn timestamp default current_timestamp,
    CheckOut timestamp,
    BookingStatus enum('pending','Finished','Canceled'),
    Total decimal(10,2),
    foreign key(UserId) references users(UserId),
    foreign key(HotelId) references Hotels(HotelId),
    foreign key(RoomId) references Rooms(RoomId)
);
create table HotelReview(
	ReviewId int primary key auto_increment,
    UserId int,
    HotelId int,
    Rating decimal(2,2),
    Comments varchar(500),
    CreatedAt timestamp default current_timestamp,
    foreign key(UserId) references users(UserId),
    foreign key(HotelId) references Hotels(HotelId)
);
