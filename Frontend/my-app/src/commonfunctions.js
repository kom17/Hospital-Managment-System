import axios from "axios";
import Cookies from "js-cookie";
const BaseUrls = {
    'Hospitals' : 'http://localhost:8000/hospital',
    'Departments' : 'http://localhost:8000/department',
    'HODS' : 'http://localhost:8000/hods',
    'Doctors' : 'http://localhost:8000/doctors',
    'Staff' : 'http://localhost:8000/staff',
    'Patients' : 'http://localhost:8000/patients',
    'Rooms' : 'http://localhost:8000/room',
    'Pharmacy' : 'http://localhost:8000/pharmacy'
  }

export function getTabList(){
    const user_type = Cookies.get('user_type')
    const dep_id = Cookies.get('dep_id')
    let tabsList =['Hospitals', 'Departments', 'HODS', 'Doctors', 'Staff', 'Patients', 'Rooms', 'Pharmacy']

    if(user_type == 1){
        return tabsList;
    }
    else if(user_type == 2){
        tabsList = ['Departments', 'HODS', 'Doctors', 'Staff', 'Patients', 'Rooms', 'Pharmacy']
    }
    else if(user_type == 3){
        if(dep_id == 3){
            tabsList = ['Patients', 'Pharmacy']
        }else if(dep_id == 4){
            tabsList = ['Doctors', 'Patients', 'Rooms']
        }else{
            tabsList = [ 'Doctors', 'Staff', 'Patients']
        }
    }
    else if(user_type == 4){
        tabsList = [ 'Staff', 'Patients']
    }
    else if(user_type == 5){
        if(dep_id == 3){
            tabsList = ['Patients', 'Pharmacy']
        }else if(dep_id == 4){
            tabsList = [ 'Doctors', 'Patients', 'Rooms']
        }else{
            tabsList = ['Patients']
        }
    }

    return tabsList;
}

// export function getDataUrls(typeOfData,data){
// let url = BaseUrls[typeOfData];
// if(typeOfData == 'Hospitals' && data){
//     var hosp_id = data.hosp_id
//     url = `${url}/${hosp_id}`
// }
// else if(typeOfData == 'Departments' && data){
//     var hosp_id = data.hosp_id
//     var dep_id = data.dep_id
//     url = `${url}/${hosp_id}/${dep_id}`
// }
// else if(typeOfData == 'HODS' && data){
//     var hosp_id = data.hosp_id
//     var hod_id = data.hod_id
//     url = `${url}/${hosp_id}/${hod_id}`
// }
// else if(typeOfData == 'Doctors' && data){
//     var hosp_id = data.hosp_id
//     var dep_id = data.dep_id
//     var doc_id = data.doc_id
//     url = `${url}/${hosp_id}/${dep_id}/${doc_id}`
// }
// else if(typeOfData == 'Staff' && data){
//     var hosp_id = data.hosp_id
//     var dep_id = data.dep_id
//     var staff_id = data.staff_id
//     url = `${url}/${hosp_id}/${dep_id}/${staff_id}`
// }
// else if(typeOfData == 'Patients' && data){
//     var hosp_id = data.hosp_id
//     var patient_id = data.patient_id
//     url = `${url}/${hosp_id}/${patient_id}`
// }
// else if(typeOfData == 'Rooms' && data){
//     var hosp_id = data.hosp_id
//     var room_id = data.room_id
//     url = `${url}/${hosp_id}/${room_id}`
// }
// else if(typeOfData == 'Pharmacy' && data){
//     var hosp_id = data.hosp_id
//     var med_id = data.med_id
//     url = `${url}/${hosp_id}/${med_id}`
// }

// return url;
// }


