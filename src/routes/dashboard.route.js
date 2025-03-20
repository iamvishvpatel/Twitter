import { Router } from "express";
import { createPost, dashBoardData, followUser, likeTweet, logOutUser, profileData, renderDashboard, renderProfile, reTweet, unFollowUser, unlikeTweet } from "../controller/dashboard.controller.js";
import { Authmiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route('/').get(renderDashboard)
router.route('/dashboard-data').get(Authmiddleware, dashBoardData)
router.route('/Follow/:followeeId').post(Authmiddleware, followUser)
router.route('/unFollow/:followeeId').post(Authmiddleware, unFollowUser)
router.route('/profilePicture/:userId').get(renderProfile)
router.route('/profile-data/:userId').get(Authmiddleware, profileData)
router.route('/createPost').post(upload.none(), Authmiddleware, createPost)
router.route('/logout').post(Authmiddleware, logOutUser)
router.route('/like/:tweetId').post(Authmiddleware, likeTweet)
router.route('/unlike/:tweetId').post(Authmiddleware, unlikeTweet)
router.route('/retweet/:tweetId').post(Authmiddleware, reTweet)


export default router;