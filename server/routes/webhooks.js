/*
*   WEBHOOK ROUTES MODULE
*/

module.exports = (function() {
    'use strict';
    //  DEFINE DEPENDENCIES
    var webhookRoutes = require('express').Router();
    var ckccrm = require('../crm/ckccrm.js');

    /*
    *   GET: /test
    *
    *   
    */
    webhookRoutes.get('/test', function(req, res) {

        //  NOTIFY PROGRESS
        console.log('received this test webhook');
        console.log(req.body);

        res.sendStatus(200);
    });

    /*
    *   GET: /facebook webhooks
    *
    *   Facebook verication hook
    */  
    webhookRoutes.get('/facebook', async function(req, res) {
        //  DEFINE LOCAL VARIABLES
        var hubChallenge = req.query['hub.challenge'];

        //  NOTIFY PROGRESS
        console.log(req.query);

        res.send(hubChallenge);
    });

    /*
    *   POST: /facebook webhooks
    *
    *   FACEBOOK event notificaitons
    */
    webhookRoutes.post('/facebook', async function(req, res) {
        //  DEFINE LOCAL VARIABLES
        var field = req.body.field;

        //  NOTIFY PROGRESS
        console.log(req.body);

        //  EVALUATE
        try {
            if(field == "mention") {
                console.log('responding to ', req.body.value.sender_id);
                res.send(200);
            }
            
        } catch (error) {
            
        };

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