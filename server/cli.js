/*
*   CLI
*
*   This script facilitates development. 
*/

//  NOTIFY STATUS
console.log('running cli');

//  DEFINE DEPENDENCIES
var ckccrm = require('./crm/ckccrm.js');
var express = require('express');

//  RUN
ckccrm.test();