/*
*   COPPER KETTLE CONFECTIONERY CRM
*
*   This script contains all the ckc mthods
*/


// DEFINE DEPENDENCIES
var shopify = require('../shopify/shopify.js');
var till = require('../till/till.js');

//  DEFINE MODULE
var ckccrm = {
    EnrollReferalCustomer: EnrollReferalCustomer,
    NotifyNewReferalCustomer: NotifyNewReferalCustomer,
    QueryPhoneRecord: QueryPhoneRecord,
    CreateCustomerReferalCode: CreateCustomerReferalCode,
    GenerateCustomerReferalCode: GenerateCustomerReferalCode,
    CreateShopifyDiscountCode: CreateShopifyDiscountCode,
    UpdateReferalCodes: UpdateReferalCodes,
    test: test
};

//  EnrollReferalCustomer
async function EnrollReferalCustomer(squareLoyaltyActId, customerPhone) {
    //  DEFINE LOCAL VARIABLES

    //  RETURN 
    return await NotifyNewReferalCustomer(
        customerPhone, 
        await CreateCustomerReferalCode(
            await QueryPhoneRecord(customerPhone)
        )
    );
};

//  QueryPhoneRecord
async function QueryPhoneRecord(customerPhone) {
    //  DEFINE LOCAL VARIABLES
    var ckcCustomerId = "";

    ckcCustomerId = customerPhone;

    //  RETURN
    return ckcCustomerId;
};

//  CreateCustomerReferalCode
async function CreateCustomerReferalCode(ckcCustomerId) {
    //  DEFINE LOCAL VARIABLES
    var CustomerReferalCode = GenerateCustomerReferalCode(8);
    
    //  NOTIFY PROGESS
    console.log('CreateCustomerReferalCode');
    /*console.log({
        'CustomerReferalCode': CustomerReferalCode,
        'DiscountCodeId': DiscountCodeId,
        'ckcCustomerId': ckcCustomerId
    })*/

    //  RETURN
    return await UpdateReferalCodes(
        await CreateShopifyDiscountCode(CustomerReferalCode)
    );
};

//  NotifyNewReferalCustomer
async function NotifyNewReferalCustomer(customerPhone, CustomerReferalCodeUrl) {
    //  DEFINE LOCAL VARIABLES
    var messages = { one: "", two: "" };
    messages.one += 'Welcome to SMS messages from 29 Kettle - Reply w/ "HELP" for more or "END" to unsubscribe from receiving messages, std rates apply. ' + "\r\n";
    messages.one += "Earn $5 off your next purchase everytime someone uses your link to make their first purchase at: ";
    messages.one += CustomerReferalCodeUrl + " ";
    

    //  NOTIFY PROGESS
    console.log('NotifyNewReferalCustomer');
    //console.log(customerPhone, CustomerReferalCodeUrl);
    //console.log(messages);
    /*console.log({
        'customerPhone': customerPhone,
        'CustomerReferalCode': CustomerReferalCode
    })*/

    //  send SMS
    till.alertTest([customerPhone], messages)

    //  RETURN
    return true;
};



//  GenerateCustomerReferalCode
function GenerateCustomerReferalCode(length) {
    //  DEFINE LOCAL VARIABLES
    var CustomerReferalCode = "";
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        CustomerReferalCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    //  RETURN
    return CustomerReferalCode;
};

//  CreateShopifyDiscountCode
async function CreateShopifyDiscountCode(CustomerReferalCode) {
    //  DEFINE LOCAL VARIABLES
    const discountCodeObject = await shopify.discountCodes.create(CustomerReferalCode);
    const reDirectId = await shopify.redirect.create(CustomerReferalCode);
    const url = "https://www.29kettle.com/" + CustomerReferalCode;

    //  NOTIFY PROGESS
    //console.log('CreateShopifyDiscountCode', discountCodeObject);

    //  RETURN
    return { id: discountCodeObject.id, url: url, code: CustomerReferalCode }
};

//  UpdateReferalCodes
async function UpdateReferalCodes(DiscountCodeObject) { 
    
    //  NOTIFY PROGRESS
    console.log('UpdateReferalCodes');
    console.log({
        'DiscountCodeId': DiscountCodeObject.id,
        'DiscountCodeUrl': DiscountCodeObject.url,
        'CustomerReferalCode': DiscountCodeObject.code
    })

    //  RETURN
    return DiscountCodeObject.url;
}

//  TEST
function test() {
    console.log('this is the test method from ckccrm');
};

//  RETURN THE MODULE
module.exports = ckccrm;