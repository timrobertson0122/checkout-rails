# SmartShop

Brief
----------------
The goal of the exercise is to create a checkout system that fulfils the criteria listed below :


Items can be added to a basket
Items can be removed from a basket
Promotions can be applied to a basket
Promotions can be removed from a basket
Basket can be checked out - a total price is calculated
Customer’s Email, Address and Credit card details are required to check out
Customers will have an Order after checking out which contains all the basket items


Items :
Name
Price (£)
Smart Hub
49.99
Motion Sensor
24.99
Wireless Camera
99.99
Smoke Sensor
19.99
Water Leak Sensor
14.99


Promotions :
Codes :
20%OFF -  20% off final cost cannot be used in conjunction with other codes
5%OFF - 5% off final cost can be used in conjunction with other codes
20POUNDSOFF - £20 off final cost can be used in conjunction with other codes


Quantity :
3 Motion sensors for £65.00
2 Smoke Sensors for £35.00


Deliverables :
Create a database that can support the criteria
Create pages to accommodate functionality
Validation of intended functionality
Brief written summary of approach, assumptions, caveats and notes
Instructions on how to run the project
Submission should be a GitHub repository


Notes :
No attention will be paid to the look and feel of this task. Pages can be plain HTML.

Approach
----------

I opted to return to code I had previously written as it contained similar functionality for the required user stories in this challenge, and gave me a nice UI to work with. This was an SPA in AngularJS (1.0). For this task I needed to tweak the logic that handled the vouchers, and I additionally implemented the option to remove vouchers from the basket. The larger challenge for me in this task was to implement a database, as one was not used when I built the original app. I really felt that creating this entirely in Rails was overkill for what was required, as it would probably require the creating of additional database tables/entries. In-keeping with a flexible, decoupled infrastructure I opted to use Rails to serve up my Product data via a simple JSON API.

Technologies
------------

* AngularJS
* Rails API
* Styled with Bootstrap

Prerequisites
-------------

You will need the following installed locally:  

**App**
* Node.js
* NPM
* Bower
* Express

**API**
* Ruby
* Rails

Site Setup
----------

**App**
* Execute the following in the command line:
* ```Git clone https://github.com/timrobertson0122/smart-checkout.git```
* ```cd smart-checkout```
* ```bower install``` and ```npm install```
* ```npm start```

Navigate to ```localhost:4567``` in your browser.  

**API**
* ```Git clone https://github.com/timrobertson0122/rails-api.git```
* ```cd rails-api/my_api```
* ```rails server```

**NB**

Due to Chrome CORS issues you may need to use this Chrome extension - Allow-Control-Allow-Origin: *

Issues & Future Features
---------------

* Fix CORS issues
* Implement missing user stories - full checkout feature and order generation
* Ensure correct logic on all basket operations (slight issue with removal of voucher when more than one have been added)
* Add images to items
* Consider storage of item images and generated orders
* User login functionality
* Tests! :)
