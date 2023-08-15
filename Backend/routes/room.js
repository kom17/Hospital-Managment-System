//npm imports
const {Router} = require("express")


//User define imports
const sql = require("../setupDB")
const { checkUser } = require("../jwtAuthentication")
const {isAuthorized, Unauthorized, readDataQuery, updateDataQuery, insertDataQuery, deleteDataQuery} = require("../common functions")

//Router setup
const router = Router()


router.get('/',checkUser,isAuthorized([1,2,3,5]),(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;
        const dep_id= req.cookies.dep_id

        if(user_type == 1){
            query1 = `SELECT * FROM ROOMS;`
            values1 = []
        }else if(user_type == 2){
            query1 = `SELECT * FROM ROOMS WHERE hosp_id = ?;`
            values1 = [hosp_id]
        }else if((user_type == 3 || user_type == 5) && dep_id == 4){
            query1 = `SELECT * FROM ROOMS WHERE hosp_id = ?;`
            values1 = [hosp_id]
        }else{
            Unauthorized(res)
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



router.get('/:hosp_id/:room_id',checkUser,(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const room_id = req.params.room_id;
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && dep_id != 4){
            Unauthorized(res)
        }
        
        query1 = `SELECT * FROM ROOMS WHERE hosp_id = ? AND room_id = ?;`
        values1 = [hosp_id,room_id]

        if(room_id == 'all'){
            query1 = `SELECT * FROM ROOMS WHERE hosp_id = ?;`
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


router.post('/modify/:hosp_id/:room_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const room_id = req.params.room_id;
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const dep_id = req.cookies.dep_id;

        const room_no = req.body.room_no;
        const room_type = req.body.room_type;
        const floor = req.body.floor;
        const availability = req.body.availability;

        if(user_type == 3 && dep_id != 4){
            Unauthorized(res);
        }

        var query1 = `UPDATE ROOMS SET room_no = ?, room_type = ?, floor = ?, availability = ? 
                      WHERE hosp_id = ? AND room_id = ?;`
        var values1 = [room_no, room_type, floor, availability, hosp_id, room_id]
        
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
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const dep_id = req.cookies.dep_id;

        const room_no = req.body.room_no;
        const room_type = req.body.room_type;
        const floor = req.body.floor;
        const availability = req.body.availability;

        if(user_type == 3 && dep_id != 4){
            Unauthorized(res);
        }

        var query1 = `INSERT INTO ROOMS VALUES(?, (SELECT COALESCE(MAX(room_id),0) FROM ROOMS R) + 1, ?, ?, ?, ?);`
        var values1 = [hosp_id, room_no, room_type, floor, availability]
        
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



router.post('/delete/:hosp_id/:room_id',checkUser,isAuthorized([1,2,3]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const dep_id = req.cookies.dep_id;
        const room_id = req.params.room_id;

        if(user_type == 3 && dep_id != 4){
            Unauthorized(res);
        }

        var query1 = `DELETE FROM ROOMS WHERE hosp_id = ? AND room_id = ?;`
        var values1 = [hosp_id, room_id]
        
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