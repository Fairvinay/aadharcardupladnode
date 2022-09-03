var request = require('request');
var cheerio = require('cheerio');
const https = require('https');

var qs =  JSON.stringify({
		"type": "Payment", "result":"tesSUCCESS", "limit":"1000",
		"nextValue":"2", "next":"n", "intmId": "43", "contPer":"" , "name":"" 
		,"regNo":"" ,"email":"", "location":"" , "exchange":"" , "affiliate": "" , 
		"alp":"" , "doDirect":"0" ,"intmIds":""
		
		});

var options = {
        method: 'POST',
        rejectUnauthorized: false,
        //url: "https://history.ripple.com/v1/accounts/r4cvz8ZLz9xBXWKkQMWpEaeEshQeG2sFxh/transactions?type=Payment&result=tesSUCCESS&limit=1000",
		url:"https://www.sebi.gov.in/sebiweb/ajax/other/getintmfpiinfo.jsp",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': qs.length
        },
		

    };


module.exports= { 

		 getUPIs: function() {
						 console.log(" calling UPI Payment providers mobile app ");
						 
						var req = https.request(options, (resp) => {
							  let data = '';

							  // A chunk of data has been received.
							  resp.on('data', (chunk) => {
								data += chunk;
								
								
							  });

							  // The whole response has been received. Print out the result.
							  resp.on('end', () => {
								console.log(data);
								
								var $ = cheerio.load(data);
								$('.fpi-table').each(function(i, element){
								  var a = $(this).prev();
								  console.log(a.text());
								});
								
							  });

							}).on("error", (err) => {
							  console.log("Error: " + err.message);
							});
						 req.write(qs);
						 req.end();
						/*request(options, function (error, response, html) {
							if (!error && response.statusCode == 200) {
							  console.log(html);
							  
							   var $ = cheerio.load(html);
								$('table.table table-striped table-hover reco-table fpi-table').each(function(i, element){
								  var a = $(this).prev();
								  console.log(a.text());
								  
								  
								});
							}
							else { 
							console.log(" calling UPI Paymen failed pp ");
							}
							
						});
						*/
		 }

}