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

//  DEFINE MODULE
var firebaseMod = {
    test: test
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