export function getDisplayTitle(title){
    const cleanTitles = {
        'hosp_id' : 'Hospital ID',
        'hosp_name' : 'Hospital Name',
        'hosp_loc' : 'Location',
        'dep_id' : 'Department ID',
        'dep_name' : 'Department Name',
        'hod_id' : 'HOD ID',
        'hod_name' : 'HOD Name',
        'qualification' : 'Qualification',
        'salary' : 'Salary',
        'address' : 'Address',
        'city' : 'City',
        'state' : 'State',
        'doc_id' : 'Doctor ID',
        'doc_name' : 'Doctor Name',
        'doc_type' : 'Type',
        'phone_no' : 'Phone',
        'staff_id' : 'Staff ID',
        'staff_name' : 'Staff Name',
        'works_as' : 'Position',
        'room_id' : 'Room ID',
        'patient_id' : 'Patient ID',
        'patient_name' : 'Patient Name',
        'age' : 'Age',
        'blood_group' : 'Blood Group',
        'date_of_admit' : 'Admit Date',
        'date_of_discharge' : 'Discharge Date',
        'room_no' : 'Room No',
        'room_type' : 'Room Type',
        'floor' : 'Floor',
        'availability' : 'Availability',
        'med_id' : 'Medicine ID',
        'med_name' : 'Medicine Name',
        'company' : 'Company',
        'price' : 'Price',
        'mfg_date' : 'Manufacture Date',
        'exp_date' : 'Expiry Date',
        'stock' : 'Stock',
    }
    if(title in cleanTitles){
        return cleanTitles[title];
    }
    return title;
}

export function filterData(olddata){
    let finalData = []
    const user_type = Cookies.get('user_type')
    const dep_id = Cookies.get('dep_id')
    let delete_keys = []
    if(user_type == 4){
        delete_keys = ['dep_name', 'doc_id']
    }
    else if(dep_id == 3){
        delete_keys = ['doc_id', 'room_id', 'date_of_admit', 'date_of_discharge']
    }
    if(dep_id == 4){
        delete_keys = ['salary']
    }
    
    olddata.map((data,ind)=>{
        let dataKeys = Object.keys(data)
        let newData = {}
        dataKeys.map((key,i)=>{
        let value = 'NaN'
        if(Object.keys(delete_keys).includes(dep_id) && delete_keys[dep_id].includes(key)){
            return;
        }
        if(data[key] != null){
            value = data[key]
            if(key.includes('date') ){
                value = value.slice(0,10)
            }
            if(key == 'availability'){
                if(value == 1){
                    value = 'Yes'
                }else{
                    value = 'No'
                }
            }
        }
        newData[key] = value
    })
    finalData.push(newData)
    })
    return finalData
}


export function dataModalTitle(dataType,data){
    const TitleKeys = {
        'Hospitals' : 'hosp_name',
        'Departments' : 'dep_name',
        'HODS' : 'hod_name',
        'Doctors' : 'doc_name',
        'Staff' : 'staff_name',
        'Patients' : 'patient_name',
        'Rooms' : 'room_no',
        'Pharmacy' : 'med_name'
      }
      return data[TitleKeys[dataType]]
}


export function getPrivilages(dataType){
    var privilages = {
        add : true,
        edit : true,
        delete : true,
    }
    const user_type = Cookies.get('user_type')
    const dep_id = Cookies.get('dep_id')

    if(user_type == 1 || user_type == 2){
        return privilages
    }else{
        if(user_type == 3 && dep_id == 3){
            if(dataType == 'Pharmacy'){
                return privilages
            }else{
                privilages.add = false
                privilages.delete = false
                privilages.edit = false
                return privilages
            }
        }
        else if(user_type == 3 && dep_id == 4){
            if(dataType == 'Doctors'){
                privilages.add = false
                privilages.delete = false
                privilages.edit = false
                return privilages
            }
            else if(dataType == 'Patients'){
                return privilages;
            }else{
                return privilages;
            }
        }
        else if(user_type == 3){
            return privilages;
        }
        else if(user_type == 4){
            if(dataType == 'Staff'){
                privilages.add = false
                privilages.edit = false
                privilages.delete = false
                return privilages
            }else{
                return privilages;
            }
        }else if(user_type == 5){
            if(dep_id == 3){
                if(dataType == 'Pharmacy'){
                    return privilages;
                }else{
                    privilages.add = false
                    privilages.edit = false
                    privilages.delete = false
                    return privilages
                }
            }
            else if(user_type == 4){
                if(dataType == 'Patients' || dataType == 'Rooms'){
                    return privilages
                }else{
                    privilages.add = false
                    privilages.edit = false
                    privilages.delete = false
                    return privilages
                }
            }
            else{
                return privilages
            }
        }
    }
}


