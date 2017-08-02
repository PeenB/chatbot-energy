const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiaiApp = require('apiai')("0e9ba2bec5f74949a3a2e28e0b879032");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Time
//var time = require('time');
// Create a new Date instance, representing the current instant in time
//var now = new time.Date();

// now.setTimezone("Thailand/BKK");
// `.getDate()`, `.getDay()`, `.getHours()`, etc.
// will return values according to UTC-8
// Default behavior:
//console.log( 'bkk ',now.setTimezone("Asia/Bangkok").toDateString());

//console.log( 'bkk ',now.setTimezone("Asia/Bangkok").toTimeString());
//console.log( 'bkk ',now.setTimezone("Asia/Bangkok").toLocaleTimeString());

// console.log( parseInt(now.setTimezone("Asia/Bangkok").toLocaleTimeString().substring(0,3)))

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});



/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
        if ((now.setTimezone("Asia/Bangkok").toLocaleTimeString().substring(0,1)) === '11' ) {
          if((now.setTimezone("Asia/Bangkok").toLocaleTimeString().substring(3,4)) === '15'){
            sendMessage(event);
          }
        }
      });
    });
    res.status(200).end();
  }
});
const request = require('request');

/*function sendMessage(event) {
  //still need to get specific id
  let sender = event.sender.id;
  let text = "Hi, I'am a chatbot. It's time to close the aircon";

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: "EAAaEFbZBT8Q4BAEwstNB1gjujiEiOgYbMSHbWZAG6y3b7j3ZC7IbeFevFhl59I3o3GvZBr5wdsxWP9zMVSpjC5mIYROrPNFqPZByZAZA2JyEcERzbFUJPuo9omSsGStObJNA1RkXbsZAMVeaOQWoa8DtRQfrdWZAHnygYpWf2buTdgwZDZD"},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}*/
function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  let apiai = apiaiApp.textRequest(text, {
    sessionId: 'tabby_cat' // use any arbitrary id
  });

  apiai.on('response', (response) => {
    // Got a response from api.ai. Let's POST to Facebook Messenger
    apiai.on('response', (response) => {
  let aiText = response.result.fulfillment.speech;

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: "EAAaEFbZBT8Q4BAEwstNB1gjujiEiOgYbMSHbWZAG6y3b7j3ZC7IbeFevFhl59I3o3GvZBr5wdsxWP9zMVSpjC5mIYROrPNFqPZByZAZA2JyEcERzbFUJPuo9omSsGStObJNA1RkXbsZAMVeaOQWoa8DtRQfrdWZAHnygYpWf2buTdgwZDZD"},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: {text: aiText}
      }
    }, (error, response) => {
      if (error) {
          console.log('Error sending message: ', error);
      } else if (response.body.error) {
          console.log('Error: ', response.body.error);
      }
    });
 });
  });

  apiai.on('error', (error) => {
    console.log(error);
  });

  apiai.end();
}
