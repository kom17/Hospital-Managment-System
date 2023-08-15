import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import InputDrawdowns from './InputDrawdowns'

function AddRoom(params) {
    const user_type = Cookies.get('user_type')
    const user_hosp_id = Cookies.get('hosp_id')

    const [hosp_id, setHospId] = useState((params.edit == true) ? params.data['hosp_id'] : 
    (user_type == 1) ? null : user_hosp_id)
    const [room_no, setRoom] = useState((params.edit == true) ? params.data['room_no'] :null)
    const [room_type, setType] = useState((params.edit == true) ? params.data['room_type'] :null)
    const [floor, setFloor] = useState((params.edit == true) ? params.data['floor'] :null)
    const [availability, setAvailability] = useState((params.edit == true) ? params.data['availability'] :null)

    function addData(event){
        event.preventDefault()
        let msg = 'Added Successfully'
        let url = `http://localhost:8000/room/add/${hosp_id}`
        if(params.edit){
          url = `http://localhost:8000/room/modify/${params.data['hosp_id']}/${params.data['room_id']}`
          msg = 'Edited Successfully'
        }
        let data={
            room_no :  room_no,
            room_type : room_type,
            floor : floor,
            availability : availability
        }
        console.log(data)
        axios.post(url,data,{withCredentials : true})
        .then((res)=>{
            if(res.data.success && (res.data.insert || res.data.update)){
                params.toast(msg,'Rooms')
                params.closeModal()
                params.refresh()
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Rooms')
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
           Room No
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Room No' value={room_no} type='number'
        onChange={(e)=>{setRoom(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Type
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Room Type' value={room_type}
        onChange={(e)=>{setType(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Floor
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Floor' value={floor} type='number'
        onChange={(e)=>{setFloor(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Availability
        </Form.Label>
        <Col sm={10}>
            <Form.Select value={availability} onChange={(e)=>{setAvailability(e.target.value)}}>
                <option value={'NaN'}>Select</option>
                <option value={1} >Yes</option>
                <option value={0}>No</option>
            </Form.Select>
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

export default AddRoom