export function getDeleteUrls(typeOfData,data){
    let url = BaseUrls[typeOfData];
    if(typeOfData == 'Hospitals' && data){
        var hosp_id = data.hosp_id
        url = `${url}/delete/${hosp_id}`
    }
    else if(typeOfData == 'Departments' && data){
        var hosp_id = data.hosp_id
        var dep_id = data.dep_id
        url = `${url}/delete/${hosp_id}/${dep_id}`
    }
    else if(typeOfData == 'HODS' && data){
        var hosp_id = data.hosp_id
        var hod_id = data.hod_id
        url = `${url}/delete/${hosp_id}/${hod_id}`
    }
    else if(typeOfData == 'Doctors' && data){
        var hosp_id = data.hosp_id
        var dep_id = data.dep_id
        var doc_id = data.doc_id
        url = `${url}/delete/${hosp_id}/${dep_id}/${doc_id}`
    }
    else if(typeOfData == 'Staff' && data){
        var hosp_id = data.hosp_id
        var dep_id = data.dep_id
        var staff_id = data.staff_id
        url = `${url}/delete/${hosp_id}/${dep_id}/${staff_id}`
    }
    else if(typeOfData == 'Patients' && data){
        var hosp_id = data.hosp_id
        var patient_id = data.patient_id
        url = `${url}/delete/${hosp_id}/${patient_id}`
    }
    else if(typeOfData == 'Rooms' && data){
        var hosp_id = data.hosp_id
        var room_id = data.room_id
        url = `${url}/delete/${hosp_id}/${room_id}`
    }
    else if(typeOfData == 'Pharmacy' && data){
        var hosp_id = data.hosp_id
        var med_id = data.med_id
        url = `${url}/delete/${hosp_id}/${med_id}`
    }
    
    return url;
}

async function getHospitalName(hosp_id){
    try{
        const response = await axios.get(`${BaseUrls['Hospitals']}/${hosp_id}`, {withCredentials : true})
        if(response.data.success && response.data.found){
            return response.data.data[0]['hosp_name']
        }
        else{
            return 'NaN'
        }
    }
    catch(error){
        console.log(error)
        return 'NaN'
    }
}

async function getDepartmentName(hosp_id,dep_id){
    try{
        const response = await axios.get(`${BaseUrls['Departments']}/${hosp_id}/${dep_id}`, {withCredentials : true})
        if(response.data.success && response.data.found){
            return response.data.data[0]['dep_name']
        }
        else{
            return 'NaN'
        }
    }
    catch(error){
        console.log(error)
        return 'NaN'
    }
}

async function getDepartmentNameByHOD(hosp_id,hod_id){
    try{
        const response = await axios.get(`${BaseUrls['HODS']}/${hosp_id}/${hod_id}`,{withCredentials : true})
        if(response.data.success && response.data.found){
            return response.data.data[0]['dep_name']
        }
        else{
            return 'NaN'
        }
    }
    catch(error){
        console.log(error)
        return 'NaN'
    }
}

async function getHODName(hosp_id,hod_id){
    try{
        const response = await axios.get(`${BaseUrls['HODS']}/${hosp_id}/${hod_id}`, {withCredentials : true})
        if(response.data.success && response.data.found){
            return response.data.data[0]['hod_name']
        }
        else{
            return 'NaN'
        }
    }
    catch(error){
        console.log(error)
        return 'NaN'
    }
}
async function getDoctorName(hosp_id,doc_id){
    try{
        const response = await axios.get(`${BaseUrls['Doctors']}/${hosp_id}/any/${doc_id}`, {withCredentials : true})
        if(response.data.success && response.data.found){
            return response.data.data[0]['doc_name']
        }
        else{
            return 'NaN'
        }
    }
    catch(error){
        console.log(error)
        return 'NaN'
    }
}

async function getRoomNo(hosp_id,room_id){
    try{
        const response = await axios.get(`${BaseUrls['Rooms']}/${hosp_id}/${room_id}`, {withCredentials : true})
        if(response.data.success && response.data.found){
            return response.data.data[0]['room_no']
        }
        else{
            return 'NaN'
        }
    }
    catch(error){
        console.log(error)
        return 'NaN'
    }
}

