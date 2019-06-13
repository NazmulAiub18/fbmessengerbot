const config = require.main.require('./config');

module.exports = {
	
	sendTextMessage: function(recipientId, messageText){
		var messageData = {
			recipient: {
				id: recipientId
			},
			message: {
				text: messageText
			}
		};
		config.callSendAPI(messageData);
	},
	
	sendMenu: function(recipientId){
		var messageData = {
			recipient: {
				id: recipientId
			},
			message: {
				attachment: {
					type: "template",
					payload: {
						template_type: "button",
						text: "<-- Main Menu -->",
						buttons:[
						{
							type: "postback",
							title: "QR Two BTn",
							payload: "qrbtn2"
						},       
						{
							type: "postback",
							title: "Random Videos!",
							payload: "rv"
						},
						{
							type: "postback",
							title: "All QR",
							payload: "aqr"
						}
						]
					}
				}
			}
		};
		config.callSendAPI(messageData);
	},
	
	sendAudio: function(recipientId){
		const get_random_song = ((ar) => ( ar[ Math.floor( Math.random() * ar.length ) ] ))
		var song1 = "http://docs.google.com/uc?export=open&id=0B80xfrsPl23cZ044YW1QMWI1QW8"; 
		const song = [song1];

		var messageData = {
			recipient: {
				id: recipientId
			},
			message: {
				attachment: {
					type: "audio",
					payload: {
						url: get_random_song( song )
					}
				}
			}
		};
		config.callSendAPI(messageData);
	},
	
	sendVideo: function(recipientId){
		const get_random_video = ((ar) => ( ar[ Math.floor( Math.random() * ar.length ) ] ))
		var video1 = "http://docs.google.com/uc?export=open&id=0B80xfrsPl23cZ044YW1QMWI1QW8"; 
		const video = [video1];

		var messageData = {
			recipient: {
				id: recipientId
			},
			message: {
				attachment: {
					type: "video",
					payload: {
						url: get_random_video( video )
					}
				}
			}
		};
		config.callSendAPI(messageData);
	},
	
	quickReplyAll: function(recipientId){
		var messageData = {
			recipient: {
				id: recipientId
			},
			message: {
				text: "Here is a quick reply!",
				quick_replies:[
				{
					content_type:"text",
					title:"Search",
					payload:"<POSTBACK_PAYLOAD>",
					image_url:"http://example.com/img/red.png"
				},
				{
					content_type:"location"
				},
				{
					content_type:"user_phone_number"
				},
				{
					content_type:"user_email"
				}
				]
			}
		};
		config.callSendAPI(messageData);
	},
	
	quickReplyBtn2: function(recipientId){
		var messageData = {
			recipient: {
				id: recipientId
			},
			message: {
				text: "Here is a quick reply!",
				quick_replies:[
				{
					content_type:"text",
					title:"Button1",
					payload:"btn1",
					image_url:"https://freedesignfile.com/upload/2015/10/3D-email-symbol-icon.jpg"
				},
				{
					content_type:"text",
					title:"Button2",
					payload:"btn2",
					image_url:"https://4vector.com/i/free-vector-ok-icon_101807_OK_icon.png"
				}
				]
			}
		};
		config.callSendAPI(messageData);
	},
	
	typingOn: function(recipientId){
		var messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_on"
		};
		config.callSendAPI(messageData);
	},
	
	typingOff: function(recipientId){
		var messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "typing_off"
		};
		config.callSendAPI(messageData);
	},
	
	markSeen: function(recipientId){
		var messageData = {
			recipient: {
				id: recipientId
			},
			sender_action: "mark_seen"
		};
		config.callSendAPI(messageData);
	},
	
	passThreadControl: function(recipientId){
		var messageData = {
			recipient: {
				id: recipientId
			},
			target_app_id: config.SECONDARY_APP_ID,
			metadata: "Pass Control to Page Inbox -->"
		};
		config.callSendAPI2(messageData);
	},
	
	callButton: function(recipientId, txt, btntxt, number){
		var messageData = {
			recipient:{
				id: recipientId
			},
			message:{
				attachment:{
					type: "template",
					payload:{
						template_type: "button",
						text: txt,
						buttons:[
						{
							type: "phone_number",
							title: btntxt,
							payload: number
						}
						]
					}
				}
			}
		};
		config.callSendAPI(messageData);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}