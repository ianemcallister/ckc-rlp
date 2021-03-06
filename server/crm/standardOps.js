/*
*   STANDARD OPERATIONS FOR 29 KETTLE
*
*/

//  DECLARE DEPENDENCIES
var fs 		          = require('fs');
var path 	          = require('path');
var csvToJson         = require('convert-csv-to-json');
var moment            = require('moment-timezone');
var Square            = require('../square/sqr.js');
var Shopify           = require('../shopify/shopify.js');
var Firebase          = require('../firebase/firebase.js');

//  DEFINE MODULE 
var standOpsMod = {
    _download:{
        SquareCustomers: DownloadSquareCustomers
    },
    _read: {
        csvFile: ReadCSVFile
    },
    _upload: {
        jsonObject: UploadJsonObject
    },
    _build: {
        SquarePaymentWriteBatch: _buildSquarePaymentWriteBatch
    },
    Touchpoints: {
        Record: RecordTouchpoint
    },
    SyncCustomers: {
        All: syncAllCustomers,
        Square: syncSquareCustomers,
        Shopify: syncShopifyCustomers,
        Facebook: syncFacebookCustomers,
        IG: syncIGCustomers
    },
    test: test
};

//
function _incrimentLTV(oldValue, adding) { return (parseInt(oldValue) + parseInt(adding)).toString; };
function _formatDate(format, value) { return moment(value)('America/Los_Angeles').format(format); };
function _incrimentTC(oldValue) { return (parseInt(oldValue) + 1).toString; };


/*
*   PRIVATE
*   BUILD SUQARE PAYMENT WRITE BATCH
*
*   @PARAM("paymentId") - String
*   @RETURN({steps: [], data:{}})
*/
async function _buildSquarePaymentWriteBatch(paymentId) {
    //  NOTIFY PROGRESS
    console.log('build square payment writes running');

    //  DEFINE LOCAL VARIABLES
    var touchpointReadPath = path.join(__dirname, '..', 'models/touchpoint_schema.json');
    var touchPointFile = fs.readFileSync(touchpointReadPath, 'utf8');
    var touchpointObject = JSON.parse(touchPointFile);
    var paymentRecord = await Square.Payments.Get(paymentId);
    
    //  NOTIFY PROGESS
    //console.log('customer Id', CKCcustomerId);

    //  add touchpoint
    touchpointObject.type           = "payment";
    touchpointObject.source         = "square";
    touchpointObject.id             = paymentId;
    touchpointObject.customer_id    = await Firebase.read.idByChild('/Customers', 'SquareCustomerID', paymentRecord);
    touchpointObject.created_at     = paymentRecord.payment.created_at;
    touchpointObject.updated_at     = paymentRecord.payment.updated_at;
    touchpointObject.value          = paymentRecord.payment.amount_money.amount;
    await Firebase.write.push('/Touchpoints', touchpointObject);

    //  update customer
    var customerRecord = await Firebase.read.value('/Customers/' + CKCcustomerId);
    await Firebase.write.update('/Customers/' + CKCcustomerId, {
        "LTV": _incrimentLTV(customerRecord.LTV, returnObject.data.amount_money.amount),
        "LastVisit": _formatDate("YYYY-MM-DD", returnObject.data.created_at),
        "TransactionCount": _incrimentTC(customerRecord.TransactionCount)
    });
    //TransactionCount
    //LTV
    //LastVisit
};

/*
*   READ CSV FILE
*
*   @PARAM(Filepath)
*   @RETURN(success/failure)
*/
async function ReadCSVFile(filepath) {
    //  DEFINE LOCAL VARIABLES
    var readPath = path.join(__dirname, '..', '/models/comprehensive_customer_list.csv');
    var inputFileName = readPath;
    var customerObjet = [];
    
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(inputFileName);

    for(let i=0; i<json.length;i++){
        customerObjet.push(json[i]);
    }
    
    var writepath = path.join(__dirname, '..', '/models/CombinedCustomerList.json');

	fs.writeFile(writepath, JSON.stringify(customerObjet, null, '\t'), 'utf8', function (err) {
		if (err) {
		    return console.log(err);
		}

		console.log("The file was saved!");	
	});
};

/*
*   UPLOAD JSON OBJECT
*
*/
async function UploadJsonObject(filePath) {
    //  DEFINE LOCAL VARIABLES
    
    try {
        
    } catch (error) {
        console.error(error);
        return error;
    }
}

/*
*   DOWNLOAD SQUARE CUSTOMERS
*
*/
async function DownloadSquareCustomers() {
    //  DEFINE LOCAL VARIABLS

    //  RUN ASYNC WORK
    try {

        return await Square.list.customers();
    
    //  HANDLE ERRORS
    } catch (error) {
        console.log(error);
        return error;
    }

    //  RETURN
};

/*
*   RECORD TOUCHPOINT
*
*   @PARAM(touchObject) - Ojbect
*   { type: "payment" || "post", id: "some_string_id", "source": "square" || "shopify" || "facebook" }
*/
async function RecordTouchpoint(touchObject) {
    //  DEFINE LOCAL VARIABLES
    var type = touchObject.type;
    var source = touchObject.source;
    var id = touchObject.id;
     
    //  NOTIFY PROGRESS
    console.log('RecordTouchpoint: received this touch object');
    console.log(touchObject);

    //1. collect transaction details from channel (Square, Shopify, Facebook, etc)
    //2. New or returning customer?
    //3. Transaction location known?
    //4. Write Firebase Transaction (a. Touchpoint, Customer, Reporting)

    try {
        if(type == 'payment' && source == "square") {
            return await _buildSquarePaymentWriteBatch(id)
        } else if(type == 'payment' && source == "shopify") {
            return 200;
        } else if(type == 'payment' && source == "facebook") {
            return 200;
        } else if(type == 'post' && source == "facebook") {
            return 200;
        } else {
            return 400;
        }
        
    } catch (error) {
        console.log(error);
        return error;
    }
};

/*
*   SYNC ALL CUSTOMERS
*
*/
async function syncAllCustomers() {};

/*
*   SYNC SQUARE CUSTOMERS
*
*/
async function syncSquareCustomers() {};

/*
*   SYNC SHOPIFY CUSTOMERS
*
*/
async function syncShopifyCustomers() {};

/*
*   SYNC FACEBOOK CUSTOMERS
*
*/
async function syncFacebookCustomers() {};

/*
*   SYNC IG CUSTOMERS
*
*/
async function syncIGCustomers() {};


//  FUNCTION TEST
function test() {
    console.log('this is the starndard Ops Module');
}

//  EXORT MODULE
module.exports = standOpsMod;