export async function getContentPageData(typeOfData, data){
    let result = []
    const user_dep_id = Cookies.get('dep_id')
    const user_type = Cookies.get('user_type')
    if(data.length != 0){
        await data.map(async (item,index)=>{
            if(typeOfData == 'Hospitals'){
                let hosp_id = item['hosp_id']
                //Get Admin ID
                axios.get(`${BaseUrls['Departments']}/${hosp_id}/2`, {withCredentials : true})
                .then((res)=>{
                    let new_data = Object.assign({},item)
                    delete new_data['hosp_id']
                    if(res.data.success && res.data.found){
                        let hod_id = res.data.data[0]['hod_id']
                        axios.get(`${BaseUrls['HODS']}/${hosp_id}/${hod_id}`, {withCredentials : true})
                        .then((res1)=>{
                            new_data['Manager'] = res1.data.data[0]['hod_name']
                        })
                    }else{
                        new_data['Admin'] = 'NaN'
                    }
                    result.push(new_data)
                })
                .catch((err)=>{
                    console.log(err)
                })
                
            }
            else if(typeOfData == 'Departments'){
                let hosp_id = item['hosp_id']
                let hod_id = item['hod_id']
                let dep_id = item['dep_id']
                let new_data = Object.assign({},item)

                delete new_data['hod_id']
                delete new_data['dep_id']
                delete new_data['hosp_id']

                new_data['Hospital Name'] = await getHospitalName(hosp_id)
                new_data['HOD Name'] = await getHODName(hosp_id,hod_id)
                result.push(new_data)
            }
            else if(typeOfData == 'HODS'){
                let new_data = Object.assign({},item)
                let hosp_id = item['hosp_id']
                let hod_id = item['hod_id']

                delete new_data['hosp_id']
                delete new_data['hod_id']

                new_data['Hospital Name'] = await getHospitalName(hosp_id)
                new_data['Department Name'] = await getDepartmentNameByHOD(hosp_id,hod_id)
                result.push(new_data)
            }
            else if(typeOfData == 'Doctors' || typeOfData == 'Staff'){
                let hosp_id = item['hosp_id']
                let dep_id = item['dep_id']
                let new_data = Object.assign({},item)

                delete new_data[(typeOfData == 'Doctors')?'doc_id' : 'staff_id']
                delete new_data['hosp_id']
                delete new_data['dep_id']

                new_data['Hospital Name'] = await getHospitalName(hosp_id)
                if(user_type != 4){
                    new_data['Department Name'] = await getDepartmentName(hosp_id,dep_id)
                }
                result.push(new_data)
            }
            else if(typeOfData == 'Patients'){
                let hosp_id = item['hosp_id']
                let doc_id = item['doc_id']
                let room_id = item['room_id']
                let new_data = Object.assign({},item)

                delete new_data['hosp_id']
                delete new_data['doc_id']
                delete new_data['room_id']
                delete new_data['patient_id']

                new_data['Hospital Name'] = await getHospitalName(hosp_id)
                if(user_dep_id != 3 && user_type != 4){
                new_data['Doctor Name'] = await getDoctorName(hosp_id, doc_id)
                }
                if(user_type == 4){
                    new_data['Room No'] = await getRoomNo(hosp_id, room_id)
                }

                result.push(new_data)
            }
            else if(typeOfData == 'Rooms' && data){
                let hosp_id = item['hosp_id']

                let new_data = Object.assign({},item)
                delete new_data['hosp_id']
                delete new_data['room_id']

                new_data['Hospital Name'] = await getHospitalName(hosp_id)

                result.push(new_data)
            }
            else if(typeOfData == 'Pharmacy' && data){
                let hosp_id = item['hosp_id']

                let new_data = Object.assign({},item)
                delete new_data['hosp_id']
                delete new_data['med_id']

                new_data['Hospital Name'] = await getHospitalName(hosp_id)

                result.push(new_data)
            }
        })
    }
        return result;  
}

