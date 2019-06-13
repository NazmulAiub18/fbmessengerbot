const express = require('express');
const uuidV1 = require('uuid/v1');
const config = require.main.require('./config');
const request = require('request');
const db = require.main.require('./model/reply-msg-model');
var router = express.Router();


router.get('/addpages', function(req, res){
		
		res.render('userhome/add_pages');
});

router.post('/viewpages', function(req, res){
		
		request({
			uri: 'https://graph.facebook.com/v3.2/me/accounts',
			qs: { access_token: req.body.uToken },
			method: 'GET'
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
				res.render('userhome/view_pages', JSON.parse(body));
			} else {
				console.error("Unable to retrive user pages.");
				//console.error(response);
				console.error(body);
				res.render('userhome/view_pages');
			}
		});
		
});

router.get('/simplemenu', function(req, res){
		//console.log(uuidV1());
		req.session.buddymail = "nazmul@aiub.edu";
		res.render('userhome/simple_menu',{msg: ""});
});

router.post('/simplemenu', function(req, res){
	
	var cnt_id = uuidV1();
	var btn1_payload = uuidV1();
	var btn2_payload = uuidV1();
	var btn3_payload = uuidV1();
	var btn = [];

	if(req.body.btn_title.length == 1)
	{
		btn = [{
					type:"postback",
					title: req.body.btn_title[0].trim(),
					payload: btn1_payload
				}]
	}
	else if(req.body.btn_title.length == 2)
	{
		btn = [{
					type:"postback",
					title: req.body.btn_title[0].trim(),
					payload: btn1_payload
				},
				{
					type:"postback",
					title: req.body.btn_title[1].trim(),
					payload: btn2_payload
				}]
	}
	else if(req.body.btn_title.length == 3)
	{
		btn = [{
					type:"postback",
					title: req.body.btn_title[0].trim(),
					payload: btn1_payload
				},
				{
					type:"postback",
					title: req.body.btn_title[1].trim(),
					payload: btn2_payload
				},
				{
					type:"postback",
					title: req.body.btn_title[2].trim(),
					payload: btn3_payload
				}]
	}

	var data= {
		email: req.session.buddymail,
		page_id: req.body.page_id.trim(),
		content_type: "simplemenu",
		content_name: req.body.menu_name.trim(),
		content_id: cnt_id,
		content_body:{
			attachment:{
				type:"template",
				payload:{
					template_type:"button",
					text: req.body.menu_title.trim(),
					buttons:btn
				}
			}
		}
	};
	db.insert(data);
	res.render('userhome/simple_menu', {msg : "Succesfully Added Simple Menu!"});
});

router.post('/test', function(req, res){
		
	console.log(req.body);
});

module.exports = router;