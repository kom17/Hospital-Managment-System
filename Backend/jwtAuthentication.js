var jwt = require('jsonwebtoken');
var MY_JWT_KEY = "MY JWT KEY"


var getToken = (user_id)=>{
    var token = jwt.sign({user_id},MY_JWT_KEY, { expiresIn: '1days' })
    return token;
}

var verifyToken = (token)=>{
    try{
        var val = jwt.verify(token,MY_JWT_KEY);
        return {
            isValid : true,
            user_id : val.user_id,
        }
    }catch(err){
        return {
            isValid : false,
            user_id : "",
        }
    }
}

var checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    
    if(token){
        var verify = verifyToken(token)
        if(verify.isValid){
            next();
        }else{
            res.status(401).send({
                success : false,
                msg : "Invalid jwt token",
                data :{}
            })
        }
    }else{
        res.status(401).send({
            success : false,
            msg : "Required jwt token",
            data :{}
        })
    }
}



module.exports = {getToken, verifyToken, checkUser}
