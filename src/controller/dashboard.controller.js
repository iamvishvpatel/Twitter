import jwt from "jsonwebtoken";

import { db } from "../db/db.index.js";
const jwtSecret = process.env.JWTSECRET;

const renderDashboard = (req, res) => {
  try {
    //  const token = req.headers.authorization?.split(' ')[1];
    //  if (!token) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "No token provided!",
    //     });
    // }

    // const decoded = jwt.verify(token, jwtSecret)

    res.render("dashBoard");
  } catch (error) {
    console.log("Error rendering dashboard:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard!",
      error: error.message,
    });
  }
};

const dashBoardData = async (req, res) => {
  try {
    // const token = req.headers.authorization?.split(' ')[1];
    // if (!token) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "No token provided!",
    //     });
    // }

    // const decoded = jwt.verify(token, jwtSecret)
    const userId = req.user.UserId;
    const connection = await db();

    // const [currentUser] = await connection.query(
    //   `SELECT Username, Firstname, Lastname
    //          FROM Users
    //          WHERE UserID = ?`,
    //   [userId]
    // );

    // if (currentUser.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found!",
    //   });
    // }

    const [tweets] = await connection.query(
      `SELECT 
    t.TweetID, 
    t.Content, 
    t.MediaURL, 
    t.CreatedAt, 
    u.Username, 
    u.Firstname, 
    u.LastName,
    COUNT(l.LikeID) as likeCount,
    COUNT(r.RetweetID) as retweetCount,
    MAX(CASE WHEN l.UserID = ? THEN 1 ELSE 0 END) as isLiked
FROM Tweets t
JOIN Users u ON t.UserID = u.UserID
LEFT JOIN Likes l ON t.TweetID = l.TweetID
LEFT JOIN Retweets r ON t.TweetID = r.TweetID
WHERE t.UserID IN (
    SELECT UserID FROM Users 
    UNION
    SELECT ?
   
 ) 
GROUP BY t.TweetID, t.Content, t.MediaURL, t.CreatedAt, u.Username, u.Firstname, u.LastName
ORDER BY t.CreatedAt DESC`,
      [userId, userId]
    );
    // console.log("tweets : ", tweets);
    
    const [retweets] = await connection.query(
        `SELECT 
            t.TweetID, 
            t.UserID,
            t.Content, 
            t.MediaURL, 
            r.CreatedAt, 
            u.Username, 
            u.Firstname, 
            u.Lastname,
            (SELECT COUNT(*) FROM Likes l WHERE l.TweetID = t.TweetID) as likeCount,
            (SELECT COUNT(*) FROM Retweets r2 WHERE r2.TweetID = t.TweetID) as retweetCount,
            (SELECT COUNT(*) FROM Likes l WHERE l.TweetID = t.TweetID AND l.UserID = ?) as isLiked,
            r.UserID AS RetweeterID,
            ru.Username AS RetweeterUsername,
            ru.Firstname AS RetweeterFirstname,
            ru.Lastname AS RetweeterLastname,
            'retweet' AS TweetType
        FROM Retweets r
        JOIN Tweets t ON r.TweetID = t.TweetID
        JOIN Users u ON t.UserID = u.UserID
        JOIN Users ru ON r.UserID = ru.UserID
        WHERE r.UserID IN (
            SELECT UserID FROM Retweets
            UNION
            SELECT ?
        )
        ORDER BY r.CreatedAt DESC`,
        [userId, userId]
    );
    // WHERE FollowerID = ?
    // console.log("retweets : ",retweets);

// const [tweets] = await connection.query(`select Tweets.TweetID as id,Content,MediaURL,Tweets.CreatedAt,liked,username,timezone from Tweets left join users on Tweets.user_id=users.id order by Tweets.created_at desc`)

    const newOBJ= [...tweets,...retweets]
    newOBJ.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
    
    const [suggestions] = await connection.query(
      `SELECT u.UserID, u.Username, u.Firstname, u.LastName
             FROM Users u
             WHERE u.UserID != ?
             AND u.UserID NOT IN (
                 SELECT FolloweeID FROM Follows WHERE FollowerID = ?
             )
             LIMIT 10`,
      [userId, userId]
    );

    res.status(200).json({
      success: true,
      tweets: newOBJ,
      suggestions,
    //   currentUser: currentUser[0],
    });
  } catch (error) {
    console.log("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data!",
      error: error.message,
    });
  }
};

const followUser = async (req, res) => {
  try {
    const followerId = req.user.UserId;
    const followeeId = req.params.followeeId;

    if (followerId === followeeId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself!",
      });
    }

    const connection = await db();
    const [alredyFollow] = await connection.query(
      `SELECT * FROM Follows WHERE FollowerID = ? AND FolloweeID = ?`,
      [followerId, followeeId]
    );

    if (alredyFollow.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user!",
      });
    }

    await connection.query(
      `INSERT INTO Follows (FollowerID, FolloweeID) VALUES (?, ?)`,
      [followerId, followeeId]
    );

    res.status(200).json({
      success: true,
      message: "Successfully followed user!",
    });
  } catch (error) {
    console.log("Error following user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to follow user!",
      error: error.message,
    });
  }
};

