/*
*   CLI
*
*   This script facilitates development. 
*/

//  NOTIFY STATUS
console.log('running cli');

//  DEFINE DEPENDENCIES
//var delightCirlce = require('./crm/delightCircle.js');
//var square = require('./square/sqr.js');
var Shopify = require('./shopify/shopify.js');
//var till = require('./till/till.js');
//var firebase = require('./firebase/firebase.js');

//  RUN
//firebase.test();
//till.alertTest();
//shopify.discountCodes.create('testing12345');
async function result() {
    var result = await Shopify.CollectCustomerByPhone("");
    //var result = await delightCirlce.CollectEnrollmentData("JDKYHBWT1D4F8MFH63DBMEN8Y4","1-212-555-4240"); 
    console.log(result);
}
result();

//square.listLocations();
