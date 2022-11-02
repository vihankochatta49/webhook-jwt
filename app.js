const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const config = require('./config');
const path = require('path');
// Generate a JWT token to authenticate and make Zoom API calls 
const payload = {
    iss: config.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.ZOOM_API_SECRET);
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.send("Power your app with Webhooks!");

});

// Set up a webhook listener for your Webhook Event 
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {

    let event;

    try {
        event = JSON.parse(req.body);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Check to see if you received the event or not.
    console.log(event)
    console.log(event.payload.object.recording_files);
    if (req.headers.authorization === config.VERIFICATION_TOKEN) {
        res.status(200);
        res.send();
    } else {
        res.status(403).end('Access forbidden');
        console.log("Invalid Post Request.")
    }
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})
