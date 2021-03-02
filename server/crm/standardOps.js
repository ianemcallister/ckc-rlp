/*
*   STANDARD OPERATIONS FOR 29 KETTLE
*
*/

//  DECLARE DEPENDENCIES

//  DEFINE MODULE 
var standOpsMod = {
    SyncCustomers: {
        All: syncShopifyCustomers,
        Square: syncSquareCustomers,
        Shopify: syncShopifyCustomers,
        Facebook: syncFacebookCustomers,
        IG: syncIGCustomers
    },
    test: test
};

function test() {
    console.log('this is the starndard Ops Module');
}

//  EXORT MODULE
module.exports = standOpsMod;