const unFollowUser = async (req, res) => {
  try {
    const followerId = req.user.UserId;
    const followeeId = req.params.followeeId;
    const connection = await db();
    if (followerId === followeeId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself!",
      });
    }
    console.log(followeeId, followerId);

    const [existingFollow] = await connection.query(
      `SELECT * FROM Follows WHERE FollowerID = ? AND FolloweeID = ?`,
      [followerId, followeeId]
    );

    if (existingFollow.length === 0) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user!",
      });
    }

    await connection.query(
      `DELETE FROM Follows WHERE FollowerID = ? AND FolloweeID = ?`,
      [followerId, followeeId]
    );

    res.status(200).json({
      success: true,
      message: "Successfully unfollowed user!",
    });
  } catch (error) {
    console.log("Error unfollowing user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unfollow user!",
      error: error.message,
    });
  }
};

const renderProfile = async (req, res) => {
  // const userId = req.user.userId
  res.render("profile", { profileUserId: req.params.userId });
};

const profileData = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log("userId", userId)

    const connection = await db();
    const [users] = await connection.query(
      `SELECT UserID, Username, FirstName, LastName, Bio, ProfilePicture
             FROM Users
             WHERE UserID = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const user = users[0];

    const [followers] = await connection.query(
      `SELECT COUNT(*) as count FROM Follows WHERE FolloweeID = ?`,
      [userId]
    );
    const followersCount = followers[0].count;

    const [following] = await connection.query(
      `SELECT COUNT(*) as count FROM Follows WHERE FollowerID = ?`,
      [userId]
    );

    const followingCount = following[0].count;

    const [tweets] = await connection.query(
      `SELECT TweetID, Content, MediaURL, CreatedAt
                 FROM Tweets
                 WHERE UserID = ?
                 ORDER BY CreatedAt DESC`,
      [userId]
    );
    const [followingUsers] = await connection.query(
      `SELECT u.UserID, u.Username, u.Firstname, u.LastName
                 FROM Follows f
                 JOIN Users u ON f.FolloweeID = u.UserID
                 WHERE f.FollowerID = ?`,
      [userId]
    );
    res.status(200).json({
      success: true,
      user,
      followersCount,
      followingCount,
      tweets,
      followingUsers,
    });
  } catch (error) {
    console.log("Error fetching profile data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile data!",
      error: error.message,
    });
  }
};
const createPost = async (req, res) => {
  try {
    const userId = req.user.UserId;

    const { content, mediaURL } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Tweet content is required!",
      });
    }

    const connection = await db();
    await connection.query(
      `INSERT INTO Tweets (UserID, Content, MediaURL) VALUES (?, ?, ?)`,
      [userId, content, mediaURL || null]
    );

    res.status(201).json({
      success: true,
      message: "Tweet created successfully!",
    });
  } catch (error) {
    console.log("Error creating tweet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create tweet!",
      error: error.message,
    });
  }
};
const logOutUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

const likeTweet = async (req, res) => {
  try {
    const userId = req.user.UserId;
    const tweetId = req.params.tweetId;
    console.log(userId, tweetId);

    const connection = await db();

    const [existingLikes] = await connection.query(
      `SELECT * FROM Likes WHERE TweetID = ? AND UserID = ?`,
      [tweetId, userId]
    );

    if (existingLikes.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this tweet!",
      });
    }

    await connection.query(
      `INSERT INTO Likes (TweetID, UserID) VALUES (?, ?)`,
      [tweetId, userId]
    );

    res.status(200).json({
      success: true,
      message: "Tweet liked successfully!",
    });
  } catch (error) {
    console.log("Error liking tweet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to like tweet!",
      error: error.message,
    });
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const userId = req.user.UserId;
    const tweetId = req.params.tweetId;
    // console.log(userId, tweetId);

    const connection = await db();
    const [existingLike] = await connection.query(
      `SELECT * FROM Likes WHERE TweetID = ? AND UserID = ?`,
      [tweetId, userId]
    );

    console.log("daata from dashboard .ejs for likes", existingLike);

    if (existingLike.length === 0) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this tweet!",
      });
    }

    await connection.query(
      `DELETE FROM Likes WHERE TweetID = ? AND UserID = ?`,
      [tweetId, userId]
    );

    res.status(200).json({
      success: true,
      message: "Tweet unliked successfully!",
    });
  } catch (error) {
    console.log("Error unliking tweet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unlike tweet!",
      error: error.message,
    });
  }
};

const reTweet = async (req, res) => {
  try {
    const userId = req.user.UserId;
    const tweetId = req.params.tweetId;

    const connection = await db();
    const [existingReTweet] = await connection.query(
      `SELECT * FROM Retweets WHERE TweetID = ? AND UserID = ?`,
      [tweetId, userId]
    );

    if (existingReTweet.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already retweeted this tweet!",
      });
    }

    await connection.query(
      `INSERT INTO Retweets (TweetID, UserID) VALUES (?, ?)`,
      [tweetId, userId]
    );

    res.status(200).json({
      success: true,
      message: "Tweet retweeted successfully!",
    });
  } catch (error) {
    console.log("Error retweeting tweet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retweet tweet!",
      error: error.message,
    });
  }
};
export {
  renderDashboard,
  dashBoardData,
  followUser,
  unFollowUser,
  renderProfile,
  profileData,
  createPost,
  logOutUser,
  likeTweet,
  unlikeTweet,
  reTweet,
};