export async function getDataModalData(typeOfData, data){
    let new_data = Object.assign({},data)
    const user_dep_id = Cookies.get('dep_id')
    const user_type = Cookies.get('user_type')

    if(typeOfData == 'Hospitals' && data){
        let hosp_id = new_data['hosp_id']
        delete new_data['hosp_id']
        
        await axios.get(`${BaseUrls['Departments']}/${hosp_id}/1`, {withCredentials : true})
        .then((department)=>{
            if(department.data.success && department.data.found){
                let hod_id = department.data.data[0]['hod_id']
                axios.get(`${BaseUrls['HODS']}/${hosp_id}/${hod_id}`, {withCredentials : true})
                .then((hod)=>{
                    if(hod.data.success && hod.data.found){
                        new_data['Admin'] = hod.data.data[0]['hod_name']
                    }
                    else{
                        new_data['Admin'] = 'NaN'
                    }
                })
                .catch((err)=>{console.log(err)})
            }else{
                new_data['Admin'] = 'NaN'
            }
        })
        .catch((err)=>{
            console.log(err)
        })

        await axios.get(`${BaseUrls['Departments']}/${hosp_id}/all`, {withCredentials : true})
        .then((departments)=>{
            if(departments.data.success && departments.data.found){
                new_data['No of Departments'] = departments.data.data.length
            }
            else{
                new_data['No of Departments'] = 0
            }
        })
        .catch((err)=>{console.log(err)})

        await axios.get(`${BaseUrls['Doctors']}/${hosp_id}/any/all`, {withCredentials : true})
        .then((doctors)=>{
            if(doctors.data.success && doctors.data.success){
                new_data['Doctors count'] = doctors.data.data.length + new_data['No of Departments']
            }else{
                new_data['Doctors count'] = 0
            }
        }).catch((err)=>{
            console.log(err)
        })

        await axios.get(`${BaseUrls['Staff']}/${hosp_id}/any/all`, {withCredentials : true})
        .then((staff)=>{
            if(staff.data.success && staff.data.found){
                new_data['Staff count'] = staff.data.data.length
            }
            else{
                new_data['Staff count'] = 0
            }
        })
        .catch((err)=>{console.log(err)})

        await axios.get(`${BaseUrls['Patients']}/${hosp_id}/all`, {withCredentials : true})
        .then((patients)=>{
            if(patients.data.success && patients.data.found){
                new_data['Patients count'] = patients.data.data.length
            }
            else{
                new_data['Patients count'] = 0
            }
        })
        .catch((err)=>{console.log(err)})

        await axios.get(`${BaseUrls['Rooms']}/${hosp_id}/all`, {withCredentials : true})
        .then((rooms)=>{
            if(rooms.data.success && rooms.data.found){
                new_data['No of Rooms'] = rooms.data.data.length
            }
            else{
                new_data['No of Rooms'] = 0
            }
        })
        .catch((err)=>{console.log(err)})

    }
    else if(typeOfData == 'Departments' && data){
        let hosp_id = new_data['hosp_id']
        let dep_id = new_data['dep_id']
        let hod_id = new_data['hod_id']
        delete new_data['hosp_id']
        delete new_data['dep_id']
        delete new_data['hod_id']
        
        new_data['Hospital Name'] = await getHospitalName(hosp_id)
        new_data['HOD Name'] = await getHODName(hosp_id,hod_id)

        await axios.get(`${BaseUrls['Doctors']}/${hosp_id}/${dep_id}/all`, {withCredentials : true})
        .then((doctors)=>{
            if(doctors.data.success && doctors.data.found){
                new_data['Doctors count'] = doctors.data.data.length
            }
            else{
                new_data['Doctors count'] = 0
            }
        })
        .catch((err)=>{console.log(err)})

        await axios.get(`${BaseUrls['Staff']}/${hosp_id}/${dep_id}/all`, {withCredentials : true})
        .then((staff)=>{
            if(staff.data.success && staff.data.found){
                new_data['Staff count'] = staff.data.data.length
            }
            else{
                new_data['Staff count'] = 0
            }
        })
        .catch((err)=>{console.log(err)})
    }
    else if(typeOfData == 'HODS' && data){
        console.log(data)
        let hosp_id = data['hosp_id']
        let hod_id = data['hod_id']

        delete new_data['hosp_id']
        delete new_data['hod_id']

        new_data['Hospital Name'] = await getHospitalName(hosp_id)
        new_data['Department Name'] = await getDepartmentNameByHOD(hosp_id,hod_id)

    }
    else if(typeOfData == 'Doctors' && data){
        let hosp_id = data['hosp_id']
        let dep_id = data['dep_id']
        let doc_id = data['doc_id']
        delete new_data['hosp_id']
        delete new_data['dep_id']
        delete new_data['doc_id']

        new_data['Hospital Name'] = await getHospitalName(hosp_id)
        new_data['Department Name'] = await getDepartmentName(hosp_id,dep_id)


        await axios.get(`${BaseUrls['Patients']}/${hosp_id}/all`, {withCredentials : true})
        .then((patients)=>{
            if(patients.data.success && patients.data.found){
                let count = 0
                patients.data.data.map((patient,index)=>{
                    if(patient['doc_id'] == doc_id){
                        console.log(doc_id, patient)
                        count++;
                    }
                })

                new_data['Patients count'] = count
            }
            else{
                new_data['Patients count'] = 0
            }
        })
        .catch((err)=>{console.log(err)})

    }
    else if(typeOfData == 'Staff' && data){
        let hosp_id = data['hosp_id']
        let dep_id = data['dep_id']
        delete new_data['hosp_id']
        delete new_data['dep_id']
        delete new_data['staff_id']

        new_data['Hospital Name'] = await getHospitalName(hosp_id)
        if(user_type != 4){
            new_data['Department Name'] = await getDepartmentName(hosp_id,dep_id)
        }
    }
    else if(typeOfData == 'Patients' && data){
        let hosp_id = data['hosp_id']
        let doc_id = data['doc_id']
        let room_id = data['room_id']

        delete new_data['hosp_id']
        delete new_data['doc_id']
        delete new_data['patient_id']
        delete new_data['room_id']

        new_data['Hospital Name'] = await getHospitalName(hosp_id)
        if(user_dep_id != 3 && user_type != 4){
            new_data['Doctor Name'] = await getDoctorName(hosp_id, doc_id)
            }
        if(user_type == 4){
            new_data['Room No'] = await getRoomNo(hosp_id, room_id)
        }

    }
    else if(typeOfData == 'Rooms' && data){
        let hosp_id = data['hosp_id']
        delete new_data['room_id']
        delete new_data['hosp_id']

        new_data['Hospital Name'] = await getHospitalName(hosp_id)  
    }
    else if(typeOfData == 'Pharmacy' && data){
        let hosp_id = data['hosp_id']
        delete new_data['med_id']
        delete new_data['hosp_id']

        new_data['Hospital Name'] = await getHospitalName(hosp_id)
    }
    // return new_data
    return dictionarySort(new_data);
}

