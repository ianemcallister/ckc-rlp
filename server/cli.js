/*
*   CLI
*
*   This script facilitates development. 
*/

//  NOTIFY STATUS
console.log('running cli');

//  DEFINE DEPENDENCIES
var fs 		          = require('fs');
var path 	          = require('path');
//var DelightCirlce     = require('./crm/delightCircle.js');
//var Square            = require('./square/sqr.js');
//var Shopify           = require('./shopify/shopify.js');
//var Till              = require('./till/till.js');
var Firebase          = require('./firebase/firebase.js');
//var Standardops         = require('./crm/standardOps.js');

//  RUN



//Standardops._read.csvFile();

//firebase.test();
//till.alertTest();
//shopify.discountCodes.create('testing12345');
async function result() {
    var customerId = await Firebase.read.idByChild('/Customers', 'FirstName', 'Gwendolyne');
    console.log(customerId)
}
result();

//square.listLocations();
