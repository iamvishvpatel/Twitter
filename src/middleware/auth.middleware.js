import jwt from 'jsonwebtoken'
const jwtScret  = process.env.JWTSECRET;

const Authmiddleware = (req, res, next) => {
    // console.log(req.headers);
  
    const token = req.headers["authorization"]?.split(" ")[1];
    // console.log("auth",token);
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided.Login First..!",
      });
    }
    let isvalid = 0;
    jwt.verify(token, jwtScret, (err, decoded) => {
      if (err) {
        // console.log("expires");
        isvalid = 1;
        return res.status(401).json({
          success: false,
          message: "Invalid token. Login First..!",
        });
      }
      req.user = decoded;
      // console.log("decoded", decoded);
      
     
    });
    
    if(req.url.includes("VarifyAuth")){
      return res.status(200).json({
         user: req.user,
         success: true,
         message: "User is SccessFully Varified..."          
       })
     }
     
    if(isvalid){
      // res.vishv = "patel"
      // console.log("401 .......",res.vishv);
      
      return
    }
    next()
    
  };

  export {Authmiddleware}