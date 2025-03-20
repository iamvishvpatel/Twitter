const authcontroller = (req,res )=>{
    return res.status(200).json({
        success: true,
        message: "User is SccessFully Varified..."
    })
}

export {authcontroller}