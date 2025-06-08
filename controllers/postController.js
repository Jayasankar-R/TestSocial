const postModel = require('../models/post');
const userModel = require('../models/user')

async function CreatePost(req,res) {
    try{
        const {content}=req.body
        const newPost = await postModel.create({
                    user:req.user.id,
                    content,
                    

                  });
        const user = await userModel.findById(req.user.id);
        if (!user) return res.status(404).send("User not found");             
        user.posts.push(newPost._id)      
        await user.save()
        
        return res.redirect('/profile');
    }catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
}
async function UpdatePost(req,res) {
    try {
        const post=await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
        res.redirect("/profile");
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
}
module.exports={CreatePost,UpdatePost};