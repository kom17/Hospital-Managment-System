import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import InputDrawdowns from './InputDrawdowns'

function AddHOD(params) {
    const user_type = Cookies.get('user_type')
    const user_hosp_id = Cookies.get('hosp_id')

    const [hosp_id, setHospId] = useState((params.edit == true) ? params.data['hosp_id'] : 
    (user_type == 1) ? null : user_hosp_id)
    const [hod_name, setName] = useState((params.edit == true) ? params.data['hod_name'] : null)
    const [qualification, setQual] = useState((params.edit == true) ? params.data['qualification'] : null)
    const [salary, setSalary] = useState((params.edit == true) ? params.data['salary'] : null)
    const [address, setAddress] = useState((params.edit == true) ? params.data['address'] : null)
    const [city, setCity] = useState((params.edit == true) ? params.data['city'] : null)
    const [state, setState] = useState((params.edit == true) ? params.data['state'] : null)


    function addData(event){
        event.preventDefault()
        let msg = 'Added Successfully'
        let url = `http://localhost:8000/hods/add/${hosp_id}`
        if(params.edit){
          url = `http://localhost:8000/hods/modify/${hosp_id}/${params.data['hod_id']}`
          msg = 'Edited Successfully'
        }
        let data={
            hod_name : hod_name,
            qualification : qualification,
            salary : salary,
            address : address,
            city : city,
            state : state
        }
        axios.post(url,data,{withCredentials : true})
        .then((res)=>{
            if(res.data.success && (res.data.insert || res.data.update)){
                params.toast(msg,'HOD')
                params.closeModal()
                params.refresh()
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'HOD')
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
            <InputDrawdowns inputType={'Hospitals'} disabled={(user_type != 1)|| params.edit}
            value={(user_type == 1) ? hosp_id : user_hosp_id}
            onChange={(k)=>{setHospId(k.target.value)}}/>
            </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            HOD Name
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter HOD Name' value={hod_name}
        onChange={(e)=>{setName(e.target.value)}}/>
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

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
    </div>
    </center>
  )
}

export default AddHOD