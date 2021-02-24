/*
*   COPPER KETTLE CONFECTIONERY CRM
*
*   This script contains all the ckc mthods
*/


// DEFINE DEPENDENCIES

//  DEFINE MODULE
var ckccrm = {
    EnrollReferalCustomer: EnrollReferalCustomer,
    NotifyNewReferalCustomer: NotifyNewReferalCustomer,
    QueryPhoneRecord: QueryPhoneRecord,
    CreateCustomerReferalCode: CreateCustomerReferalCode,
    GenerateCustomerReferalCode: GenerateCustomerReferalCode,
    CreateShopifyPriceRule: CreateShopifyPriceRule,
    CreateShopifyDiscountCode: CreateShopifyDiscountCode,
    UpdateReferalCodes: UpdateReferalCodes,
    test: test
};

//  EnrollReferalCustomer
function EnrollReferalCustomer(squareLoyaltyActId, customerPhone) {
    //  DEFINE LOCAL VARIABLES
    var CustomerReferalCode = "";

    //  RETURN 
    return CustomerReferalCode;
};

//  NotifyNewReferalCustomer
function NotifyNewReferalCustomer(CustomerReferalCode, customerPhone) {
    return true;
};

//  QueryPhoneRecord
function QueryPhoneRecord(customerPhone) {
    //  DEFINE LOCAL VARIABLES
    var ckcCustomerId = "";

    //  RETURN
    return ckcCustomerId;
};

//  CreateCustomerReferalCode
function CreateCustomerReferalCode(ckcCustomerId) {
    var CustomerReferalCode = "";

    return CustomerReferalCode
};

//  GenerateCustomerReferalCode
function GenerateCustomerReferalCode() {
    var CustomerReferalCode = "";

    return CustomerReferalCode;
};

//  CreateShopifyPriceRule
function CreateShopifyPriceRule() {
    var PriceRuleId = "";

    return PriceRuleId;
};

//  CreateShopifyDiscountCode
function CreateShopifyDiscountCode(PRiceRuleId, CustomerReferalCode) {
    var DiscountCodeId = "";

    return DiscountCodeId;
};

//  UpdateReferalCodes
function UpdateReferalCodes(PriceRuleId, DiscountCodeId) { 

    return true;
}

//  TEST
function test() {
    console.log('this is the test method from ckccrm');
};

//  RETURN THE MODULE
module.exports = ckccrm;