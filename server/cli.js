/*
*   CLI
*
*   This script facilitates development. 
*/

//  NOTIFY STATUS
console.log('running cli');

//  DEFINE DEPENDENCIES
var ckccrm = require('./crm/ckccrm.js');
var square = require('./square/sqr.js');

//  RUN
//ckccrm.test();
square.listLocations();