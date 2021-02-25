/*
*   CLI
*
*   This script facilitates development. 
*/

//  NOTIFY STATUS
console.log('running cli');

//  DEFINE DEPENDENCIES
var ckccrm = require('./crm/ckccrm.js');
//var square = require('./square/sqr.js');
//var shopify = require('./shopify/shopify.js');

//  RUN
//shopify.discountCodes.create('testing12345');
async function result() {
    var result = await ckccrm.EnrollReferalCustomer('aoshdgES98hvs', '+15551112222'); 
    console.log(result);
}


result();

//square.listLocations();
