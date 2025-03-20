import { Router } from "express";
import { loginUser, registerUser,renderLogin,renderPass,renderRedirect,renderSignup, UpdatePass } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { validationForm } from "../middleware/validateForm.middeleware.js";
import { Authmiddleware } from "../middleware/auth.middleware.js";
import { authcontroller } from "../controller/auth.controller.js";

const router = Router()
router.route("/signup").get(renderSignup)
router.route("/register").post(upload.single("file"),validationForm,registerUser) 
router.route("/VarifyAuth").get(Authmiddleware, authcontroller)
router.route("/VarifyUser").get(renderRedirect)
router.route("/setpassword").get( renderPass) 
router.route("/Updatepass").post(upload.none(), UpdatePass)
router.route("/login").get(renderLogin)
router.route("/login").post(upload.none(), validationForm, loginUser)


export default router 