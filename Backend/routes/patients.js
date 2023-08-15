//npm imports
const {Router} = require("express")



//User define imports
const sql = require("../setupDB")
const { checkUser } = require("../jwtAuthentication")
const {isAuthorized, readDataQuery, Unauthorized, insertDataQuery, deleteDataQuery, updateDataQuery} = require("../common functions")

//Router setup
const router = Router()

router.get('/',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.cookies.hosp_id
        const user_type = req.cookies.user_type;
        const user_id = req.cookies.user_id
        const dep_id= req.cookies.dep_id

        if(user_type == 1){
            query1 = `SELECT * FROM PATIENT;`
            values1 = []
        }
        else if(user_type == 2){
            query1 = `SELECT * FROM PATIENT WHERE hosp_id = ?`
            values1 = [hosp_id]
        }
        else if(user_type == 3){
            if(dep_id == 3 || dep_id == 4){
                query1 = `SELECT * FROM PATIENT WHERE hosp_id = ?`
                values1 = [hosp_id] 
            }
            else{
                query1 = `SELECT P.* FROM PATIENT P, DOCTOR D WHERE P.hosp_id = ? AND
                          D.hosp_id = P.hosp_id AND P.doc_id = D.doc_id AND D.dep_id = ?;`
                values1 = [hosp_id,dep_id]
            }
        }
        else if(user_type == 4){
            query1 = `SELECT P.* FROM PATIENT P, DOCTOR D WHERE P.hosp_id = ? AND
                      D.hosp_id = P.hosp_id AND P.doc_id = ? AND D.doc_id = P.doc_id
                      AND D.dep_id = ?;`
            values1 = [hosp_id,user_id,dep_id]
        }
        else if(user_type == 5){
            if(dep_id == 3 || dep_id == 4){
                query1 = `SELECT * FROM PATIENT WHERE hosp_id = ?`
                values1 = [hosp_id] 
            }else{
                query1 = `SELECT P.* FROM PATIENT P, DOCTOR D WHERE P.hosp_id = ? AND
                          D.hosp_id = P.hosp_id AND D.doc_id = P.doc_id AND D.dep_id = ?;`
                values1 = [hosp_id,dep_id]
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


router.get('/:hosp_id/:pat_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const pat_id = req.params.pat_id;

        query1 = 'SELECT * FROM PATIENT WHERE patient_id = ? AND hosp_id = ?';
        values1 = [pat_id,hosp_id]

        if(pat_id == 'all'){
            query1 = 'SELECT * FROM PATIENT WHERE hosp_id = ?;';
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



router.get("/report/:hosp_id/:pat_id",checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const pat_id = req.params.pat_id;
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        query1 = 'SELECT * FROM DIAGNOSIS WHERE patient_id = ? AND hosp_id = ?;'
        values1 = [pat_id,hosp_id]

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


router.get('/prescription/:hosp_id/:pat_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const pat_id = req.params.pat_id;
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && dep_id == 4){
            Unauthorized(res);
        }

        query1 = `SELECT D.doc_name,P.* FROM PRESCRIPTION P, DOCTOR D WHERE P.hosp_id = ? 
                  AND D.hosp_id = P.hosp_id AND D.doc_id = P.doc_id AND P.patient_id = ?;`
        values1 = [hosp_id,pat_id]

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


router.get('/bills/:hosp_id/:pat_id',checkUser,isAuthorized([1,2,3,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id;
        const user_type = req.cookies.user_type;
        const pat_id = req.params.pat_id;
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && dep_id != 4){
            Unauthorized(res);
        }

        query1 = `SELECT * FROM BILL WHERE hosp_id = ? AND patient_id = ?;`
        values1 = [hosp_id,pat_id]

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



router.post('/modify/:hosp_id/:patient_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id
        
        const doc_id = req.body.doc_id
        const room_id = req.body.room_id
        const patient_name = req.body.patient_name
        const age = req.body.age
        const blood_group = req.body.blood_group
        const phone_no = req.body.phone_no
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state
        const date_of_admit = req.body.date_of_admit
        const date_of_discharge = req.body.date_of_discharge

        if((user_type == 3 || user_type == 5) && dep_id == 3){
            Unauthorized(res);
        }

        var query1 = `UPDATE PATIENT SET  doc_id = ?, room_id = ?, patient_name = ?, age = ?, blood_group = ?,
                      phone_no = ?, address = ?, city = ?, state = ?, date_of_admit = ?, date_of_discharge = ?
                      WHERE hosp_id = ? AND patient_id = ?;`
        var values1 = [doc_id, room_id, patient_name, age, blood_group, phone_no, address, city, state,
                        date_of_admit, date_of_discharge, hosp_id, patient_id]
        
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


router.post('/add/:hosp_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const doc_id = req.body.doc_id
        const room_id = req.body.room_id
        const patient_name = req.body.patient_name
        const age = req.body.age
        const blood_group = req.body.blood_group
        const phone_no = req.body.phone_no
        const address = req.body.address
        const city = req.body.city
        const state = req.body.state
        const date_of_admit = req.body.date_of_admit
        const date_of_discharge = req.body.date_of_discharge

        if((user_type == 3 || user_type == 5) && dep_id == 3){
            Unauthorized(res);
        }

        var query1 = `INSERT INTO PATIENT VALUES(?,?,(SELECT COALESCE(MAX(patient_id),0) FROM PATIENT P) + 1, ?, ?, ?, ?, ?,
                      ?, ?, ?, ?, ?);`
        var values1 = [hosp_id, doc_id, room_id, patient_name, age, blood_group, phone_no, address, city, state,
                        date_of_admit, date_of_discharge]
        
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


router.post('/delete/:hosp_id/:patient_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id


        if((user_type == 3 || user_type == 5) && dep_id == 3){
            Unauthorized(res);
        }

        var query1 = `DELETE FROM PATIENT WHERE hosp_id = ?  AND patient_id = ?;`
        var values1 = [hosp_id, patient_id]
        
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



router.post('/report/modify/:hosp_id/:patient_id/:report_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id
        const report_id = req.params.report_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const description_of_illness = req.body.description_of_illness
        const prev_medical_issues = req.body.prev_medical_issues


        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `UPDATE DIAGNOSIS SET description_of_illness = ?, prev_medical_issues = ? WHERE hosp_id = ? 
                      AND patient_id = ? AND report_id = ?;`
        var values1 = [description_of_illness, prev_medical_issues, hosp_id, patient_id, report_id]
        
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


router.post('/report/add/:hosp_id/:patient_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const description_of_illness = req.body.description_of_illness
        const prev_medical_issues = req.body.prev_medical_issues


        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `INSERT INTO DIAGNOSIS VALUES(?, (SELECT COALESCE(MAX(report_id),0) FROM DIAGNOSIS D WHERE
                      D.hosp_id = ? AND D.patient_id = ?) + 1, ?, ?, ?);`
        var values1 = [hosp_id, hosp_id, patient_id, patient_id, description_of_illness, prev_medical_issues]
        
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


router.post('/report/delete/:hosp_id/:patient_id/:report_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id
        const report_id = req.params.report_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `DELETE FROM DIAGNOSIS WHERE hosp_id = ? AND patient_id = ? AND report_id = ?;`
        var values1 = [hosp_id,patient_id,report_id]
        
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



router.post('/prescription/modify/:hosp_id/:patient_id/:prescription_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id
        const prescription_id = req.params.prescription_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const doc_id = req.body.doc_id
        const prescribed_date = req.body.prescribed_date
        const med_name = req.body.med_name
        const instructions = req.body.instructions


        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `UPDATE PRESCRIPTION SET doc_id = ?, prescribed_date = ?, med_name = ? , instructions = ?
                      WHERE hosp_id = ? AND patient_id = ? AND prescription_id = ?;`
        var values1 = [doc_id, prescribed_date, med_name, instructions, hosp_id, patient_id, prescription_id]
        
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


router.post('/prescription/add/:hosp_id/:patient_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const doc_id = req.body.doc_id
        const prescribed_date = req.body.prescribed_date
        const med_name = req.body.med_name
        const instructions = req.body.instructions


        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `INSERT INTO PRESCRIPTION VALUES(?, ?, (SELECT COALESCE(MAX(prescription_id),0)
                      FROM PRESCRIPTION P WHERE P.hosp_id = ? AND P.patient_id = ?) + 1, ?, ?, ?, ?);`
        var values1 = [hosp_id, patient_id, hosp_id, patient_id, doc_id, prescribed_date, med_name, instructions]
        
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


router.post('/prescription/delete/:hosp_id/:patient_id/:prescription_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id
        const prescription_id = req.params.prescription_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `DELETE FROM PRESCRIPTION WHERE hosp_id = ? AND patient_id = ? AND prescription_id = ?;`
        var values1 = [hosp_id,patient_id,prescription_id]
        
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


router.post('/bills/modify/:hosp_id/:patient_id/:bill_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id
        const bill_id = req.params.bill_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const pays_for = req.body.pays_for
        const price = req.body.price
        const amount_paid = req.body.amount_paid
        const due_amount = req.body.due_amount


        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `UPDATE BILL SET pays_for = ?, price = ?, amount_paid = ? , due_amount = ?
                      WHERE hosp_id = ? AND patient_id = ? AND bill_id = ?;`
        var values1 = [pays_for, price, amount_paid, due_amount, hosp_id, patient_id, bill_id]
        
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


router.post('/bills/add/:hosp_id/:patient_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        const pays_for = req.body.pays_for
        const price = req.body.price
        const amount_paid = req.body.amount_paid
        const due_amount = req.body.due_amount


        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `INSERT INTO BILL VALUES(?, ?, (SELECT COALESCE(MAX(bill_id),0)
                      FROM BILL B WHERE B.hosp_id = ? AND B.patient_id = ?) + 1, ?, ?, ?, ?);`
        var values1 = [hosp_id, patient_id, hosp_id, patient_id, pays_for, price, amount_paid, due_amount]
        
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


router.post('/bills/delete/:hosp_id/:patient_id/:bill_id',checkUser,isAuthorized([1,2,3,4,5]),(req,res)=>{
    try{
        const hosp_id = req.params.hosp_id
        const patient_id = req.params.patient_id
        const bill_id = req.params.bill_id

        const user_type = req.cookies.user_type
        const dep_id = req.cookies.dep_id

        if((user_type == 3 || user_type == 5) && (dep_id == 3 || dep_id == 4)){
            Unauthorized(res);
        }

        var query1 = `DELETE FROM BILL WHERE hosp_id = ? AND patient_id = ? AND bill_id = ?;`
        var values1 = [hosp_id,patient_id,bill_id]
        
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