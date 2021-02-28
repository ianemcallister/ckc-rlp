/*
*   WEBHOOK ROUTES MODULE
*/

module.exports = (function() {
    'use strict';
    //  DEFINE DEPENDENCIES
    var webhookRoutes = require('express').Router();
    var ckccrm = require('../crm/ckccrm.js');

    //  GET: /test
    webhookRoutes.get('/test', function(req, res) {

        //  NOTIFY PROGRESS
        console.log('received this test webhook');
        console.log(req.body);

        res.sendStatus(200);
    });

    //  GET: /facebook webhooks
    webhookRoutes.get('/facebook', async function(req, res) {

        //  NOTIFY PROGRESS
        console.log(req.body);

        res.send(req.body["hub.challenge"]);
    });


    //	POST: /sqrwebhook
    webhookRoutes.post('/square', async function(req, res) {
        
        //advise of the post body
        console.log(req.body);



        try {
            
            // work through various options
            if(req.body.type == "loyalty.account.created") {
                var customerPhones = ckccrm.extractPhone(req.body.data.object.loyalty_account.mappings);
                customerPhones.push('+15034513575');    //  REMOVE THIS LATER
                var result = await ckccrm.EnrollReferalCustomer(req.body.data.id, customerPhones); 
                console.log(result);
                res.sendStatus(200);
            }
            

        } catch (error) {
            console.log(error);
        } 

    });

    return webhookRoutes;
})();