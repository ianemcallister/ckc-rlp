

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
    //return result
    return {
      "id": "GQTFp1ZlXdpoW4o6eGiZhbjosiDFf",
      "created_at": "2019-07-10T13:23:49.154Z",
      "updated_at": "2019-07-10T13:23:49.446Z",
      "amount_money": {
        "amount": 200,
        "currency": "USD"
      },
      "app_fee_money": {
        "amount": 10,
        "currency": "USD"
      },
      "total_money": {
        "amount": 200,
        "currency": "USD"
      },
      "status": "COMPLETED",
      "source_type": "CARD",
      "card_details": {
        "status": "CAPTURED",
        "card": {
          "card_brand": "VISA",
          "last_4": "1111",
          "exp_month": 7,
          "exp_year": 2026,
          "fingerprint": "sq-1-TpmjbNBMFdibiIjpQI5LiRgNUBC7u1689i0TgHjnlyHEWYB7tnn-K4QbW4ttvtaqXw",
          "card_type": "DEBIT",
          "prepaid_type": "PREPAID",
          "bin": "411111"
        },
        "entry_method": "ON_FILE",
        "cvv_status": "CVV_ACCEPTED",
        "avs_status": "AVS_ACCEPTED",
        "auth_result_code": "nsAyY2",
        "statement_description": "SQ *MY MERCHANT",
        "card_payment_timeline": {
          "authorized_at": "2019-07-10T13:23:49.234Z",
          "captured_at": "2019-07-10T13:23:49.446Z"
        }
      },
      "location_id": "XTI0H92143A39",
      "order_id": "m2Hr8Hk8A3CTyQQ1k4ynExg92tO3",
      "reference_id": "123456",
      "note": "Brief description",
      "customer_id": "RDX9Z4XTIZR7MRZJUXNY9HUK6I",
      "processing_fee": [
        {
          "effective_at": "2019-07-10T15:23:49.000Z",
          "type": "INITIAL",
          "amount_money": {
            "amount": 36,
            "currency": "USD"
          }
        }
      ],
      "receipt_number": "GQTF",
      "receipt_url": "https://squareup.com/receipt/preview/GQTFp1ZlXdpoW4o6eGiZhbjosiDFf"
    }
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
