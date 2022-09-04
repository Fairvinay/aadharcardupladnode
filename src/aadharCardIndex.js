const express = require('express');
const cluster = require('cluster');
//const dbr = require('barcode4nodejs');
const envconfig = require('dotenv').config({ path:__dirname+'/./../.env' })

var ejs = require('ejs');
var path = require('path');

//var cheerio = require('cheerio');

const { generateKeyPair } = require('crypto');

//Check the number of available CPU 
const numCPUs = require('os').cpus().length;

const app = express();

const upiIDs  = require('./scrap/scrap');

const PORT = 61749; 

// For MAster process 
if(cluster.isMaster) {

 console.log(` Master ${process.pid} is running numCPUs ${numCPUs} `);
  
  // Fork workers. 
  for(let i = 0; i < numCPUs; i++) { 
    cluster.fork();
  } 

  // This event is fired when the worker died  
  cluster.on('exit',(worker , code, signal) => { 
             console.log(` worker ${ worker.process.pid} died `);
   });
}
// For Worker 
else {
   // Workers can share any TCP connection 
   // In this case it is an HTTP server 
   app.listen(PORT, err => { 
           err ? console.log("error is server setup "): 
                console.log(` Worker ${process.pid} started `);
    });
  console.log(` __dirname name ${__dirname} `);
  console.log('env consolelog '+JSON.stringify(envconfig));
   app.use('/localcss', express.static(__dirname +'/css'));
    app.use('/upload', express.static(__dirname +'/upload'));
	
	app.use('/js', express.static(__dirname + '/./../node_modules/bootstrap/dist/js'));
    app.use('/jquery', express.static(__dirname + '/./../node_modules/jquery/dist'));
    app.use('/css', express.static(__dirname + '/./../node_modules/bootstrap/dist/css'));
   /************************* EEXPRESSS SETIING the VIEW ENNINGE ************ */
    //Notice //set express view engine to ejs
    app.set("view engine", "ejs");
  
   // API endPint
   // Send Addhaar Upload page
   var emailTemplate  = "";
   app.get('/readCard', (req, res) => { 
         // https://www.npmjs.com/package/barcode4nodejs
	/*dbr.initLicense("t0068NQAAACwiu6aXm/RiDD7y6oAZlmMZOA5c6n1Gz8g3RyCV8qM7FcX1Yv8iY1GRN+ZerYU/hXcIeg2CIfAJzhsms30pQ40=")
         dbr.decodeFileAsync("./qr_code_PNG34.png", dbr.formats.OneD | dbr.formats.PDF417 | dbr.formats.QRCode | dbr.formats.DataMatrix | dbr.formats.Aztec, function(err, msg){
         	console.log(msg)
          }, "");
	*/
	 ejs.renderFile(path.join(__dirname, "views/upoad_addhar_template.ejs"),
         {         
           requesterName : "Vinayak Anvekar",
           recepientName : "Sanket",
           recepientOfcEmail : "vinayak.anvekar@lntinfotech.com",
           recepientPersonEmail : "vickyscab24@gmail.com",
           requesterDesig : "Angular UX - Developer"
         })
         .then(result => {
          emailTemplate = result;
          res.send(emailTemplate);
         })
	  console.log(" calling UPI IDs end");
	  upiIDs.getUPIs(req);		
	    console.log(" calling UPI IDs end");
	
    
   });

}