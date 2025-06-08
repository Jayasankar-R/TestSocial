const jwt = require('jsonwebtoken');
function isLoggedIn(req,res,next){
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).redirect('/login')
      }
      try {
        const data = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = data;
       
        next();
      } catch (err) {
        return res.status(403).send("Invalid token");
      }
    
}
module.exports={isLoggedIn}