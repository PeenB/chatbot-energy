/*var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === "this_is_my_token") {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});

// All callbacks for Messenger will be POST-ed here
app.post("/webhook", function (req, res) {
  // Make sure this is a page subscription
  if (req.body.object == "page") {
    // Iterate over each entry
    // There may be multiple entries if batched
    req.body.entry.forEach(function(entry) {
      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {

        var senderId = event.sender.id;
        sendMessage(senderId, "test")
        if (event.postback) {
          console.log('postback')
          processPostback(event);
        }
      });
    });

    res.sendStatus(200);
  }
});

function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: "EAAaEFbZBT8Q4BANNADAOZBrUZA2qs0dIRONWB5utihx2r6NtMwZAnQdZCnXaQOC9uCNiZBQpDu2RDSKZAL2iSZBzZAbMYuvbxNuaCp00RCjKJ5FEZAUN6DogSW6CdUESByXhtIraiGc1T4bvsZC5gOFjRAAOpSY5ZAAxqMK48vuVu0kORwZDZD",
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
      var message = greeting + "My name is Chat Bot. I can tell you various details. What movie would you like to know about?";
      sendMessage(senderId, {text: message});
    });
  }
}

// sends message to user
function sendMessage(recipientId, message) {
  console.log('sendmsg')
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: "EAAaEFbZBT8Q4BANNADAOZBrUZA2qs0dIRONWB5utihx2r6NtMwZAnQdZCnXaQOC9uCNiZBQpDu2RDSKZAL2iSZBzZAbMYuvbxNuaCp00RCjKJ5FEZAUN6DogSW6CdUESByXhtIraiGc1T4bvsZC5gOFjRAAOpSY5ZAAxqMK48vuVu0kORwZDZD"},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      message: {
          text: message
      },
    }
  }, function(error, response, body) {
    console.log('success', body)
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}*/
