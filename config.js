const request = require('request');
const mongo =  require('mongodb').MongoClient;

module.exports = {
	PAGE_ACCESS_TOKEN: "EAAFQji4r3ZBUBAOetodVHwlo3yZCYmKBbOdjp5SV7aBjJl54VlAFc1Hifx9Nz0dzSnmcSZAAr2twqhPDkTfTZAC7adXaOdrBqBC2L7Go3YLoErZARMHQPNgZBjqfXAOnEO3ZBVnLkQZBtsYLarUulAbULR5PvoZBa1Bu7YyTuFzoBcgZDZD",
	VERIFY_TOKEN: "test",
	SECONDARY_APP_ID: 263902037430900,
	DB_URL: "mongodb://localhost:27017/",
	
	callSendAPI: function(messageData){
		request({
			uri: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: this.PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: messageData
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var recipientId = body.recipient_id;
				var messageId = body.message_id;
				console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
				console.log(body);
			} else {
				console.error("Unable to send message.");
				console.error(response);
				console.error(error);
			}
		});
	},
	
	callSendAPI2: function(messageData){
		request({
			uri: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
			qs: { access_token: this.PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: messageData
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var recipientId = body.recipient_id;
				var messageId = body.message_id;
			} else {
				console.error("Unable to send message.");
			}
		});
	},

	callSendAPI3: function(recipientId, messageData){

		var msg = {
			recipient: {
				id: recipientId
			},
			message: messageData
		};
		//console.log(msg);
		request({
			uri: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: this.PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: msg
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var recipientId = body.recipient_id;
				var messageId = body.message_id;
				console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
			} else {
				console.error("Unable to send message.");
				//console.error(response);
				console.error(body);
				console.error(error);
			}
		});
	}
}