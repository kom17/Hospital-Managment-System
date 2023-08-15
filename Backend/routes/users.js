// npm imports
const {Router} = require("express");

//User defined imports
const {getToken, checkUser} = require("../jwtAuthentication");
const {readDataQuery, isAuthorized, updateDataQuery, deleteDataQuery, Unauthorized, insertDataQuery} = require('../common functions')
const sql = require("../setupDB")

//Router setup
const router = Router()

router.post('/login',(req,res)=>{
    try{
        login_id = req.body.login_id
        password = req.body.password

        var query1 = 'SELECT user_id,login_id,user_type,dep_id,hosp_id FROM USERS WHERE login_id = ? AND password = ?;'
        var values1 = [login_id,password]

        sql.query(query1,values1,(error,result,f)=>{
            if(error){
                console.log(error);
                res.status(500).send({
                    success : false,
                    msg : "DB Error",
                    data : {}
                })
            }
            else if(result.length != 0){
                result = result[0];
                var token = getToken(login_id);
                let query2 = 'UPDATE USERS SET jwt_token = ? WHERE login_id = ?;'
                let values2 = [token,login_id]
                res.cookie("jwt",token)
                res.cookie("user_id",result.user_id)
                res.cookie("user_type",result.user_type)
                res.cookie("dep_id",result.dep_id)
                res.cookie("hosp_id",result.hosp_id)
                res.cookie("login_id", result.login_id)
                sql.query(query2,values2,(err2,res2,f2)=>{
                    if(err2){
                        console.log(error);
                        res.status(500).send({
                        success : false,
                        msg : "DB Error",
                        data : {}
                        })
                    }else{
                        res.status(200).send({
                            success : true,
                            msg : "user as found",
                            data : result,
                        })
                    }
                })
            }else{
                res.status(401).send({
                    success :false,
                    msg : "Invalid id or password",
                    data : {}
                })
            }
        });
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }
});


