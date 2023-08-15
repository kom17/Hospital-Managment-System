//npm imports
const {Router} = require("express")


//User define imports
const sql = require("../setupDB")
const { checkUser } = require("../jwtAuthentication")
const {isAuthorized, Unauthorized, readDataQuery, updateDataQuery, deleteDataQuery, insertDataQuery} = require("../common functions")

//Router setup
const router = Router()

router.get('/',checkUser,isAuthorized([1,2,3,5]),(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;
        const dep_id= req.cookies.dep_id

        if(user_type == 1){
            query1 = `SELECT * FROM  DOCTOR;`
            values1 = []
        }
        else if(user_type == 2){
            query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ?;`
            values1 = [hosp_id]

        }
        else if(user_type == 3){
            if(dep_id == 4){
                query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ?;`
                values1 = [hosp_id]
            }
            else if(dep_id == 3){
                Unauthorized(res)
            }
            else{
                query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ? AND dep_id = ?;`
                values1 = [hosp_id,dep_id]
            }
        }
        else if(user_type == 5){
            if(dep_id == 4){
                query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ?;`
                values1 = [hosp_id]
            }
            else{
                Unauthorized(res)
            }
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
        const dep_id= req.params.dep_id
        const user_dep = req.cookies.dep_id
        if(user_type == 3 && (user_dep != 4 || user_dep != dep_id)){
            Unauthorized(res)
        }
        if(user_type == 5 && user_dep != 4){
            Unauthorized(res)
        }

        query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ? AND dep_id = ?;`
        values1 = [hosp_id,dep_id]        

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


router.get('/:hosp_id/:dep_id/:doc_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const user_type = req.cookies.user_type;
        const dep_id= req.params.dep_id
        const doc_id = req.params.doc_id
        const user_dep = req.cookies.dep_id
        
        if(user_type == 3 && (dep_id == 4 || user_dep != dep_id)){
            Unauthorized(res)
        }

        query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ? AND dep_id = ? AND doc_id = ?;`
        values1 = [hosp_id,dep_id,doc_id]
        
        if(dep_id == 'any'){
            query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ? AND doc_id = ?;`
            values1 = [hosp_id,doc_id]
        }

        if(doc_id == 'all'){
            if(dep_id != 'any'){
                query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ? AND dep_id = ?;`
                values1 = [hosp_id,dep_id,doc_id]
            }
            else{
                query1 = `SELECT * FROM DOCTOR WHERE hosp_id = ?;`
                values1 = [hosp_id]  
            }
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




router.post('/modify/:hosp_id/:dep_id/:doc_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const dep_id = req.params.dep_id
        const doc_id = req.params.doc_id

        const doc_name = req.body.doc_name
        const doc_type = req.body.doc_type
        const qualification = req.body.qualification
        const salary = req.body.salary
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state
        const phone_no = req.body.phone_no

        var query1 = `UPDATE DOCTOR SET doc_name = ?, doc_type = ?, qualification = ?, salary = ?, address = ?,
                      city = ?, state = ?, phone_no = ? WHERE hosp_id = ? AND dep_id = ? AND doc_id = ?;`
        var values1 = [doc_name, doc_type, qualification, salary, address, city, state, phone_no, hosp_id, dep_id,
                       doc_id]
        
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


router.post('/add/:hosp_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id

        const dep_id = req.body.dep_id
        const doc_name = req.body.doc_name
        const doc_type = req.body.doc_type
        const qualification = req.body.qualification
        const salary = req.body.salary
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state
        const phone_no = req.body.phone_no

        var query1 = `INSERT INTO DOCTOR VALUES(?, ?, (SELECT COALESCE(MAX(doc_id),0) FROM DOCTOR D) + 1, ?, ?, ?, ?, ?, ?, ?,
                      ?)`
        var values1 = [hosp_id, dep_id,doc_name, doc_type, qualification, salary, address, city,
                       state, phone_no]
        
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


router.post('/delete/:hosp_id/:dep_id/:doc_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const dep_id = req.params.dep_id
        const doc_id = req.params.doc_id

        var query1 = `DELETE FROM DOCTOR WHERE hosp_id = ? AND doc_id = ? AND dep_id = ?;`
        var values1 = [hosp_id, doc_id, dep_id]
        
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