

// DECLARE DEPENDENCIES 
const { Client, Environment } = require('square');

//  DEFINE MODULE
var sqr = {
  CollectCustomerByLoyalty: CollectCustomerByLoyalty,
  listLocations: listLocations,
  test: test
};

//  INITIALIZE CLIENT
const client = new Client({
    environment: Environment.Production,
    accessToken: process.env.CKC_SQR_APP_TKN,
});

/*
*   CollectCustomerByLoyalty
*
*   @param()
*   @return()
*/
async function CollectCustomerByLoyalty(loyaltyId) {
  //  DEFINE LOCAL VARIAVBLES
  var loyaltyApi = client.loyaltyApi;

  try {
    const { result, ...httpResponse } = await loyaltyApi.retrieveLoyaltyAccount(loyaltyId);
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return result.customer_id;
  } catch(error) {
    if (error instanceof ApiError) {
      const errors = error.result;
      // const { statusCode, headers } = error;
      return error;
    }
  }

  //  RETURN 

};

//  listLocations
async function listLocations() {
  //  DEFINE LOCAL VARIABLES
  const locationsApi = client.locationsApi;
  
  try {
    const { result, ...httpResponse } = await locationsApi.listLocations();
    // Get more response info...
     const { statusCode, headers } = httpResponse;
     console.log(result);
  } catch(error) {
    console.log(error);
    if (error instanceof ApiError) {
      const errors = error.result;
      const { statusCode, headers } = error;
      
    }
  }

  return 0;
};

//  TEST
function test() { console.log('this is the square module test');}

//  EXPORT MODULE
module.exports = sqr;
