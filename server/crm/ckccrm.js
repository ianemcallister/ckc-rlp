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
    xCreateCustomerReferalCode: CreateCustomerReferalCode,
    GenerateCustomerReferalCode: GenerateCustomerReferalCode,
    xCreateShopifyPriceRule: CreateShopifyPriceRule,
    xCreateShopifyDiscountCode: CreateShopifyDiscountCode,
    xUpdateReferalCodes: UpdateReferalCodes,
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
    var PriceRuleId = await CreateShopifyPriceRule();
    var DiscountCodeId = await CreateShopifyDiscountCode(PriceRuleId, CustomerReferalCode);
    
    //  NOTIFY PROGESS
    console.log('CreateCustomerReferalCode');
    console.log({
        'CustomerReferalCode': CustomerReferalCode,
        'PriceRuleId': PriceRuleId,
        'DiscountCodeId': DiscountCodeId,
        'ckcCustomerId': ckcCustomerId
    })

    //  RETURN
    return await UpdateReferalCodes(PriceRuleId, DiscountCodeId, CustomerReferalCode);
};

//  NotifyNewReferalCustomer
async function NotifyNewReferalCustomer(customerPhone, CustomerReferalCode) {
    //  DEFINE LOCAL VARIABLES
    
    //  NOTIFY PROGESS
    console.log('NotifyNewReferalCustomer');
    console.log({
        'customerPhone': customerPhone,
        'CustomerReferalCode': CustomerReferalCode
    })

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
async function CreateShopifyPriceRule() {
    //  DEFINE LOCAL VARIABLES
    var PriceRuleId = "22";

    //  NOTIFY PROGESS
    console.log('CreateShopifyPriceRule', PriceRuleId);

    //  RETURN
    return PriceRuleId;
};

//  CreateShopifyDiscountCode
async function CreateShopifyDiscountCode(PRiceRuleId, CustomerReferalCode) {
    //  DEFINE LOAL VARIABLES
    var DiscountCodeId = "11";

    //  NOTIFY PROGRESS
    console.log('CreateShopifyDiscountCode');
    console.log({
        "PRiceRuleId": PRiceRuleId,
        'CustomerReferalCode': CustomerReferalCode
    })

    //  RETURN
    return DiscountCodeId;
};

//  UpdateReferalCodes
async function UpdateReferalCodes(PriceRuleId, DiscountCodeId, CustomerReferalCode) { 
    //  RETURN

    //  NOTIFY PROGRESS
    console.log('UpdateReferalCodes');
    console.log({
        "PRiceRuleId": PriceRuleId,
        'DiscountCodeId': DiscountCodeId,
        'CustomerReferalCode': CustomerReferalCode
    })

    return CustomerReferalCode;
}

//  TEST
function test() {
    console.log('this is the test method from ckccrm');
};

//  RETURN THE MODULE
module.exports = ckccrm;