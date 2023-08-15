//NPM IMPORTS
const express= require("express");
const cookieParser = require("cookie-parser");
var cors = require('cors')

//USER DEFINED IMPORTS
const UsersRouter = require("./routes/users");
const HopitalRouter = require("./routes/hospital");
const PatientRouter = require("./routes/patients");
const RoomRouter = require("./routes/room")
const PharmacyRouter = require("./routes/pharmacy")
const DepartmentRouter = require("./routes/department")
const DoctorRouter = require("./routes/doctors")
const StaffRouter = require('./routes/staff')
const HODRouter = require('./routes/hod')


//Creating express app and config
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }))

//Creating Routers
app.use('/',UsersRouter)
app.use('/hospital',HopitalRouter)
app.use('/patients',PatientRouter)
app.use('/room',RoomRouter)
app.use('/pharmacy',PharmacyRouter)
app.use('/department',DepartmentRouter)
app.use('/doctors',DoctorRouter)
app.use('/staff',StaffRouter)
app.use('/hods',HODRouter)




app.listen(PORT, () => {console.log(`SERVER IS RUNNING ON PORT ${PORT}`)});