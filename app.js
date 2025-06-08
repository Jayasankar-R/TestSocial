const express= require('express');
const app =express();

const cookieParser=require('cookie-parser')
const userModel = require('./models/user')
const postModel = require('./models/post');
const { CreateUser, LoginUser } = require('./controllers/userController');
const { isLoggedIn } = require('./middleware/auth');
const { CreatePost, UpdatePost } = require('./controllers/postController');
const { toggleLike } = require('./controllers/likeController');
require('dotenv').config();
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cookieParser())
app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/login', (req, res) => {
    res.render("login"); 
  });
app.post('/register',CreateUser);
app.post('/login',LoginUser);
app.get('/logout', (req, res) => {
    console.log("Logout route hit");
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.redirect("/login");
  });
app.get('/profile',isLoggedIn,async(req,res)=>{
    const user =  await userModel.findById(req.user.id).populate("posts");
    //console.log(user.posts);
    res.render("profile",{ user })
})
app.get('/edits/:id',isLoggedIn,async(req,res)=>{
    const post =  await postModel.findById(req.params.id);
    if (!post) {
        
        return res.status(404).send("Post not found");
      }
    res.render("edit",{ post })
})
app.post('/update/:id',isLoggedIn,UpdatePost)
// app.get('/like/:id',isLoggedIn,async(req,res)=>{
//     const post =  await postModel.findById(req.params.id).populate("users");
//     if(post.likes.indexOf(req.user.userid=== -1)){
//         post.likes.push(req.user.userid)
//     }else{
//         post.likes.splice(post.likes.indexOf(req.user.userid),1)
//     }
    
//     await post.save()
//     res.redirect("/profile")
// })
app.get("/test", (req, res) => {
    res.send("Server is working ✅");
  });
app.get('/likes/:id', isLoggedIn, toggleLike);
app.post('/post', isLoggedIn, CreatePost);
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
