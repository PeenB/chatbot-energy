const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const schedule = require('node-schedule');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






///time alert///

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// this is every 10 second of a minute
var j = schedule.scheduleJob('10 * * * * *', function(){
  getCommunityId(comunityid =>{
  console.log("this is communityid", comunityid);
  getMember(comunityid, members => {
    console.log('communityiddddddddd', comunityid);
    // console.log("all member", members);
    console.log("# of members", members.length);
    filterUser(members)
  })
})

  console.log('17.00 ');
});

///////////
function getCommunityId(callback) {
  request({

    uri: 'https://graph.facebook.com/community/',
    qs: { access_token: "DQVJ0Q0I0TDV4VTRQU3A4alhEOTVaUVFOTHJ2VzVQQXBOODJWYkdtUXdiWGU4YVlRTi1SelFhS3NfQjJuTXZAmaVN2alBpRk41TjkxaF9LQV9mRnBRc184dTJxN0dJaHNTR1FCSHFQUFBNQmNmTms0SnJZAZAXJzcVRFRlZAfTW53c0xhUVVISm5HdUtlaFpMalVGS1NocllRMHBHUU15Nm1ZAbnFNZAXRNYkptbW9Qbms3NVgxY0NBdjN5Q2I3eDZAESTJjdUxPeHl3" },
    method: 'GET',
  }, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      console.log('Successfully get all member')
      var id = JSON.parse(body);
      console.log("community ID", id.id );
      communityId = id.id

      callback(communityId)
    } else {
      console.error("Unable to get community id");
      console.error(response);
      console.error(error);
    }
  });
}

function getMember(communityid, callback) {
  console.log('getMember- communityid', communityid);
  request({

    uri: 'https://graph.facebook.com/'+communityid+'/members?limit=1000',
    qs: { access_token: "DQVJ0Q0I0TDV4VTRQU3A4alhEOTVaUVFOTHJ2VzVQQXBOODJWYkdtUXdiWGU4YVlRTi1SelFhS3NfQjJuTXZAmaVN2alBpRk41TjkxaF9LQV9mRnBRc184dTJxN0dJaHNTR1FCSHFQUFBNQmNmTms0SnJZAZAXJzcVRFRlZAfTW53c0xhUVVISm5HdUtlaFpMalVGS1NocllRMHBHUU15Nm1ZAbnFNZAXRNYkptbW9Qbms3NVgxY0NBdjN5Q2I3eDZAESTJjdUxPeHl3" },
    method: 'GET',
  }, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      console.log('Successfully get all member')
      var json = JSON.parse(body);
      console.log(json)
      callback(json.data)
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });



getCommunityId(comunityid =>{
  console.log("this is communityid", comunityid);
  getMember(comunityid, members => {
    console.log('communityiddddddddd', comunityid);
    // console.log("all member", members);
    console.log("# of members", members.length);
    
    filterUser(members)
  })
})
function filterUser(members) {
  for (x=0; x< members.length ; x++){
    console.log(members[x].id, members[x].name);

    sendTextMessage(members[x].id , "hello " +members[x].name + "  turn off aircondition please")
  }

}





////
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
      }
    };
    callSendAPI(messageData);

  }

  function callSendAPI(messageData) {


  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: "DQVJ0N2ktcHFTcm1CWnZAXOW1nSm1PUmk3UHk2LUlDX21CMzRVTjEwc3I5S2UzSVo2aW56MDF6SGdwSkozSHk5blphclU1MjZADeVd5cmpod1dqOFdaZAThLN1lpN09lOGYwSGgzazRhOXAxSWNuRzdTRXRSVVdmOEd5RnBuOXN1QjFaV21ZALXB0VENzcHZAQcTh3dzc4ZAjZA6ZA1FYbmZANUkZAqWUxaMUtXcjJoa2w4aHA4WENyby1WOVlYWERuX0dWc2owMFJnMXV3" },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {

    if (!error && response.statusCode == 200) {


      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}

////











//Time
var time = require('time');
// Create a new Date instance, representing the current instant in time
var now = new time.Date();

// now.setTimezone("Thailand/BKK");
// `.getDate()`, `.getDay()`, `.getHours()`, etc.
// will return values according to UTC-8
// Default behavior:
console.log( 'bkk ',now.setTimezone("Asia/Bangkok").toDateString());

console.log( 'bkk ',now.setTimezone("Asia/Bangkok").toTimeString());
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

function sendMessage(event) {
  //still need to get specific id
  let sender = event.sender.id;
  let text = "Hi, I'am a chatbot. It's time to close the aircon";

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: "DQVJ0N2ktcHFTcm1CWnZAXOW1nSm1PUmk3UHk2LUlDX21CMzRVTjEwc3I5S2UzSVo2aW56MDF6SGdwSkozSHk5blphclU1MjZADeVd5cmpod1dqOFdaZAThLN1lpN09lOGYwSGgzazRhOXAxSWNuRzdTRXRSVVdmOEd5RnBuOXN1QjFaV21ZALXB0VENzcHZAQcTh3dzc4ZAjZA6ZA1FYbmZANUkZAqWUxaMUtXcjJoa2w4aHA4WENyby1WOVlYWERuX0dWc2owMFJnMXV3"},
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
}
