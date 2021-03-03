/*
*   FIREBASE
*   
*   This is the Firebase API module
*
*/

//  DEFINE DEPENDENCIES
var admin = require('firebase-admin');

//  INITIALIZE
var serviceAccount = {
    "type": "service_account",
    "project_id": "ckccrm",
    "private_key_id": process.env.CKC_FIREBASE_KEY_ID,
    "private_key": process.env.CKC_FIREBASE_KEY.replace(/\\n/g, '\n'), 
    "client_email": "firebase-adminsdk-quvfo@ckccrm.iam.gserviceaccount.com",
    "client_id": "109224038850864781048",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-quvfo%40ckccrm.iam.gserviceaccount.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ckccrm-default-rtdb.firebaseio.com"
});
var db = admin.database();

//  DEFINE MODULE
var firebaseMod = {
    read: {
        value: ReadValue,
        idByChild: ReadIdByChild
    },
    write: {
        set: set,
        update: update,
        push: push,
        transaction: transaction,
        batch: batch
    },
    test: test
};

/*
*   ReadValue
*
*/
async function ReadValue(path) {
    //  DEFINEL LOCAL VARIABLES
    var ref = db.ref(path);
    ref.on("value", function(snapshot) {
        //console.log(snapshot.val());
        return snapshot.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        return errorObject;
    });
};

/*
*   ReadIdByChild
*
*/
async function ReadIdByChild(collection, field, value) {
    //  NOTIFY PROGRESS
    console.log('searching this child', collection, field, value);

    //  DEFINE LOCAL VARIABLES
    var ref = db.ref(collection);
    ref.orderByChild(field).equalTo(value).on("value", function(querySnapshot) {
        
        if(querySnapshot.numChildren() === 1) {
            querySnapshot.forEach(function(snapshot) {
                console.log('found this key', snapshot.key);
                return(snapshot.key);
            });
        } else {
            querySnapshot.forEach(function(snapshot) {
                console.log('found this key', snapshot.key);
                //return(snapshot.key);
            });
        }
        
    
    }, function (error) {
        console.log(error);
        return(error);
    });
};

//  SET
async function set(path, data) {};

/*
*   UPDATE
*
*   @PARAM(path, data)
*   @RETURN()
*/  
async function update(path, data) {
    //  DEFINE LOCAL VARIABLES
    var ref = db.ref(path);

    //  NOTIFY PROGRESS
    console.log('FB: Writing Update to his path: ', path);
    console.log(data);
    
    ref.update(data, function(error){
        if(error) {
            console.log(error);
            return error;
        } else {
            console.log('successful Firebase update');
            return;
        }
    });
};

//  PUSH
async function push(path, data) {
    //  DEFINE LOCAL VARIABLES
    var writePath = db.ref(path);

    //  NOTIFY PROGRESS
    console.log('FB: writing PUSH to this path', writePath);
    console.log(data);

    //  return value
    return await writePath.push(data)
};

//  TRANSACTION
async function transaction(path, data) {

    //  NOTIFY PRGRESS
    console.log('the Transaction Method received:', path);
    console.log(data);

    //  RETURN
    return true;
};

/*
*  BATCH
*
*   @PARAM(steps) - Array
*   @PARAM(data) - Ojbect
*   @RETURN(result) - boolean
*/
async function batch(steps, data) {
    //  DEFINE LOCAL VARIABLES
    //  NOTIFY PROGESS
    console.log("batch got this data"); console.log(steps); console.log(data);

    //  RETURN
    return 200;
};

//  TEST FUNCTION
function test() {
    console.log('this is the firebase test function');
    var db = admin.database();
    var ref = db.ref("Touchpoints");
    ref.once("value", function(snapshot) {
    console.log(snapshot.val());
    });
};

//  EXPORT MODULE
module.exports = firebaseMod;