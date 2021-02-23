

// DECLARE DEPENDENCIES
const { Client, Environment } = require('square');

//  INITIALIZE CLIENT
const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
  });

const locationsApi = client.locationsApi;


