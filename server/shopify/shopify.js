/*
*   SHOPIFY
*
*   This script facilitates all methods related to shopify. 
*/

//  DEFINE DEPENDENCIES
var Shopify = require('shopify-api-node');

//  DEFINE MODULE
var shopifyMod = {
  CollectCustomerByPhone: CollectCustomerByPhone,
  productsList: productsList,
  priceRules: {
    list: GETpriceRulesList
  },
  discountCodes: {
    create: POSTdiscountCode
  },
  redirect: {
    create: POSTnewRedirect
  }
};

//  INSTANCIATE
var shopifyCredentials ={
  shopName: process.env.CKC_SHOPIFY_SHOP_NAME,
  apiKey: process.env.CKC_SHOPIFY_API_KEY,
  password: process.env.CKC_SHOPIFY_API_PASS
}
var Shopify = new Shopify(shopifyCredentials);

//  NOTIFY PROGRESS
//console.log(shopifyCredentials);

/*
*   CollectCustomerByPhone
*
*   @param(phoneNumber)
*   @return(customer)
*/
async function CollectCustomerByPhone(phoneNumber) {
  //  DEFINE LOCAL VARIABLES
  var query = {phone: phoneNumber}
  
  try {
    var customer = await Shopify.customer.search(query)
    console.log('got this response', customer);
    return customer;
  } catch (error) {
    console.error(error);
    return error;
  }
  //  RETURN
};

//  CREATE NEW REDIRECT
async function POSTnewRedirect(CustomerReferalCode) {
  //  define local variables
  var params = {
    "path": "/" + CustomerReferalCode,
    "target": "/collections/tubes/products/mixed-gourmet-glazed-nuts-tube"
  };

  try {
    return await shopify.redirect.create(params);
  } catch (error) {
    console.log(error);
  }

};

/*  
*   CREATE DISCOUNT CODE
*   
*   Creates a price rule id.
*   NOTES: Referal code price rule: 913999855784
*
*/
async function POSTdiscountCode(priceRuleId, CustomerReferalCode) {
  //  DEFINE LOCAL VARIABLES
  let params = { "code": CustomerReferalCode };

  try {
    return await Shopify.discountCode.create(priceRuleId, params);
  } catch (error) {
    console.log(error);
    return error;
  }

  //  RETURN CALL
};

//  GET PRICES RULES LIST
async function GETpriceRulesList() {
  //  DEFINE LOCAL VARIABLES
  let params = { limit: 10 };

  //  NOTIFY PROGRESS
  console.log('getting price rules');

  try {
    //do {
      //  DEFINE LOCAL VARIABLES
      var priceRules = await Shopify.priceRule.list(params);
      
      //  NOTIFY PROGRESS
      console.log('got these price rules');
      console.log(priceRules);
  
      params = priceRules.nextPageParameters;
      return priceRules;
    //} while (params !== undefined);
    
  } catch (error) {
    console.error;
    return error;
  }

};

//  GET LIST OF PRODUCTS
async function productsList() {
  //  DEFINE LOCAL VARIABLES
  let params = { limit: 10 };

  try {
    do {
      //  DEFINE LOCAL VARIABLES
      var products = await shopify.product.list(params);
      
      //  NOTIFY PROGRESS
      console.log(products);
  
      params = products.nextPageParameters;
    } while (params !== undefined);
    
  } catch (error) {
    console.error;
  }

  return;
};



//  EXPORT THE MODULE
module.exports = shopifyMod;

