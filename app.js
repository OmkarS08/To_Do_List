/*--------------------npm packages------------------*/
const express = require("express");
const bodyParser = require("body-parser");

/*--------------------Usage declairation------------------*/
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); // required for body-parser functioning

/*------------------------Global Variable Declairation------------------------------------*/

let newitems = ["item1", "item2", "item3"]; // array is need to store multiple new item 

/*-------------------------Get Request---------------------*/

app.get("/", function(req, res) {
    let today = new Date();
    let option = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
    let day = today.toLocaleDateString("en-US", option);
    // below code is used go displaying date in augmented manner


    res.render("list", { KindOfDay: day, newKindItem: newitems });
    //rendering list.ejs  sending day and newitems variable to ejs
})


/*-------------------------Post Request---------------------*/
app.post("/", function(req, res) {
    let newItem = req.body.newInput;
    //newItem = new item added by the user. 
    newitems.push(newItem);
    res.redirect("/");

})

/*-------------------------Port Declairation---------------------*/
app.listen(3000, function() {
    console.log("connect to port 3000");
})