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
var Square            = require('./square/sqr.js');
var Shopify           = require('./shopify/shopify.js');
//var Till              = require('./till/till.js');
var Firebase          = require('./firebase/firebase.js');
var Standardops         = require('./crm/standardOps.js');

//  RUN



//Standardops._read.csvFile();

//firebase.test();
//till.alertTest();
//shopify.discountCodes.create('testing12345');
async function result() {
    //await Square.Customers.Get('RDX9Z4XTIZR7MRZJUXNY9HUK6I');
    //await Square.Payments.Get('tqINdxjRf0AoBuy6jPxqSCzQuaB');
    await Shopify.customers.get();
    //await Square.Customers.Search();
    //await Square.Orders.Get('ySuYm7wfar9MdV3UI5rmtHweV');
    //await Square.Loyalty.Get('');
    //await Shopify.priceRules.list();
    //await Shopify.discountCodes.create('915622199464', 'FB-0PFM-50_OFF_PROMO-T6VD-BOURBON_PECANS-DHW9h1s9g-2nshts25s823s');
    //await Square.Payments.List('2021-03-02T12:25:34-08:00','2021-03-02T14:25:34-08:00');
    //await Firebase.read.idByChild('/Customers', 'SquareCustomerID', 'J70G0HCB8X3RH69EQXBY5MADC0');
    //await Standardops._build.SquarePaymentWriteBatch('VSyrM1yFjzWdmhbX3UaaOVQAwaB');
}
result();

//square.listLocations();
