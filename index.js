const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log("We are live on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to my api"+process.env.EMAIL+' ' + process.env.PASSWORD);
});

app.get("/test",(req,res)=>{

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });

      var mailOptions = {
        from: "ronakonline1@gmail.com",
        to: "ronakpareek280@gmail.com",
        subject: "ENTER_YOUR_SUBJECT",
        html: `Hello ROnak`
      };
    
      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          res.send(error);
        } else {
          res.send("Success");
        }
        smtpTransport.close();
      });

});

app.post("/api/v1", (req, res) => {
  var data = req.body;
  console.log(data);

  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: data.email,
    to: "ronakpareek280@gmail.com",
    subject: "Contact Form Mail",
    html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
        console.log(error);
      res.send(error);
    } else {
        console.log("Message sent: " + response.message);
      res.send("Success");
    }
    smtpTransport.close();
  });
});
