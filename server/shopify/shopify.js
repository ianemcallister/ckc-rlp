/*
*   SHOPIFY
*
*   This script facilitates all methods related to shopify. 
*/

//  DEFINE DEPENDENCIES
var Shopify = require('shopify-api-node');

//  DEFINE MODULE
var shopifyMod = {
  productsList: productsList,
  priceRules: {
    list: GETpriceRulesList
  },
  discountCodes: {
    create: POSTdiscountCode
  }
};

//  INSTANCIATE
var shopifyCredentials ={
  shopName: process.env.CKC_SHOPIFY_SHOP_NAME,
  apiKey: process.env.CKC_SHOPIFY_API_KEY,
  password: process.env.CKC_SHOPIFY_API_PASS
}
var shopify = new Shopify(shopifyCredentials);

//  NOTIFY PROGRESS
//console.log(shopifyCredentials);

//  CREATE DISCOUNT CODE
async function POSTdiscountCode(CustomerReferalCode) {
  //  DEFINE LOCAL VARIABLES
  let priceRuleId = 913999855784;
  let discountCodeId = '';
  let params = { "code": CustomerReferalCode };

  try {
    return await shopify.discountCode.create(priceRuleId, params);
  } catch (error) {
    console.log(error);
  }

  //  RETURN CALL
};

//  GET PRICES RULES LIST
async function GETpriceRulesList() {
  //  DEFINE LOCAL VARIABLES
  let params = { limit: 10 };

  try {
    do {
      //  DEFINE LOCAL VARIABLES
      var priceRules = await shopify.priceRule.list(params);
      
      //  NOTIFY PROGRESS
      console.log(priceRules);
  
      params = priceRules.nextPageParameters;
    } while (params !== undefined);
    
  } catch (error) {
    console.error;
  }

  return;
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

