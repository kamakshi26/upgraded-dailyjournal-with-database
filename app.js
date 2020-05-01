//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
var _ = require('lodash');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);
const path=require("path");
mongoose.connect("mongodb+srv://admin-kamakshi:Kamakshi@00@cluster0-n08gz.mongodb.net/journalDB",{useNewUrlParser: true});
// var contentarray=[];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




// create database
const dailyPost=mongoose.Schema(
  {
    title : String,
    content : String
  }
);

// create model
const dailypostmodel=mongoose.model("dailyjournal",dailyPost);

app.get('/',function(req,res)
{
  dailypostmodel.find({},function(err,founditems)
{
  if(!err)
  {
    res.render('home',{homecontent:homeStartingContent, printcontent:founditems});
  }
});




});
app.get('/contentarray/:parameter', function (req, res) {

  const postid=req.params.parameter;
  dailypostmodel.findOne({_id: postid},function(err,foundvalues)
{
  res.render('post',{postname : foundvalues.title, postcontent: foundvalues.content});
});
});

app.get('/about',function(req,res)
{
  res.render('about',{aboutcontent:aboutContent});

});
app.get('/contact',function(req,res)
{
  res.render('contact',{contactcontent:contactContent});

});
app.get('/compose',function(req,res)
{
  res.render('compose');

});

app.post('/compose',function(req,res)
{
  const postable={
    title:req.body.nextPost,
    value:req.body.content

  };
  const composeddata=new dailypostmodel(
    {
      title: postable.title,
      content : postable.value
    }
  );
  composeddata.save(function(err)
{
  res.redirect('/');
});
  // contentarray.push(postable);

});








let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}




app.listen(port, function() {
  console.log("Server started on port 3000");
});
