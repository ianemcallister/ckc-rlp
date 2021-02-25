/*
*   WEBHOOK ROUTES MODULE
*/

module.exports = (function() {
    'use strict';
    //  DEFINE DEPENDENCIES
    var webhookRoutes = require('express').Router();
    var ckccrm = require('./crm/ckccrm.js');

    //  GET: /test
    webhookRoutes.get('/test', function(req, res) {

        //  NOTIFY PROGRESS
        console.log('received this test webhook');
        console.log(req.body);

        res.sendStatus(200);
    });

    //	POST: /sqrwebhook
    webhookRoutes.post('/square', async function(req, res) {
        
        //advise of the post body
        console.log(req.body);

        try {
            var result = await ckccrm.EnrollReferalCustomer('aoshdgES98hvs', '+15551112222'); 
            console.log(result);
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
        } 

    });

    return webhookRoutes;
})();