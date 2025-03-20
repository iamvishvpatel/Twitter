import { loginSchema } from "../schema/login.js";
import { signupSchema } from "../schema/signup.js";

const validationForm = (req,res,next)=>{
    
    if(req.path.includes('/register')){
        const {error } = signupSchema.validate(req.body);

        if(error){
            console.log("eror", error);
            
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
    }else if (req.path.includes('/login')) {
        // Validate login form
        // console.log("req.body", req.body);
        
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
                errors: error.details.map(detail => detail.message),
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid route for form validation',
        });
    }

    next()
    
}

export {validationForm};