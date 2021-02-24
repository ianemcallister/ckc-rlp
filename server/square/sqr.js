

// DECLARE DEPENDENCIES 
const { Client, Environment } = require('square');

//  DEFINE MODULE
var sqr = {
  listLocations: listLocations,
  test: test
};

//  INITIALIZE CLIENT
const client = new Client({
    environment: Environment.Production,
    accessToken: process.env.CKC_SQR_APP_TKN,
  });


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