export function dictionarySort(data){
    if(data == null){
        return {};
    }
    let sortedKeys = ['Hospital Name','hosp_name', 'Location', 'hosp_loc', 'Admin', 'Manager', 'No of Departments', 'No of Rooms',
     'Department Name', 'dep_name', 'hod_name', 'HOD Name', 'Doctors count',  'Staff count', 'Patient Name',
      'patient_name', 'age', 'blood_group', 'Doctor Name', 'doc_name', 'Staff Name', 'staff_name',
     'works_as','doc_type', 'Patients count', 'qualification', 'salary', 'Room No', 'room_no', 'phone_no',
     'address', 'city', 'state', 'date_of_admit', 'date_of_discharge',
     'room_type', 'floor', 'availability', 'med_name', 'company', 'price', 'mfg_date', 'exp_date', 'stock',
     'Stock' ]

     let object_keys = Object.keys(data)
     let new_data = {}
     sortedKeys.map((key,i)=>{
        if(object_keys.includes(key)){
            new_data[key] = data[key]
        }
     })

     return new_data
}


export async function isLoginIdAvailable(login_id){
    let response = await axios.get(`http://localhost:8000/isLoginIDAvaliable/${login_id}`,{withCredentials : true})
    
    if(response.data.success && !response.data.exist){
        return true;
    }
    return false;
}