router.get("/profile",checkUser,(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;
        const user_id = req.cookies.user_id
        const dep_id= req.cookies.dep_id

        //if user is admin
        if(user_type == 1){
            var query1 = `SELECT * FROM HODS WHERE hod_id = ?;`
            var values1 = [user_id]
        }
        else if(user_type == 2 || user_type == 3){
            var query1 = `SELECT * FROM HODS WHERE hod_id = ? AND hosp_id = ?;`
            var values1 = [user_id,hosp_id]
        }
        else if(user_type == 4){
            var query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ? AND doc_id = ?;`
            var values1 = [hosp_id,user_id]
        }
        else if(user_type >= 5){
            var query1 = `SELECT * FROM STAFF WHERE hosp_id = ? AND staff_id = ?;`
            var values1 = [hosp_id,user_id]
        }

        sql.query(query1,values1,readDataQuery(res));

    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }
})


router.post('/changepassword/:login_id',checkUser,(req,res)=>{
    try{
        const jwt_token = req.cookies.jwt
        const new_password = req.body.new_password
        const old_password = req.body.old_password
        const login_id = req.params.login_id
        const user_type = req.cookies.user_type
        
        if(login_id != 'self' && (user_type == 1 || user_type == 2)){
            var query1 = `SELECT password, jwt_token FROM USERS WHERE login_id = ?;`
            var values1 = [login_id]
            var query2 = `UPDATE USERS SET password = ? WHERE login_id = ?;`
            var values2 = [new_password,login_id]
        }
        else if(login_id == 'self'){
            var query1 = `SELECT password, jwt_token FROM USERS WHERE jwt_token = ?;`
            var values1 = [jwt_token]
            var query2 = `UPDATE USERS SET password = ? WHERE jwt_token = ?;`
            var values2 = [new_password,jwt_token]
        }else{
            Unauthorized(res)
        }


        sql.query(query1,values1,(error,result,f)=>{
            if(error){
                console.log(error)
                res.status(400).send({
                    success : false,
                    found : false,
                    msg : 'DB ERROR',
                    data : {}
                })
            }
            else if(result.length != 0){
                result = result[0]
                if((old_password == result.password && login_id == 'self') || 
                ((user_type == 1 || user_type == 2) && login_id != 'self')){
                    sql.query(query2,values2,(err2,res2,f2)=>{
                        if(err2){
                            res.status(400).send({
                                success : false,
                                found : false,
                                msg : 'DB ERROR',
                                data : {}
                            })
                        }
                        else if(res2.changedRows == 1){
                            res.status(200).send({
                                success : true,
                                found : true,
                                msg : 'PASSWORD UPDATED SUCCESSFULLY',
                                data : {}
                            })
                        }
                        else{
                            res.status(400).send({
                                success : false,
                                found : false,
                                msg : 'PASSWORD IS NOT UPDATED',
                                data : {}
                            })
                        }
                    })
                }
                else{
                    res.status(400).send({
                        success : false,
                        found : true,
                        msg : 'Old password is incorrect.',
                        data : {}
                    })
                }
            }else{
                res.status(400).send({
                    success : true,
                    found : false,
                    msg : 'NO USER FOUND',
                    data : {}
                })
            }
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }
})


router.get('/users',checkUser,isAuthorized([1,2]),(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type

        if(user_type == 1){
            var query1 = `SELECT hosp_id,login_id, user_type, user_id FROM USERS ORDER BY hosp_id;`
            var values1 = []
        }
        else{
            var query1 = `SELECT login_id, user_type, user_id, hosp_id FROM USERS WHERE hosp_id = ?;`
            var values1 = [hosp_id]
        }

        sql.query(query1,values1,readDataQuery(res))
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }
})

router.get('/admin/delete/:login_id',checkUser,isAuthorized([1]),(req,res)=>{
    try{
        const login_id = req.params.login_id;

        var query1 = `DELETE FROM USERS WHERE login_id = ?;`
        var values1 = [login_id]

        sql.query(query1,values1,deleteDataQuery(res))
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }
})


router.post('/admin/add',checkUser,isAuthorized([1]),(req,res)=>{
    try{
        const login_id = req.body.login_id;
        const password = req.body.password;


        var query1 = `INSERT INTO USERS VALUES(1, ?, ?, 1, NULL, 1,1);`
        var values1 = [login_id,password]

        sql.query(query1,values1,insertDataQuery(res))
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }
})



router.post('/changeLoginID',checkUser,isAuthorized([1]),(req,res)=>{
    try{
        const old_id = req.body.old_id
        const new_id = req.body.new_id
        const hosp_id = req.body.hosp_id


        var query1 = `INSERT INTO USERS (hosp_id, login_id , user_id, password, user_type, jwt_token, dep_id) 
        SELECT hosp_id, ?, user_id, password, user_type, jwt_token, dep_id FROM USERS 
        WHERE login_id = ? AND hosp_id = 1;`
        var values1 = [new_id, old_id, hosp_id]

        var query2 = `DELETE FROM USERS WHERE login_id = ? AND hosp_id =?;`
        var values2 = [old_id, hosp_id]


        sql.query(query1,values1,(error, result, feilds)=>{
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
                sql.query(query2,values2,deleteDataQuery(res))
            }
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }    
})


router.get('/isLoginIDAvaliable/:login_id',checkUser,isAuthorized([1]),(req,res)=>{
    try{
        const login_id = req.params.login_id


        var query1 = `SELECT * FROM USERS WHERE login_id = ?;`
        var values1 = [login_id]

        sql.query(query1,values1,(error, result, feilds)=>{
            if(error){
                console.log(error)
                res.status(400).send({
                    success : false,
                    exist : true,
                    msg : 'DB ERROR',
                    data : {}
                })
            }else if(result.length == 0){
                res.status(200).send({
                    success : true,
                    exist : false,
                    msg : 'USER NAME AVAILABLE',
                })
            }else{
                res.status(200).send({
                    success : true,
                    exist : true,
                    msg : 'USER NAME NOT AVAILABLE',
                })
            }
        })

    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }    
})



module.exports = router


