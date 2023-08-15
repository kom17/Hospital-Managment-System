import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { filterData } from '../commonfunctions'
import { Form } from 'react-bootstrap'

const selectUrls = {
    'Hospitals' : 'http://localhost:8000/hospital',
    'Departments' : 'http://localhost:8000/department',
    'HODS' : 'http://localhost:8000/hods',
    'Doctors' : 'http://localhost:8000/doctors',
    'Staff' : 'http://localhost:8000/staff',
    'Patients' : 'http://localhost:8000/patients',
    'Rooms' : 'http://localhost:8000/room',
    'Pharmacy' : 'http://localhost:8000/pharmacy'
}

const displayTitles = {
  'Hospitals' : 'hosp_name',
  'Departments' : 'dep_name',
  'HODS' : 'hod_name',
  'Doctors' : 'doc_name',
  'Staff' : 'staff_name',
  'Patients' : 'patient_name',
  'Rooms' : 'room_no',
  'Pharmacy' : 'med_name'
}

const getValues = {
  'Hospitals' : 'hosp_id',
  'Departments' : 'dep_id',
  'HODS' : 'hod_id',
  'Doctors' : 'doc_id',
  'Staff' : 'staff_id',
  'Patients' : 'patient_id',
  'Rooms' : 'room_id',
  'Pharmacy' : 'med_id'
}

function InputDrawdowns(params) {
    const [data,setData] = useState([])

    const url = selectUrls[params.inputType]
    const title = displayTitles[params.inputType]
    const getValue = getValues[params.inputType]

    useEffect(()=>{
        axios.get(url,{withCredentials : true})
        .then((res)=>{
          if(res.data.success && res.data.found){
            setData(filterData(res.data.data))
          }else{
            setData([])
          }
        })
    },[url])

  return (
    <>
      <Form.Select value={params.value}
       onChange={params.onChange} disabled={params.disabled}>
        <option value={'NaN'}>Select</option>
        {data.map((item,index)=>{
          return(
            <option key={index} value={item[getValue]}>{item[title]}</option>
          )
        
        })}
      </Form.Select>
    </>
  )
}

export default InputDrawdowns