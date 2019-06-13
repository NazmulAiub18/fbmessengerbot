const config = require.main.require('./config');
const mongo =  require('mongodb').MongoClient;

module.exports = {

	insert: function(entry){
		mongo.connect( config.DB_URL, { useNewUrlParser: true }, function(err, client){
			if(err) throw err;
			client.db("fbwebhook").collection("messenging").insertOne( entry, function(err, res){
				if(err) throw err;
				else
					console.log("data insertion success!");
				client.close();
			});
		});
	}
}