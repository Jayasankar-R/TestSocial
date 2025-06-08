require('dotenv').config();
const jwt= require('jsonwebtoken');

const SECRET=process.env.JWT_SECRET ;
const EXPIRY= '1d';
function generateToken(user){
    return jwt.sign({
        id:user.id,
        email: user.email,
        username: user.username,
        name: user.name 
    },
    SECRET,
    {expiresIn:EXPIRY}
);
}

module.exports={generateToken};