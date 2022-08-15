const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const { text, json } = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("Public"));

app.get("/" , (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , (req , res) => {

    const data = {
        members : [
            {
                email_address : req.body.email,
                status : "subscribed",
                merge_fields : {
                    FNAME : req.body.firstName,
                    LNAME : req.body.lastName
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/b9f559058a";

    const options = {
        method : "POST",
        auth : "sumitx28:7df3772685950c0f44daabf50aa57a65-us11"
    }

    const request = https.request(url , options , function(response){

        if(response.status == 404){
            res.sendFile(__dirname + "/failure.html");
        }
        else{
            res.sendFile(__dirname + "/signup.html");
        }

        // response.on("data" , function(data){
        //     console.log(JSON.parse(data));
        // })
    })

    request.write(jsonData);
    request.end();

})


app.post("/failure" , (req , res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 , (req , res) => {
    console.log("Website started on port " + process.env.PORT);
})


