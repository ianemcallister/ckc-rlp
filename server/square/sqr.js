

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
    Get: GetPayment,
    List: ListPayments
  },
  Customers: {
    Get: GetCustomer,
    Search: SearchCustomers
  },
  Orders: {
    Get: GetOrder
  },
  Loyalty: {
    Get: GetLoyalty
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
*
*
*/
async function GetOrder(id) {
  //  DEFINE LOCAL VARIABLES
  const ordersApi = client.ordersApi;
  //  EXECUTE ASYNC WORK
  try {
    //  DEFINE LOCAL VARIABLES
    const { result, ...httpResponse } = await ordersApi.retrieveOrder(id);
    console.log('got this Order');
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
/*
*   GET CUSTOMER
*
*   @PARAM(id)
*   @RETURN(paymentObject)
*/
async function GetCustomer(id) {
  //  DEFINE LOCAL VARIABLES
  const customerId = client.customersApi;
  //  EXECUTE ASYNC WORK
  try {
    //  DEFINE LOCAL VARIABLES
    const { result, ...httpResponse } = await customerId.retrieveCustomer(id);
    console.log('got this Customer');
    console.log(result);
    return reslt
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
  const paymentAPI = client.paymentsApi;
  //  EXECUTE ASYNC WORK
  try {
    //  DEFINE LOCAL VARIABLES
    const { result, ...httpResponse } = await paymentAPI.getPayment(id);
    //return result
    //  NOTIFY PROGRESS
    console.log('SQ: got this payment');
    console.log(result.payment);
    return result
  } catch (error) {
    console.log(error);
    return error;
  }
};

/*
*
*/
async function ListPayments(beginTime, endTime) {
  //  DEFINE LOCAL VARIABLES
  const paymentAPI = client.paymentsApi;
  //  EXECUTE ASYNC WORK
  try {
    //  DEFINE LOCAL VARIABLES
    const { result, ...httpResponse } = await paymentAPI.listPayments(beginTime, endTime);
    //return result
    //  NOTIFY PROGRESS
    console.log('SQ: got these payments');
    console.log(result);
    return result
  } catch (error) {
    console.log(error);
    return error;
  }
}

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

/*
*   RETRIVE LOYATLY ACCOUNT
*/
async function GetLoyalty(id) {
  //  DEFINE LOCAL VARIABLES
  const loyaltyApi = client.loyaltyApi;
  
  //  EXECTE ASYNC WORK
  try {
    const { result, ...httpResponse } = await loyaltyApi.retrieveLoyaltyAccount(IDBCursor);
    // Get more response info...
    const { statusCode, headers } = httpResponse;
    console.log(result);
    return result;
  } catch (error) {
    const errors = error.result;
    const { statusCode, headers } = error;
  }
}

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

/*
*   SEARCH CUSTOMERS
*/
async function SearchCustomers() {
  //  DEFINE LOCAL VARIABLES
  const customersApi = client.customersApi;
  const body = { 
    limit: 2,
    query: { 
      filter: { 
        created_at: { 
          start_at: "2021-03-02T12:00:00-08:00", 
          end_at: "2021-03-02T13:00:00-08:00"
        }
      }
    }
  };
  

  try {
    const { result, ...httpResponse } = await customersApi.searchCustomers(body);
    console.log('got these customers');
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//  TEST
function test() { console.log('this is the square module test');}

//  EXPORT MODULE
module.exports = sqr;
