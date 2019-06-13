"use strict"

$(document).ready(function(){
	$("form").submit(function(e){
		e.preventDefault();
		var mytext = $("#mytext").val();
		var sele = $("#sel").val();
		
		$.ajax({
			url: '/adminhome/search',
			data: {
				txt : mytext,
				sel : sele
			},
			method: 'POST',
			contentType: "application/x-www-form-urlencoded",
			success: function(res){
					$('#result').html(res);
			},
			error: function(err){
					alert(err);
			}
		});
	});
});








