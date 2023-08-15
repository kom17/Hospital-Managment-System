const mysql = require("mysql");

//Creating Connection of data base
const sql = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "HelloWorld",
    database : "hospitalDB",
    timezone : "+00:00"
 });

 sql.connect((err)=>{
    if(err){
        console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE\n")
        console.log(err)
    }else{
        console.log("Database is connected successfully....")
    }
 });

module.exports = sql;