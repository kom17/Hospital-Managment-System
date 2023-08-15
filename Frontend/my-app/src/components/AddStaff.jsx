import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import InputDrawdowns from './InputDrawdowns'

function AddStaff(params) {
    const user_type = Cookies.get('user_type')
    const user_hosp_id = Cookies.get('hosp_id')
    const user_dep_id = Cookies.get('dep_id')

    const [hosp_id, setHospId] = useState((params.edit == true) ? params.data['hosp_id'] : 
    (user_type == 1) ? null : user_hosp_id)
    const [dep_id, setDep] = useState((params.edit == true) ? params.data['dep_id'] : 
    (user_type == 1 || user_type == 2) ? null : user_dep_id)
    const [staff_name, setName] = useState((params.edit == true) ? params.data['staff_name'] : null)
    const [works_as, setWork] = useState((params.edit == true) ? params.data['works_as'] : null)
    const [salary, setSalary] = useState((params.edit == true) ? params.data['salary'] : null)
    const [address, setAddress] = useState((params.edit == true) ? params.data['address'] : null)
    const [city, setCity] = useState((params.edit == true) ? params.data['city'] : null)
    const [state, setState] = useState((params.edit == true) ? params.data['state'] : null)


    function addData(event){
        let msg = 'Added Successfully'
        event.preventDefault()
        let url = `http://localhost:8000/staff/add/${hosp_id}`
        if(params.edit){
          url = `http://localhost:8000/staff/modify/${params.data['hosp_id']}/${params.data['dep_id']}
          /${params.data['staff_id']}`
          msg = 'Edited Successfully'
        }
        let data={
            dep_id : dep_id,
            staff_name : staff_name,
            works_as : works_as,
            salary : salary,
            address : address,
            city : city,
            state : state,
        }
        axios.post(url,data,{withCredentials : true})
        .then((res)=>{
          console.log(res.data)
            if(res.data.success && (res.data.insert || res.data.update)){
                params.toast(msg,'Staff')
                params.closeModal()
                params.refresh()
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Staff')
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
            <InputDrawdowns inputType={'Hospitals'} disabled={(user_type != 1)|| (params.edit)}
            value={(user_type == 1) ? hosp_id : user_hosp_id}
            onChange={(k)=>{setHospId(k.target.value)}}/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
                Department
            </Form.Label>
            <Col sm={10}>
            <InputDrawdowns inputType={'Departments'} disabled={(user_type == 3) || (params.edit)}
            value={(user_type == 1 || user_type == 2) ? dep_id : user_dep_id}
            onChange={(k)=>{setDep(k.target.value)}}/>
            </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Staff Name
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Staff Name' value={staff_name}
        onChange={(e)=>{setName(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Position 
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Doctor Type' value={works_as}
        onChange={(e)=>{setWork(e.target.value)}}/>
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

export default AddStaff