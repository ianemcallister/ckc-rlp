/*
*   COPPER KETTLE CONFECTIONERY CRM
*
*   This script contains all the ckc mthods
*/


// DEFINE DEPENDENCIES
var shopify = require('../shopify/shopify.js');

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
        CustomerReferalCode,
        await CreateShopifyDiscountCode(CustomerReferalCode)
    );
};

//  NotifyNewReferalCustomer
async function NotifyNewReferalCustomer(customerPhone, CustomerReferalCode) {
    //  DEFINE LOCAL VARIABLES
    
    //  NOTIFY PROGESS
    console.log('NotifyNewReferalCustomer');
    /*console.log({
        'customerPhone': customerPhone,
        'CustomerReferalCode': CustomerReferalCode
    })*/

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
    //  NOTIFY PROGESS
    console.log('CreateShopifyDiscountCode', discountCodeObject);

    //  RETURN
    return discountCodeObject.id;
};

//  UpdateReferalCodes
async function UpdateReferalCodes(CustomerReferalCode, DiscountCodeId) { 
    
    //  NOTIFY PROGRESS
    console.log('UpdateReferalCodes');
    console.log({
        'DiscountCodeId': DiscountCodeId,
        'CustomerReferalCode': CustomerReferalCode
    })

    //  RETURN
    return CustomerReferalCode;
}

//  TEST
function test() {
    console.log('this is the test method from ckccrm');
};

//  RETURN THE MODULE
module.exports = ckccrm;