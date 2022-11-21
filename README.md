# ECE 464 Final Project: Library Management System

Xiao Lin, Will Wu, Sophia Xu

## Introduction
In this project, we plan to implement a library management system with basic book-borrowing functionalities and some financial services. 
There will be two user types, and the first type will be regular users. The regular user should be able to search, borrow, return, and renew books. They will also be able to view the number of copies available at the current location and send book requests to other sites if necessary. The users can also pay for the fees through this management system if there is a late return punishment fee or book damage fee associated with the book borrowing records. 
The second user type is library employee/volunteer. They will have permission to access all the regular users' functionalities and check their payment/volunteer hours and the library's monthly funding.
There will also be an account summary that records the monthly money in (funding to the library, late fee, and damage fee), money out (employee payments), and current balance for each location.

## Proposal 

[Library Management System Proposal](https://github.com/Hongguigui/DB-Library-Mgmt/blob/main/DB%20Proposal.pdf)

## Prerequisites 
All the requirements for the system can install by 
```
pip install -r requirements.txt
```
## Running the program
The program can be run by 
```
python app.py
```
Run the frontend
```
 cd frontend
 npm install // Only need to be run once
 npm start
```
