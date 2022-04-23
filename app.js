/*--------------------npm packages------------------*/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

/*--------------------Usage declairation------------------*/
const app = express();
app.set('view engine', 'ejs'); // to use ejs file
app.use(bodyParser.urlencoded({ extended: true })); // required for body-parser functioning
app.use(express.static("public")); // it used to serve the css which is stored in public folder
/*--------------------DB connection-------------------------- */
mongoose.connect("mongodb+srv://Testing:test123@cluster0.zekac.mongodb.net/todolistDB", { useNewUrlParser: true });

/*--------------------mongo Schema-------------------------- */
const listSchema = new mongoose.Schema({
    name: String
});
/*---------------------- create Model/collection/table name-------------------------------------------- */
const List = mongoose.model("List", listSchema);

/*-------------------------lisiting down the data----------------------------------------- */
const item1 = new List({
    name: "Welcome to the ToDoList"
});

const item2 = new List({
    name: "Press + to add items to the list"
});

const item3 = new List({
    name: "<----Click the check box when the task in completed."
});


const Default1 = [item1, item2, item3];
/*----------------------------New-list creation-------------------------------------- */
const lisstSchema = new mongoose.Schema({
    name: String,
    items: [listSchema]
});

const Lisst = mongoose.model("Lisst", lisstSchema);



/*-------------------------Get Request---------------------*/

app.get("/", function(req, res) {

    List.find({}, function(err, lists) {
        if (err) {
            console.log(err);
        } else {
            if (lists.length === 0) {
                List.insertMany(Default1, function(err) {
                    if (err) {
                        console.log("err")
                    } else {
                        console.log("successFully Inserted");
                    }
                });
                res.redirect("/");
            }
            res.render("list", { ListTittle: "Today", newKindItem: lists });
        }
    })

    //rendering list.ejs  sending "day" and "newitems" variable to ejs
});


/*-------------------------Post Request---------------------*/
app.post("/", function(req, res) {
    let newItem = req.body.newInput;
    let listname = req.body.list;

    const item = new List({
        name: newItem
    });

    if (listname === "Today") {
        item.save();
        res.redirect("/");
    } else {
        Lisst.findOne({ name: listname }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                result.items.push(item);
                result.save();
                res.redirect("/" + listname);
            }
        });
    }

});
// adding items to specific
/*----------------------Acess parameter----------------------- */
//DynamicRouting for new List 
app.get("/:customListName", function(req, res) {
    //:customlistName is use to get the "/_" from the header
    const customListname = _.capitalize(req.params.customListName);
    Lisst.findOne({ name: customListname }, function(err, result) {
        if (!err) {
            if (!result) {
                // create a new list 
                const newlist = new Lisst({
                    name: customListname,
                    items: Default1
                });
                newlist.save();
                res.redirect("/" + customListname);
                console.log("doesnt exist")
            } else {
                // show existing list
                res.render("list", { ListTittle: customListname, newKindItem: result.items });
            }
        } else {
            console.log(err);
        }
    });

});
// it is used to create dynamic pages with to new get routes
/*--------------------Delete Items Delete Route------------------------------ */
app.post("/delete", function(req, res) {
    const check = req.body.checkbox;
    const listName = req.body.listName;
    console.log(listName);
    if (listName === "Today") {
        // to remove items from Today list only.
        List.findByIdAndRemove(check, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Succesfully removed");
                res.redirect("/");
            }
        });
    } else {
        Lisst.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: check } } }, function(err) {
            //$pull is used to remove the particular item in array name"items"
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }



});
/*-------------------------Get request(/work)..................*/
app.get("/work", function(req, res) {
    res.render("list", { ListTittle: "Work List", newKindItem: Workitems });

});
/*-------------------------Get request(/home) home page..................*/
app.get("/home", function(req, res) {
    res.render("home");
});

/*-------------------------Port Declairation---------------------*/
app.listen(3000, function() {
    console.log("connect to port 3000");
})