var request = require('request');
var cheerio = require('cheerio');
const https = require('https');

var qs =  JSON.stringify({
		"type": "Payment", "result":"tesSUCCESS", "limit":"1000",
		"nextValue":"2", "next":"n", "intmId": "43", "contPer":"" , "name":"" 
		,"regNo":"" ,"email":"", "location":"" , "exchange":"" , "affiliate": "" , 
		"alp":"" , "doDirect":"0" ,"intmIds":""
		
		});
/*
url:"https://www.sebi.gov.in/sebiweb/ajax/other/getintmfpiinfo.jsp"
icici developer API 
https://developer.icicibank.com/rest/sandbox_api_test_request
/api/v1/composite-payment

username : vvanvekar 
password : Uttapa@09876
*/
var sampleRequest = { 
 
    "mobile": "7988000012",
    "device-id": "190160190160190160190160",
    "seq-no": "ICItest1",
    "account-provider": "74",
    "payee-va": "testefrt@icici",
    "payer-va": "uattesting0008",
    "profile-id": "299629",
    "amount": "20000",
    "pre-approved": "P",
    "use-default-acc": "D",
    "default-debit": "N",
    "default-credit": "N",
    "payee-name": "SNS",
    "mcc": "601",
    "merchant-type": "ENTITY",
    "txn-type": "merchantToPersonPay",
    "channel-code": "MICICI",
    "remarks": "none",
    "crpID": "API3",
    "aggrID": "AGGR0008",
    "userID": "USER2",
    "vpa": "testefrt@icici"
};
var options = {
        method: 'POST',
        rejectUnauthorized: false,
        //url: "https://history.ripple.com/v1/accounts/r4cvz8ZLz9xBXWKkQMWpEaeEshQeG2sFxh/transactions?type=Payment&result=tesSUCCESS&limit=1000",
		url:"https://developer.icicibank.com/rest/sandbox_api_test_request/api/v1/composite-payment",
        headers: {
            /*'Content-Type': 'application/x-www-form-urlencoded',*/
			'Content-Type': 'application/json',
			'Content-Length': qs.length,
			'api_key': 'SJZdCDV6HRh62Yy7DGph1lbwhwIFt1v3',
			'x-priority': 1000
        },
		body: sampleRequest

    };


module.exports= { 

		 getUPIs: function() {
						// console.log(" calling UPI Payment providers mobile app ");
						 //console.log(" calling UPI Payment providers mobile app ");
						 console.log(" calling ICICI UPI developer.icicibank.com app-sandbox/1204 ");
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