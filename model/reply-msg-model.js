const config = require.main.require('./config');
const mongo =  require('mongodb').MongoClient;

module.exports = {

	insert: function(entry){
		mongo.connect( config.DB_URL, { useNewUrlParser: true }, function(err, client){
			if(err) throw err;
			client.db("fbwebhook").collection("reply-msg").insertOne( entry, function(err, res){
				if(err) throw err;
				else
					console.log("data insertion success!");
				client.close();
			});
		});
	},

	search: function(pg_id, msg_id, callback){
		mongo.connect( config.DB_URL, { useNewUrlParser: true }, function(err, client){
			if(err) throw err;
			var query = { page_id: pg_id, content_id: msg_id };
			client.db("fbwebhook").collection("reply-msg").findOne(query, (function(err, res){
				if(err) throw err;
				else
					callback(res);
					//console.log(res.user_text);
				client.close();
			}));
		});
	}

}