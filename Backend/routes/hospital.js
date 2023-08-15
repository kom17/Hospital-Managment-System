//npm imports
const {Router} = require("express")
const { checkUser } = require("../jwtAuthentication")
const { readDataQuery, deleteDataQuery } = require("../common functions")


//User define imports
const sql = require("../setupDB")

//Router setup
const router = Router()

router.get('/',checkUser,(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;

        //if user is admin
        if(user_type == 1){
            query1 = 'SELECT * FROM HOSPITAL;'
            values1 = []
        }else{
            query1 = 'SELECT * FROM HOSPITAL WHERE hosp_id = ?;'
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


router.get('/:hosp_id',checkUser,(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id

            query1 = 'SELECT * FROM HOSPITAL WHERE hosp_id = ?;'
            values1 = [hosp_id]

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


router.post('/delete/:hosp_id',checkUser,(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id

            query1 = 'DELETE FROM HOSPITAL WHERE hosp_id = ?;'
            values1 = [hosp_id]

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