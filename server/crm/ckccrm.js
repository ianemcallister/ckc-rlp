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
    var PriceRuleId = await CreateShopifyPriceRule(CustomerReferalCode);
    
    //  NOTIFY PROGESS
    console.log('CreateCustomerReferalCode');
    /*console.log({
        'CustomerReferalCode': CustomerReferalCode,
        'PriceRuleId': PriceRuleId,
        'DiscountCodeId': DiscountCodeId,
        'ckcCustomerId': ckcCustomerId
    })*/

    //  RETURN
    return await UpdateReferalCodes(PriceRuleId, CustomerReferalCode);
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

//  CreateShopifyPriceRule
async function CreateShopifyPriceRule(CustomerReferalCode) {
    //  DEFINE LOCAL VARIABLES
    var PriceRuleId = "";
    var PriceRule = {
        "price_rule": {
          "title": CustomerReferalCode,
          "target_type": "line_item",
          "target_selection": "all",
          "allocation_method": "across",
          "value_type": "fixed_amount",
          "value": "-10.0",
          "customer_selection": "all",
          "starts_at": "2017-01-19T17:59:10Z"
        }
    }

    //  NOTIFY PROGESS
    console.log('CreateShopifyPriceRule', PriceRuleId);

    //  RETURN
    return PriceRuleId;
};

//  UpdateReferalCodes
async function UpdateReferalCodes(PriceRuleId, DiscountCodeId, CustomerReferalCode) { 
    
    //  NOTIFY PROGRESS
    console.log('UpdateReferalCodes');
    /*console.log({
        "PRiceRuleId": PriceRuleId,
        'DiscountCodeId': DiscountCodeId,
        'CustomerReferalCode': CustomerReferalCode
    })*/

    //  RETURN
    return CustomerReferalCode;
}

//  TEST
function test() {
    console.log('this is the test method from ckccrm');
};

//  RETURN THE MODULE
module.exports = ckccrm;