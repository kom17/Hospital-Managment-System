import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import InputDrawdowns from './InputDrawdowns'


function AddPatient(params) {
    const user_type = Cookies.get('user_type')
    const user_hosp_id = Cookies.get('hosp_id')
    const user_dep_id = Cookies.get('dep_id')
    const user_id = Cookies.get('user_id')

    const [hosp_id, setHospId] = useState((params.edit == true) ? params.data['hosp_id'] :
     (user_type == 1) ? null : user_hosp_id)
    const [patient_name, setName] = useState((params.edit == true) ? params.data['patient_name'] : null)
    const [doc_id, setDoc] = useState((params.edit == true) ? params.data['doc_id'] :
     (user_type != 4) ? null : user_id)
    const [age, setAge] = useState((params.edit == true) ? params.data['age'] : null)
    const [blood_group, setBlood] = useState((params.edit == true) ? params.data['blood_group'] : null)
    const [room_id, setRoom] = useState((params.edit == true) ? params.data['room_id'] : null)
    const [address, setAddress] = useState((params.edit == true) ? params.data['address'] : null)
    const [city, setCity] = useState((params.edit == true) ? params.data['city'] : null)
    const [state, setState] = useState((params.edit == true) ? params.data['state'] : null)
    const [phone_no, setPhone] = useState((params.edit == true) ? params.data['phone_no'] : null)
    const [date_of_admit, setAdmit] = useState((params.edit == true) ? params.data['date_of_admit'] : null)
    const [date_of_discharge, setDischarge] = useState((params.edit == true) ? params.data['date_of_discharge'] : null)


    function addData(event){
        event.preventDefault()
        let msg = 'Added Successfully'
        let url = `http://localhost:8000/patients/add/${hosp_id}`
        if(params.edit){
          url = `http://localhost:8000/patients/modify/${params.data['hosp_id']}/${params.data['patient_id']}`
          msg = 'Edited Successfully'
        }
        let data={
            patient_name : patient_name,
            doc_id : doc_id,
            age : age,
            blood_group : blood_group,
            room_id : room_id,
            address : address,
            city : city,
            state : state,
            phone_no : phone_no,
            date_of_admit : date_of_admit,
            date_of_discharge : date_of_discharge
        }
        axios.post(url,data,{withCredentials : true})
        .then((res)=>{
            if(res.data.success && (res.data.insert || res.data.update)){
                params.toast(msg,'Patient')
                params.closeModal()
                params.refresh()
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Patient')
        })
    }

  return (
    <center>
    <div style={{width : '50%',}}>
    <Form onSubmit={addData}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
                Hospital
            </Form.Label>
            <Col sm={10}>
            <InputDrawdowns inputType={'Hospitals'} disabled={(user_type != 1) || (params.edit)}
            value={(user_type == 1) ? hosp_id : user_hosp_id}
            onChange={(k)=>{setHospId(k.target.value)}}/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
                Doctor Name
            </Form.Label>
            <Col sm={10}>
            <InputDrawdowns inputType={'Doctors'} disabled={(user_type > 3)}
            value={(user_type != 4) ? doc_id : user_id}
            onChange={(k)=>{setDoc(k.target.value)}}/>
            </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Patient Name
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Patient Name' value={patient_name} 
        onChange={(e)=>{setName(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Patient Age 
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Age' value={age}
        onChange={(e)=>{setAge(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Blood Group
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder=' Enter Blood Group' value={blood_group}
        onChange={(e)=>{setBlood(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
                Room No
            </Form.Label>
            <Col sm={10}>
            <InputDrawdowns inputType={'Rooms'} 
            value={room_id}
            onChange={(k)=>{setRoom(k.target.value)}}/>
            </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Address
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Address' value={address}
        onChange={(e)=>{setAddress(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            City
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='City' value={city}
        onChange={(e)=>{setCity(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            State
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='State' value={state}
        onChange={(e)=>{setState(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Phone No
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Phone Number' value={phone_no} type='number'
        onChange={(e)=>{setPhone(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Date of Admit
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Manufacturee Date' value={date_of_admit} type='date'
        onChange={(e)=>{setAdmit(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Date of discharge
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Expiry Date' value={date_of_discharge} type='date'
        onChange={(e)=>{setDischarge(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
    </div>
    </center>
  )
}

export default AddPatient