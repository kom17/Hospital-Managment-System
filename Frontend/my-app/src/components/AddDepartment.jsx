import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import InputDrawdowns from './InputDrawdowns'
function AddDepartment(params) {
    const user_type = Cookies.get('user_type')
    const user_hosp_id = Cookies.get('hosp_id')

    const [hosp_id, setHospId] = useState((params.edit == true) ? params.data['hosp_id'] : 
    (user_type == 1) ? null : user_hosp_id)
    const [dep_name, setName] = useState((params.edit == true) ? params.data['dep_name'] : null)
    const [hod_id, setHOD] = useState((params.edit == true) ? params.data['hod_id'] : null)

    function addData(event){
        event.preventDefault()
        let msg = 'Added Successfully'
        let url = `http://localhost:8000/department/add/${hosp_id}`
        if(params.edit){
          url = `http://localhost:8000/department/modify/${hosp_id}/${params.data['dep_id']}`
          msg = 'Edited Successfully'
        }
        let data={
            dep_name :  dep_name,
            hod_id : hod_id
        }
        axios.post(url,data,{withCredentials : true})
        .then((res)=>{
            if(res.data.success && (res.data.insert || res.data.update)){
                params.toast(msg,'Department')
                params.closeModal()
                params.refresh()
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Department')
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
            <InputDrawdowns inputType={'Hospitals'} disabled={(user_type != 1 || params.edit)}
            value={(user_type == 1) ? hosp_id : user_hosp_id}
            onChange={(k)=>{setHospId(k.target.value)}}/>
            </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            Department Name
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Department Name' value={dep_name}
        onChange={(e)=>{setName(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
            HOD
        </Form.Label>
        <Col sm={10}>
        <InputDrawdowns inputType={'HODS'} value={hod_id} onChange={(e)=>{setHOD(e.target.value)}}/>
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

export default AddDepartment