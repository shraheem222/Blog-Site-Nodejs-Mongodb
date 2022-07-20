const express = require("express");
const ejs = require("ejs");
const app = express();
const _ = require('lodash')
const mongoose = require('mongoose')
const {Schema} = mongoose
// const posts = [];

mongoose.connect('mongodb+srv://admin-raheem:Aajan252000@cluster0.igfuu.mongodb.net/blogDB')

const {homeStartingContent, aboutContent, contactContent} = require('./data')

app.set('view engine', 'ejs');
 
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: String
})

const Post = mongoose.model('Post', blogSchema)

app.get('/',async (req, res)=>{
  try {
    const posts = await Post.find({});
    res.render('home', {content: homeStartingContent, newPost: posts});
  } catch (error) {
    console.log(error)
  }
})

app.get('/compose', (req, res)=>{
  res.render('compose');
})

app.post('/compose',async (req, res)=>{
  try {
    const {postTitle, postBody} = req.body;
    const post = new Post({
      title: postTitle,
      content: postBody
    })
    post.save();
      res.redirect("/");

  } catch (error) {
    console.log(error)
  }
})

app.get('/posts/:postId',async (req, res)=>{
  const {postId} = req.params
  // let match = posts.find((postData)=> _.lowerCase(postData.title) === _.lowerCase(postName))
  const post = await Post.findOne({_id: postId})
  
  res.render('post', {postTitle: post.title, content: post.content})
})

app.get('/about', (req, res)=>{
  res.render('about', {content: aboutContent});
})

app.get('/contact', (req, res)=>{
  res.render('contact', {content: contactContent});
})

app.listen(5000, function() {
  console.log("Server started on port 5000");
});
