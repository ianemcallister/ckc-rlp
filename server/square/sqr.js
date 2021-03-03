

// DECLARE DEPENDENCIES 
const { Client, Environment } = require('square');

//  INITIALIZE CLIENT
const client = new Client({
  environment: Environment.Production,
  accessToken: process.env.CKC_SQR_APP_TKN,
});

//  DEFINE MODULE
var sqr = {
  CollectCustomerByLoyalty: CollectCustomerByLoyalty,
  listLocations: listLocations,
  list: {
    customers: ListCustomers
  },
  Payments: {
    Get: GetPayment
  },
  test: test
};


/*
*   LIST CUSTOMERS
* 
*   @PARAMS()
*   @RETURN(allCustomers)
*/
async function ListCustomers(cursor, sortField, sortOrder) {
  //  DEFINE LOCAL VARIABLES
  var sortField = "DEFAULT";
  var sortOrder = "ASC";
  var SqCustomers = client.customersApi;

  //  EXECUTE ASYNC WORK
  try {
    const { result, ...httpResponse } = await SqCustomers.listCustomers(cursor, sortField, sortOrder);
    
    //  NOTIFY PROGRESS
    process.stdout.write(`I`);

    //  HANDLE PAGINATION
    if(result.cursor != undefined || "" ) {
      var customersList = await ListCustomers(result.cursor, sortField, sortOrder);
      
      return customersList;
    } else {
      
      return result;
    }
  //  HANDLE ERRORS
  } catch (error) {
    console.log(error);
    return error;
  }
};

/*
*   GET PAYMENT
*
*   @PARAM(id)
*   @RETURN(paymentObject)
*/
async function GetPayment(id) {
  //  DEFINE LOCAL VARIABLES
  const paymentId = client.paymentsApi;
  //  EXECUTE ASYNC WORK
  try {
    //  DEFINE LOCAL VARIABLES
    const { result, ...httpResponse } = await paymentId.getPayment(id);
    return result
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
