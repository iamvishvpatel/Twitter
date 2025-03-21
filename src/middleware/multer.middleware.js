import multer from 'multer'

export const checkFile = (req,res,next) =>{
  const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })

  const upload = multer(
    {
      storage:Storage,

      fileFilter : function(req,file,cb){
        // console.log(file.mimetype);
        
        if(file.mimetype ==="image/jpeg" || file.mimetype ==="image/jpg" || file.mimetype ==="image/png"){
          cb(null,true)
        }else{
          cb(new Error("Only JPG, jPEG and PNG files are Allowed.",false))
        }
      }
    }
).single("file")

upload(req,res,(error)=>{
  if(error){
    return res.status(400).json(
      {
        success : false,
        message : `${error.message}`
      }
    )
  }else{
    next();
  }
})
}

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })

  export const upload = multer({storage:
    Storage
  })