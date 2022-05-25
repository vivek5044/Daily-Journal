const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/dailyJournalDB");

const homeStartingContent = "Renowned for their pan- African presence and with a reputation for delivering world-class Digital CustorT Experience and Technology Services, DSC's impact sourcing solution, in partnership with the Maharishi Institute drives the education and skills development of South Africa's youth workforce while simultaneol reduchg youth unemployment, a glaring concern in the country and even more so in a post-pandemic economic climate."
const aboutContent = "Renowned for their pan- African presence and with a reputation for delivering world-class Digital CustorT Experience and Technology Services, DSC's impact sourcing solution, in partnership with the Maharishi Institute drives the education and skills development of South Africa's youth workforce while simultaneol reduchg youth unemployment, a glaring concern in the country and even more so in a post-pandemic economic climate."
const contactContent = "Renowned for their pan- African presence and with a reputation for delivering world-class Digital CustorT Experience and Technology Services, DSC's impact sourcing solution, in partnership with the Maharishi Institute drives the education and skills development of South Africa's youth workforce while simultaneol reduchg youth unemployment, a glaring concern in the country and even more so in a post-pandemic economic climate."


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);



app.get("/", function (req, res) {
    // console.log(posts);
    let size = posts.length;

    Post.find({}, function(err, posts){
        res.render("home", {posts: posts});
    })

    // res.render("home", {posts: posts});
});

app.get('/posts/:postName', (req, res)=>{
    const x = _.lowerCase(req.params.postName);
    var a = false;
    // console.log("This function is running");
    // console.log(posts.length);
    // for(let i=0;i<posts.length;i++){
    //     console.log("For loop is running");
    //     const y = _.lowerCase(posts[i].title);
    //     if(x===y){
    //         // console.log(posts[i].title);
    //         // console.log(posts[i].content);
    //         res.render("post", {title: posts[i].title, body: posts[i].content});
    //     }
    //     else{
    //         console.log("error");
    //     }
    // };

    Post.findOne({title: req.params.postName}, function(err, foundItem){
        res.render("post", {title: foundItem.title, body: foundItem.content});
    })

    // console.log(req.params.postName);
    // res.send(req.params.postName);

});



app.get("/about", function(req, res){
    res.render("about", {about: aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contact: contactContent});
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    
    const newpost = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    })

    // console.log(newPost);
    const postnew = {
        title: req.body.postTitle,
        content: req.body.postBody
    }
    posts.push(postnew);
    newpost.save();

    res.redirect("/");
    // console.log(x);
    // res.redirect("/compose");
    // console.log(post.title);
    // console.log(post.post);
})


app.post("/about", function(req, res){
    res.redirect("/about");
});

app.post("/contact", function(req, res){
    res.redirect("/contact");
});






app.listen(3000, function () {
    console.log("Server is listening at port 3000");
});