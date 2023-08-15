function Unauthorized(res){
    res.status(403).send({
        success : false,
        msg : "Unauthorized request",
        data : {}
    })
}

function isAuthorized(authorized_list){
    return (req,res,next)=>{
        var user_type = parseInt(req.cookies.user_type);
        if(authorized_list.includes(parseInt(user_type))){
            next();
        }else{
            Unauthorized(res)
        }

    }
}


var readDataQuery = (res)=>{
    return (error,result,feild)=>{
        if(error){
            console.log(error)
            res.status(400).send({
                success : false,
                found : false,
                msg : 'DB ERROR',
                data : {}
            })
        }else if(result.length != 0){
            res.status(200).send({
                success : true,
                found : true,
                msg : 'DATA FOUND',
                data : result
            })
        }else{
            res.status(200).send({
                success : true,
                found : false,
                msg : 'NO DATA FOUND',
                data : {}
            })
        }
    }
}

var updateDataQuery = (res)=>{
    return (error,result,feild)=>{
        if(error){
            console.log(error)
            res.status(400).send({
                success : false,
                update : false,
                msg : 'DB ERROR',
                data : {}
            })
        }
        else if(result.changedRows >= 1){
            res.status(200).send({
                success : true,
                update : true,
                msg : 'DATA UPDATED',
                data : result
            })
        }
        else{
            res.status(400).send({
                success : true,
                update : false,
                msg : 'NO ROW MATCHED',
                data : {}
            })
        }
    }
}


var insertDataQuery = (res)=>{
    return (error,result,feild)=>{
        if(error){
            console.log(error)
            res.status(400).send({
                success : false,
                insert : false,
                msg : 'DB ERROR',
                data : {}
            })
        }
        else{
            res.status(200).send({
                success : true,
                insert : true,
                msg : 'DATA INSERTED',
                data : result
            })
        }

    }
}

var deleteDataQuery = (res)=>{
    return (error,result,feild)=>{
        if(error){
            console.log(error)
            res.status(400).send({
                success : false,
                delete : false,
                msg : 'DB ERROR',
                data : {}
            })
        }
        else{
            res.status(200).send({
                success : true,
                delete : true,
                msg : 'DATA DELETED',
                data : result
            })
        }

    }
}



module.exports = { isAuthorized, readDataQuery, Unauthorized,updateDataQuery, insertDataQuery, deleteDataQuery}