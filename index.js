'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

//Process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Route

app.get('/', function(req, res){
  res.send("Hi, I'm a chatbot")
})

let token = "EAAaEFbZBT8Q4BAD58kI0o8dWS18hZCPejSPTqTGsF7NWP7qYmWmetQYOFxofaYs2nmqAkUr9clslNWC3w4yBia9ES3tlFXQcbVC8DSTC7BxQXok2G5H2IHuCNZBf3KhPvm30uisHG33QmwPi5kWkW1KouGeZCL0zjGsnxjiR0wZDZD"
 //Facebook

 app.get('/webhook/', function(req, res){
   if(req.query['hub.verify_token'] === "blondiebytes"){
     res.send(req.query['hub.challenge'])
   }
   res.send("Wrong Token!!!")
 })
 /*
 app.post('/erbhook/', function(req, res){
   let messaging_events = req.body.entry[0].messaging_events
   for (;et i =0;i<messaging_events.length;i++){
     ler event = messaging_events[i]
     let sender = event.sender.id
     if(event.message && event.message.text){
       let text - event.message.text
       sendText(sender, "Text echo:" + text.substring(0,100))
     }
   }
   res.sendStatus(200)
 })


 function sendText(sender, text){
   let messageData = {text: text}
   request({
     url: "https://graph.facebook.com/v2.6/me/messages",
     qs : {access_token, token}
     method: "POST"
     json: {
       receipt: {id: sender},
       message: messageData
     }
   }, function (error,response,body){
     if (error){
       console.log("sending error")
     } else if (response.body.error) {
       console.log("response body error")
     }
   })
 }
*/
app.listen(app.get('port'), function(){
  console.log("running: port")
})
