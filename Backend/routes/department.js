//npm imports
const {Router} = require("express")



//User define imports
const sql = require("../setupDB")
const {isAuthorized, Unauthorized, readDataQuery, insertDataQuery, deleteDataQuery, updateDataQuery} = require("../common functions")
const { checkUser } = require("../jwtAuthentication")

//Router setup
const router = Router()


router.get('/',checkUser,isAuthorized([1,2]),(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;

        if(user_type == 1){
            query1 = `SELECT * FROM DEPARTMENT;`
            values1 = []
        }else{
            query1 = `SELECT * FROM DEPARTMENT WHERE hosp_id = ?;`
            values1 = [hosp_id]
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


router.get('/:hosp_id/:dep_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const user_type = req.cookies.user_type;
        const dep_id= req.params.dep_id;
        const user_dep = req.cookies.dep_id

        if(user_type == 3 && dep_id != user_dep){
            Unauthorized(res)
        }


        query1 = `SELECT * FROM DEPARTMENT WHERE hosp_id = ? AND dep_id = ?;`
        values1 = [hosp_id,dep_id]

        if(dep_id == 'all'){
            query1 = `SELECT * FROM DEPARTMENT WHERE hosp_id = ?;`
            values1 = [hosp_id]
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



router.post('/modify/:hosp_id/:dep_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const dep_id = req.params.dep_id;

        const user_dep = req.cookies.dep_id;
        const user_type = req.cookies.user_type

        const dep_name = req.body.dep_name
        const hod_id = req.body.hod_id

        if(user_type == 3  && dep_id != user_dep){
            Unauthorized(res)
        }

        query1 = `UPDATE DEPARTMENT SET dep_name = ?, hod_id = ? WHERE hosp_id = ? AND dep_id = ?`
        values1 = [dep_name, hod_id,hosp_id, dep_id]

        sql.query(query1,values1,updateDataQuery(res))
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

router.post('/add/:hosp_id',checkUser,isAuthorized([1,2]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const dep_name = req.body.dep_name
        const hod_id = req.body.hod_id

        query1 = `INSERT INTO DEPARTMENT VALUES(?, (SELECT COALESCE(MAX(D.dep_id),0) FROM DEPARTMENT D
        WHERE D.hosp_id = ?) + 1, ?, ?);`
        values1 = [hosp_id, hosp_id, dep_name, hod_id]

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


router.post('/delete/:hosp_id/:dep_id',checkUser,isAuthorized([1,2]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const dep_id = req.params.dep_id;

        var delete_hod = `DELETE FROM HODS WHERE hod_id = (SELECT hod_id FROM DEPARTMENT D WHERE D.dep_id = ? AND D.hosp_id = ?);`
        var delete_hod_values = [dep_id, hosp_id]

        sql.query(delete_hod,delete_hod_values,(e,r,f)=>{
            if(e){
                console.log(e)
                res.status(500).send({
                    success : false,
                    msg : "Server Error",
                    data : {}
                })
            }
        })

        var query1 = `DELETE FROM DEPARTMENT WHERE dep_id = ? AND hosp_id = ?;`
        var values1 = [dep_id,hosp_id]

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

module.exports = router