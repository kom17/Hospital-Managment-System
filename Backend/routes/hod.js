//npm imports
const {Router} = require("express")

//User define imports
const sql = require("../setupDB")
const { checkUser } = require("../jwtAuthentication")
const {isAuthorized, Unauthorized, readDataQuery, updateDataQuery, insertDataQuery, deleteDataQuery} = require("../common functions")

//Router setup
const router = Router()


router.get('/',checkUser,isAuthorized([1,2]),(req,res)=>{

    try{
        const user_id = req.cookies.user_id
        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id
        const hosp_id = req.cookies.hosp_id
    
        if(user_type == 1){
            query1 = `SELECT * FROM HODS;`
            values1 = []
        }
        else{
            query1 = `SELECT * FROM HODS WHERE hosp_id = ?;`
            values1 = [hosp_id]
        }
    
        sql.query(query1, values1, readDataQuery(res))
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


router.get('/:hosp_id/:hod_id',checkUser,isAuthorized([1,2]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const hod_id = req.params.hod_id
        const user_type = req.cookies.user_type

        query1 = `SELECT H.*,D.dep_id,D.dep_name FROM HODS H, DEPARTMENT D WHERE H.hosp_id = ? AND
                  D.hosp_id = H.hosp_id AND D.hod_id = H.hod_id AND H.hod_id = ?;`
        values1 = [hosp_id,hod_id]

        sql.query(query1,values1,readDataQuery(res))

    }catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            msg : "Server Error",
            data : {}
        })
    }
})


router.post('/modify/:hosp_id/:hod_id',checkUser,isAuthorized([1,2]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const hod_id = req.params.hod_id

        const hod_name = req.body.hod_name
        const qualification = req.body.qualification
        const salary = req.body.salary
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state

        query1 = `UPDATE HODS SET hod_name = ?, qualification = ?, salary = ?, address = ?, city = ?, state = ?
                  WHERE hosp_id = ? AND hod_id = ?;`
        values1 = [hod_name, qualification, salary, address, city, state, hosp_id, hod_id]

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
        const hosp_id = req.params.hosp_id

        const hod_name = req.body.hod_name
        const qualification = req.body.qualification
        const salary = req.body.salary
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state

        query1 = `INSERT INTO HODS VALUES(?, (SELECT COALESCE(MAX(hod_id),0) FROM HODS H) + 1, ?, ?, ?, ?, ?, ?);`
        values1 = [hosp_id, hod_name, qualification, salary, address, city, state]

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


router.post('/delete/:hosp_id/:hod_id',checkUser,isAuthorized([1,2]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const hod_id = req.params.hod_id

        query1 = `DELETE FROM HODS WHERE hosp_id = ? AND hod_id = ?;`
        values1 = [hosp_id, hod_id]

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