//
// Lets bot
//

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
var exSession = require('express-session');
const userhome = require('./controllers/user_home');
const fb = require.main.require('./messaging/send-messages.js');
const config = require.main.require('./config');
const db = require.main.require('./model/user-text-model');
const messenging = require.main.require('./model/messenging-model');
var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>Created By Nazmul Islam!</body></html>";

let app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'fbapiall', saveUninitialized: true, resave: false}));
app.use('/script', express.static('resource'));
app.use('/userhome', userhome);

// Webhook validation
app.get('/webhook', function(req, res)
{
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.VERIFY_TOKEN)
	{
		console.log("Webhook Validated!");
		res.status(200).send(req.query['hub.challenge']);
	}
	else
	{
		console.error("Failed validation. Make sure the validation tokens match.");
		res.sendStatus(403);
	}
});

// Display the web page
app.get('/', function(req, res)
{
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(messengerButton);
	res.end();
});

app.get('/simple_menu', function(req, res)
{
	res.redirect('/simple_menu');
});

// Message processing
app.post('/webhook', function (req, res)
{
  //console.log(req.body);
	var data = req.body;

  // Make sure this is a page subscription
	if (data.object === 'page')
	{
    
		// Iterate over each entry - there may be multiple if batched
		data.entry.forEach(function(entry)
		{
			var pageID = entry.id;
			var timeOfEvent = entry.time;

////////////////////////////////////////////////////////////////////////////////////////////	  
			messenging.insert(entry);
////////////////////////////////////////////////////////////////////////////////////////////	  
		// Iterate over each messaging event
			if(entry.messaging)
			{
				entry.messaging.forEach(function(event)
				{
					if (event.message)
					{
						receivedMessage(event);
					}
					else if (event.postback)
					{
						receivedPostback(event);
					}
					else
					{
						console.log("Webhook received unknown event: ", event);
						//console.log("Webhook received unknown event!");
					}
				});
			}
			else if(entry.standby)
			{
				entry.standby.forEach(function(event)
				{
					console.log(event.message);
				});
			}
		});
		res.sendStatus(200);
	}
});


function receivedMessage(event)
{
	var senderID = event.sender.id;
	//fb.markSeen(senderID);
	//fb.typingOn(senderID);
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;
	var message = event.message;
	var quickReply = message.quick_reply;

	console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    //console.log(JSON.stringify(message));

	var messageId = message.mid;

	var messageText = message.text;
	var messageAttachments = message.attachments;

	if (messageText && !quickReply)
	{
		//console.log(messageText);
		db.replyText(messageText, recipientID, function(status){
			if(status.length > 0)
			{
				for(var i=0; i < status.length; i++)
				{
					//console.log("sending reply");
					config.callSendAPI3(senderID, status[i].message);
				}		
			}
			else
			{
				//console.log("sending menu");
				fb.sendMenu(senderID);
			}
		});
	}
	else if(messageText && quickReply)
	{
		switch (quickReply.payload)
		{
			case 'btn1':
				fb.passThreadControl(senderID);
				break;
			case 'btn2':
				fb.sendTextMessage(senderID, "Postback for BTN2 received!");
				break;
			default:
				fb.sendTextMessage(senderID, "Postback recieved " + quickReply.payload);
				fb.sendMenu(senderID);
		}
	}
	else if (messageAttachments)
	{
		fb.sendTextMessage(senderID, "Message with attachment received");
	}	
	//fb.typingOff(senderID);
}

function receivedPostback(event)
{
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfPostback = event.timestamp;
  
	var payload = event.postback.payload;

	console.log("Received postback for user %d and page %d with payload '%s' " + "at %d", senderID, recipientID, payload, timeOfPostback);
	
	switch (payload)
	{
		case 'gts':
			fb.sendAudio(senderID);
			break;
		case 'rv':
			fb.sendVideo(senderID);
			break;
		case 'aqr':
			fb.quickReplyAll(senderID);
			break;
		case 'qrbtn2':
			fb.quickReplyBtn2(senderID);
			break;
		default:
			fb.sendTextMessage(senderID, payload);
    }
}

//////////////////////////
// Sending helpers
//////////////////////////


function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  config.callSendAPI(messageData);
}



// Set Express to listen out for HTTP requests
var server = app.listen(3000, function () {
  console.log("Listening on port %s", server.address().port);
});