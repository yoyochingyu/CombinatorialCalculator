const express = require("express"),
            app = express(),
            bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

    app.get("/",(req,res)=>{
        console.log("You've reached the landing page!");
    });

    app.listen(8080,()=>{
        console.log("Server has started!");
    });