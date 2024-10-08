// we will learn to communicate third party server without third party library
// we will do it using build in module

// i wrote the raw node code for twilio API with CURL

// more information link : https://www.twilio.com/docs/messaging/quickstart


const https = require("https");

// you will get it after sign up in twilio
const twilio = {
    fromPhone: "+15005550006",
   accountSid: "", 
   authToken: "" 
};

const sendTwilioSMS = (phone, message) => {
    const userPhone = typeof phone === "string" && phone.trim().length === 11 ?
        phone.trim() : false;
    const userMessage = typeof message === "string" && message.trim().length !== 0
        && message.trim().length <= 1600 ? message.trim() : false; // twiliow take 1600 words

    if (userPhone && userMessage) {

        const payload = {
            From: twilio.fromPhone,
            To: userPhone,
            Body: userMessage
        };

        const stringPayload = JSON.stringify(payload);

        // twilio request details
        const requestDetails = {
            hostname: "api.twilio.com",
            method: "POST",
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const request = https.request(requestDetails,response => {
            const status = response.statusCode;
            if(status === 200 || status === 201) {
                console.log(`status = ${status}`);
            } else {
                console.log(`Error is status : ${status}`);
            }
        });

        // this event will fire , when network error only
        request.on("error" , (event) => {
            console.log(event);
        });

        request.write(stringPayload);
        request.end();
    } else {
        console.log("Given Parameters are invalid");
    }
}

sendTwilioSMS("01969330120", "message");