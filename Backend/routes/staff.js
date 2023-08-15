//npm imports
const {Router} = require("express")

//User define imports
const sql = require("../setupDB")
const { checkUser } = require("../jwtAuthentication")
const {isAuthorized, Unauthorized, readDataQuery, insertDataQuery, deleteDataQuery, updateDataQuery} = require("../common functions")

//Router setup
const router = Router()


router.get('/',checkUser,isAuthorized([1,2,3,4]),(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;
        const user_id = req.cookies.user_id
        const dep_id= req.cookies.dep_id

        if(user_type == 1){
            query1 = 'SELECT * FROM STAFF;'
            values1 = []
        }else if(user_type  == 2){
            query1 = `SELECT * FROM STAFF WHERE hosp_id = ?;`
            values1 = [hosp_id]
        }else{
            query1 = `SELECT * FROM STAFF WHERE hosp_id = ? AND dep_id = ?;`
            values1 = [hosp_id,dep_id]
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



router.get('/:hosp_id/:dep_id',checkUser,isAuthorized([1,2,3,4]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const user_type = req.cookies.user_type;
        const dep_id= req.params.dep_id
        const user_dep = req.cookies.dep_id

        if((user_type == 3 || user_type == 4) && dep_id != user_dep){
            Unauthorized(res)
        }

        query1 = `SELECT * FROM STAFF WHERE hosp_id = ? AND dep_id = ?;`
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


router.get('/:hosp_id/:dep_id/:staff_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const user_type = req.cookies.user_type;
        const dep_id= req.params.dep_id
        const staff_id = req.params.staff_id
        const user_dep = req.cookies.dep_id

        if(user_type == 3 && dep_id != user_dep){
            Unauthorized(res);
        }

        query1 = `SELECT * FROM STAFF WHERE hosp_id = ? AND dep_id = ? AND staff_id = ?;`
        values1 = [hosp_id,dep_id,staff_id]

        if(dep_id == 'any'){
            query1 = `SELECT * FROM STAFF WHERE hosp_id = ? AND staff_id = ?;`
            values1 = [hosp_id,staff_id]
        }

        if(staff_id == 'all'){
            if(dep_id != 'any'){
                query1 = `SELECT * FROM STAFF WHERE hosp_id = ? AND dep_id = ?;`
                values1 = [hosp_id,dep_id]
            }
            else{
                query1 = `SELECT * FROM STAFF WHERE hosp_id = ?;`
                values1 = [hosp_id,]
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



router.post('/modify/:hosp_id/:dep_id/:staff_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const dep_id= req.params.dep_id
        const staff_id = req.params.staff_id

        const user_dep = req.cookies.dep_id
        const user_type = req.cookies.user_type

        const staff_name = req.body.staff_name
        const works_as = req.body.works_as
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state
        const salary = req.body.salary

        if(user_type == 3 && dep_id != user_dep){
            Unauthorized(res);
        }

        query1 = `UPDATE STAFF SET staff_name = ?, works_as = ?, address = ?, city = ?, state = ?, salary = ? WHERE
                  hosp_id = ? AND dep_id = ? AND staff_id = ?;`
        values1 = [staff_name, works_as, address, city, state, salary, hosp_id, dep_id, staff_id]

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

        const user_dep = req.cookies.dep_id
        const user_type = req.cookies.user_type

        const dep_id = req.body.dep_id
        const staff_name = req.body.staff_name
        const works_as = req.body.works_as
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state
        const salary = req.body.salary

        if(user_type == 3 && dep_id != user_dep){
            Unauthorized(res);
        }

        query1 = `INSERT INTO STAFF VALUES(?, ?, (SELECT COALESCE(MAX(staff_id),0) FROM STAFF S) + 1, ?, ?, ?, ?, ?, ?)`
        values1 = [hosp_id, dep_id, staff_name, works_as, address, city, state, salary, hosp_id, dep_id]

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


router.post('/delete/:hosp_id/:dep_id/:staff_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const dep_id = req.params.dep_id
        const staff_id = req.params.staff_id

        const user_type = req.cookies.user_type
        const user_dep = req.cookies.dep_id

        if(user_type == 3 && dep_id != user_dep){
            Unauthorized(res);
        }

        query1 = `DELETE FROM STAFF WHERE hosp_id = ? AND dep_id = ? AND staff_id = ?;`
        values1 = [hosp_id, dep_id, staff_id]

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