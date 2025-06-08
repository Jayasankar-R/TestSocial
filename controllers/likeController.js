const postModel = require('../models/post');

async function toggleLike(req,res) {
    try{
        const post = await postModel.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        const userId = req.user.id;
        const index = post.likes.indexOf(userId);
        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(index, 1);
        }
        await post.save();
        res.redirect('/profile');
    }catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
module.exports = { toggleLike };