const jwt = require('jsonwebtoken')

const authorization = (req,res,next)=>{
    let token = req.headers.token
    if(token){
        let decode = jwt.verify(token,'secretkey')
        if(decode.role === "admin"){
            next()
        }else{
            res.status(403).json({msg:"you are forbidden to access this page"})
        }
    }
}

module.exports = authorization