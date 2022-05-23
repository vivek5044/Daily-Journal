const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const app = express();

const homeStartingContent = "Renowned for their pan- African presence and with a reputation for delivering world-class Digital CustorT Experience and Technology Services, DSC's impact sourcing solution, in partnership with the Maharishi Institute drives the education and skills development of South Africa's youth workforce while simultaneol reduchg youth unemployment, a glaring concern in the country and even more so in a post-pandemic economic climate."
const aboutContent = "Renowned for their pan- African presence and with a reputation for delivering world-class Digital CustorT Experience and Technology Services, DSC's impact sourcing solution, in partnership with the Maharishi Institute drives the education and skills development of South Africa's youth workforce while simultaneol reduchg youth unemployment, a glaring concern in the country and even more so in a post-pandemic economic climate."
const contactContent = "Renowned for their pan- African presence and with a reputation for delivering world-class Digital CustorT Experience and Technology Services, DSC's impact sourcing solution, in partnership with the Maharishi Institute drives the education and skills development of South Africa's youth workforce while simultaneol reduchg youth unemployment, a glaring concern in the country and even more so in a post-pandemic economic climate."


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];


app.get("/", function (req, res) {
    // console.log(posts);
    let size = posts.length;
    res.render("home", {posts: posts});
});

app.get('/posts/:postName', (req, res)=>{
    const x = _.lowerCase(req.params.postName);
    var a = false;
    const post = "";
    const title = "";
    for(let i=0;i<posts.length;i++){
        const y = _.lowerCase(posts[i].title);
        if(x===y){
            res.render("post", {title: posts[i].title, body: posts[i].content});
        }
    }


    // console.log(req.params.postName);
    // res.send(req.params.post);
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
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    }

    posts.push(post);

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