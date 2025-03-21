import { db } from "../db/db.index.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const renderSignup = (req, res)=>{
    res.render("signup")
}



const jwtSecret = process.env.JWTSECRET

const registerUser = async (req,res)=>{
    
    const {fname, lname, username, email, bio} = req.body
    
    if(
        [fname, lname, username, email].some((filed)=> filed?.trim()==="")
    ){
        console.log("All fields are required");        
    }

    try {
        const connection = await db()

        // console.log(req.file);
        

        const [result] = await connection.query(`INSERT INTO Users (Username, Firstname, LastName, Email, Bio,ProfilePicture) VALUES (?, ?, ?, ?,?, ?)`,
      [username, fname, lname, email, bio, req.file.filename]);

      const token = jwt.sign({UserId: result.insertId, UserName: username, Firstname: fname, LastName: lname, Email: email}, jwtSecret, {
        expiresIn: "1h",
      })
      console.log("result from ",result)
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
        userId: result.insertId,
        headers: {
            authorization: token
          },
        token: token,
        User: { UserId: result.insertId, UserName: username, Firstname: fname, LastName: lname, Email: email},
      });

      
    } catch (error) {
        console.log("Error signin:", error);
    

        if(error.code === "ER_DUP_ENTRY"){
            return res.status(400).json({
                success: false,
                message: error.sqlMessage,
            })
        }
        res.status(501).json({
            success: false,
            message: "User regisration Is Failed.!",
            error: error.message,
          });
      }

   
}

const renderPass = (req,res)=>{
  res.render("setPass.ejs")
}

const renderRedirect = (req,res)=>{
  res.render("redirect.ejs")
}

const UpdatePass = async (req,res)=>{
  let {password, repeatPassword} = req.body;
  
  if (password.length < 6) {
    return res.status(501).json({
      success: false,
      message: "Password Length Must Be 6 Character Long..!",
      // error: error.message,
    });
  }
  if (password != repeatPassword) {
   return res.status(501).json({
      success: false,
      message: "Enter Both password As Same..!",
      // error: error.message,
    });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
          success: false,
          message: "No token provided!",
      });
  }

  const decoded = jwt.verify(token, jwtSecret);
  const userId = decoded.UserId;

  const hashedPassword = await bcrypt.hash(password, 10)

  const connection = await db();

  const result = await connection.query(`UPDATE Users SET Password = ? WHERE UserID = ?`,
            [hashedPassword, userId]
          )

  if (result.affectedRows === 0) {
    return res.status(404).json({
      success: false,
      message: "User not found or password not updated!",
  });
  }

  res.status(200).json({
    success: true,
    message: "Password updated successfully!",
    redirect: "/login",
});


  } catch (error) {
    console.log("Error updating password:", error);
        res.status(500).json({
            success: false,
            message: "Password update failed!",
            error: error.message,
        });
  }
  
}
const renderLogin = async (req,res)=>{
  res.render("login")
}
const loginUser = async (req,res)=>{
  const {email, password} = req.body;

  if(!email && !password){
    return res.status(400).json({
      success: false,
      message: "Email and password are required!",
  });
  }

  try {
    const connection = await db();
    const [users] = await  connection.query(`SELECT * FROM Users WHERE Email = ?`,[email])

    if(users.length === 0){
      return res.status(404).json({
        success: false,
        message: "User not found!",
    });
    }
    // console.log("Users from loginUser", users);
    
    const user = users[0];
    // console.log(password,user);
    
    const isMatch = await bcrypt.compare(password, user.Password) 

    if(!isMatch){
      return res.status(401).json({
        success: false,
        message: "Invalid password!",
    });
    }

    const token = jwt.sign(
      { UserId: user.UserID, Email: user.Email },
      jwtSecret,
      { expiresIn: "1h" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful!",
    token: token,
    user: { UserId: user.UserID, Email: user.Email },
});

  } catch (error) {
    console.log("Error logging in:", error);
        res.status(500).json({
            success: false,
            message: "Login failed!",
            error: error.message,
        });
  }
}

export {registerUser, renderSignup, renderRedirect, renderPass, UpdatePass, renderLogin, loginUser}