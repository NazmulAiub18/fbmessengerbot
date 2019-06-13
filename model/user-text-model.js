const config = require.main.require('./config');
const mongo =  require('mongodb').MongoClient;

module.exports = {

	insertUserText: function(entry){
		mongo.connect( config.DB_URL, { useNewUrlParser: true }, function(err, client){
			if(err) throw err;
			client.db("fbwebhook").collection("user-text").insertOne( entry, function(err, res){
				if(err) throw err;
				else
					console.log("data insertion success!");
				client.close();
			});
		});
	},

	searchText: function(value, callback){
		mongo.connect( config.DB_URL, { useNewUrlParser: true }, function(err, client){
			if(err) throw err;
			var query = { user_text: value };
			client.db("fbwebhook").collection("user-text").findOne(query, (function(err, res){
				if(err) throw err;
				else
					callback(res);
					//console.log(res.user_text);
				client.close();
			}));
		});
	},

	replyText: function(value, pageID, callback){
		mongo.connect( config.DB_URL, { useNewUrlParser: true }, function(err, client){
			if(err) throw err;
			var query = { user_text: value, page_id: pageID };
			client.db("fbwebhook").collection("user-text").find(query).toArray(function(err, res){
				if(err) throw err;
				else
					callback(res);
					//console.log(res.user_text);
				client.close();
			});
		});
	}

}