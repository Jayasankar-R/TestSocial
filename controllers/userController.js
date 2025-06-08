const user = require('../models/user');
const userModel = require('../models/user')
const { hashPassword, checkPassword } = require('../utils/passwordUtil');
const { generateToken } = require('../utils/tokenUtil');


async function CreateUser(req,res) {
    try{
       
        const {email,username, name,password,age}=req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).send("User already registered");
        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({
            email,
            username,
            name,
            password: hashedPassword,
            age,
          });
        const token=generateToken(newUser);
        res.cookie("token",token,{httpOnly:true})
        return res.redirect('/profile');


        
    }catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
}
async function LoginUser(req,res) {
    try{
        const {email,password}=req.body;
        const existingUser = await userModel.findOne({ email });
        if(!existingUser) return res.status(500).send("User not found")
        console.log("Password before hashing:", password);
        const passwordMatch= await checkPassword(password,existingUser.password)
        if (!passwordMatch) return res.status(401).send("Invalid password");
        const token=generateToken(existingUser);
        res
        .cookie("token", token, { httpOnly: true });
        return res.redirect('/profile');
    }catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Server error");
      }
    
}

module.exports={CreateUser,LoginUser};