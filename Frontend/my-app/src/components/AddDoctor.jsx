import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import InputDrawdowns from './InputDrawdowns'

function AddDoctor(params) {
    const user_type = Cookies.get('user_type')
    const user_hosp_id = Cookies.get('hosp_id')
    const user_dep_id = Cookies.get('dep_id')

    const [hosp_id, setHospId] = useState((params.edit == true) ? params.data['hosp_id'] :
    (user_type == 1) ? null : user_hosp_id)
    const [dep_id, setDep] = useState((params.edit == true) ? params.data['dep_id'] :
    (user_type == 1 || user_type == 2) ? null : user_dep_id)
    const [doc_name, setName] = useState((params.edit == true) ? params.data['doc_name'] : null)
    const [doc_type, setType] = useState((params.edit == true) ? params.data['doc_type'] : null)
    const [qualification, setQual] = useState((params.edit == true) ? params.data['qualification'] : null)
    const [salary, setSalary] = useState((params.edit == true) ? params.data['salary'] : null)
    const [address, setAddress] = useState((params.edit == true) ? params.data['address'] : null)
    const [city, setCity] = useState((params.edit == true) ? params.data['city'] : null)
    const [state, setState] = useState((params.edit == true) ? params.data['state'] : null)
    const [phone_no, setPhone] = useState((params.edit == true) ? params.data['phone_no'] : null)


    function addData(event){
        event.preventDefault()
        let msg = 'Added Successfully'
        let url = `http://localhost:8000/doctors/add/${hosp_id}`
        if(params.edit){
          url = `http://localhost:8000/doctors/modify/${hosp_id}/${params.data['dep_id']}/${params.data['doc_id']}`
          msg = 'Edited Successfully'
        }
        let data={
            dep_id : dep_id,
            doc_name : doc_name,
            doc_type : doc_type,
            qualification : qualification,
            salary : salary,
            address : address,
            city : city,
            state : state,
            phone_no : phone_no
        }
        axios.post(url,data,{withCredentials : true})
        .then((res)=>{
            if(res.data.success && (res.data.insert || res.data.update)){
                params.toast(msg,'Doctors')
                params.closeModal()
                params.refresh()
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Doctors')
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
            value={(user_type == 1) ? hosp_id : user_hosp_id} page={'Doctors'}
            onChange={(k)=>{setHospId(k.target.value)}}/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
                Department
            </Form.Label>
            <Col sm={10}>
            <InputDrawdowns inputType={'Departments'} disabled={(user_type == 3) || (params.edit)}
            value={(user_type == 1 || user_type == 2) ? dep_id : user_dep_id} page={'Doctors'}
            onChange={(k)=>{setDep(k.target.value)}}/>
            </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Doctor Name
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Doctor Name' value={doc_name} 
        onChange={(e)=>{setName(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Type 
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Doctor Type' value={doc_type}
        onChange={(e)=>{setType(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Qualification
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Qualification' value={qualification}
        onChange={(e)=>{setQual(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Salary
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Salary' value={salary} type='number'
        onChange={(e)=>{setSalary(e.target.value)}}/>
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

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
    </div>
    </center>
  )
}

export default AddDoctor