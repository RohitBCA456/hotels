const jwt = require('jsonwebtoken');
const jwtAuthMiddleWare = (req,res,next) => {
          const authorization = req.headers.authorization;
          if(!authorization){
                    return res.status(401).json({error : 'Token not found'});
          }
          const token = req.headers.authorization.split(' ')[1];
          if(!token){
                    return res.status(401).json({error : 'No token provided'});
          }
          try{
                    const decoded = jwt.verify(token,process.env.JWT_SECRET);
                    req.user = decoded;
                    next();
          }catch(error){
                  console.error(error);
                  res.status(400).json({error : 'Token is not valid'});  
          }
}
const generateToken = (userData) => {
          return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn : 3000});
}
module.exports = {jwtAuthMiddleWare,generateToken};