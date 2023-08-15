//npm imports
const {Router} = require("express")

//User define imports
const sql = require("../setupDB")
const {isAuthorized, Unauthorized, readDataQuery, insertDataQuery,deleteDataQuery, updateDataQuery} = require("../common functions")
const { checkUser } = require("../jwtAuthentication")

//Router setup
const router = Router()


router.get('/',checkUser,isAuthorized([1,2,3,5]),(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && dep_id != 3){
            Unauthorized(res)
        }

        if(user_type == 1){
            query1 = `SELECT * FROM PHARMACY;`
            values1 = []
        }else{
            query1 = `SELECT * FROM PHARMACY WHERE hosp_id = ?`
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



router.get('/:hosp_id/:med_id',checkUser,isAuthorized([1,2,3,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const user_type = req.cookies.user_type
        const med_id = req.params.med_id
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && dep_id != 3){
            Unauthorized(res)
        }

        query1 = `SELECT * FROM PHARMACY WHERE hosp_id = ? AND med_id = ?;`
        values1 = [hosp_id,med_id]

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


router.post('/modify/:hosp_id/:med_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const user_type = req.cookies.user_type
        const med_id = req.params.med_id
        const dep_id = req.cookies.dep_id

        const med_name = req.body.med_name
        const company = req.body.company
        const price = req.body.price
        const mfg_date = req.body.mfg_date
        const exp_date = req.body.exp_date
        const stock = req.body.stock

        if(user_type == 3  && dep_id != 3){
            Unauthorized(res)
        }

        query1 = `UPDATE PHARMACY SET  med_name = ?, company = ?, price = ?, mfg_date = ?,
                  exp_date = ?, stock = ? WHERE hosp_id = ? AND med_id = ?;`
        values1 = [med_name,company, price, mfg_date, exp_date, stock, hosp_id, med_id]

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
        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const med_name = req.body.med_name
        const company = req.body.company
        const price = req.body.price
        const mfg_date = req.body.mfg_date
        const exp_date = req.body.exp_date
        const stock = req.body.stock

        if(user_type == 3  && dep_id != 3){
            Unauthorized(res)
        }

        query1 = `INSERT INTO PHARMACY VALUES(?, (SELECT COALESCE(MAX(med_id),0) FROM PHARMACY P) + 1, ?, ?, ?, ?, ?, ?);`
        values1 = [hosp_id, med_name, company, price, mfg_date, exp_date, stock]

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


router.post('/delete/:hosp_id/:med_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const med_id = req.params.med_id
        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id


        if(user_type == 3  && dep_id != 3){
            Unauthorized(res)
        }

        query1 = `DELETE FROM PHARMACY WHERE hosp_id = ? AND med_id = ?`
        values1 = [hosp_id, med_id]

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


module.exports = router;