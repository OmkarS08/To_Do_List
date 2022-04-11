/*--------------------npm packages------------------*/
const express = require("express");
const bodyParser = require("body-parser");

/*--------------------Usage declairation------------------*/
const app = express();
app.set('view engine', 'ejs'); // to use ejs file
app.use(bodyParser.urlencoded({ extended: true })); // required for body-parser functioning
app.use(express.static("public")); // it used to serve the css which is stored in public folder
/*------------------------Global Variable Declairation------------------------------------*/

let newitems = ["item1", "item2", "item3"]; // array is need to store multiple new item 
let Workitems = [];

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
    // Above code is used go displaying date in augmented manner


    res.render("list", { ListTittle: day, newKindItem: newitems });
    //rendering list.ejs  sending "day" and "newitems" variable to ejs
})


/*-------------------------Post Request---------------------*/
app.post("/", function(req, res) {
    console.log(req.body);
    let newItem = req.body.newInput;
    //newItem = new item added by the user. 
    if (req.body.list === 'Work') {
        // "list" is name of the button and "Work" is the dynamic value it is holding
        Workitems.push(newItem);
        res.redirect("/work");
    } else {
        newitems.push(newItem);
        res.redirect("/");
    }
    // Since we have two seprate list which Work and home the above logic help us to add the newItem to the respective list

})

/*-------------------------Get request(/work)..................*/
app.get("/work", function(req, res) {
    res.render("list", { ListTittle: "Work List", newKindItem: Workitems });

})

app.get("/home", function(req, res) {
    res.render("home");
})

/*-------------------------Port Declairation---------------------*/
app.listen(3000, function() {
    console.log("connect to port 3000");
})