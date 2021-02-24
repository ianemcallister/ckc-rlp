/*
*   SHOPIFY
*
*   This script facilitates all methods related to shopify. 
*/

//  DEFINE DEPENDENCIES
var Shopify = require('shopify-api-node');

//  CREATE INSTANCE
var shopifyCredentials ={
  shopName: process.env.CKC_SHOPIFY_SHOP_NAME,
  apiKey: process.env.CKC_SHOPIFY_API_KEY,
  password: process.env.CKC_SHOPIFY_API_PASS
}
const shopify = new Shopify(shopifyCredentials);

  console.log(shopifyCredentials);

  (async () => {
    let params = { limit: 10 };
  
    do {
      const products = await shopify.product.list(params);
  
      console.log(products);
  
      params = products.nextPageParameters;
    } while (params !== undefined);
  })().catch(console.error);




