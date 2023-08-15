import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import InputDrawdowns from './InputDrawdowns'

function AddMedcine(params) {
    const user_type = Cookies.get('user_type')
    const user_hosp_id = Cookies.get('hosp_id')

    const [hosp_id, setHospId] = useState((params.edit == true) ? params.data['hosp_id'] :
    (user_type == 1) ? null : user_hosp_id)
    const [med_name, setName] = useState((params.edit == true) ? params.data['med_name'] : null)
    const [company, setCompany] = useState((params.edit == true) ? params.data['company'] : null)
    const [price, setPrice] = useState((params.edit == true) ? params.data['price'] : null)
    const [mfg_date, setMFG] = useState((params.edit == true) ? params.data['mfg_date'] : null)
    const [exp_date, setExpiry] = useState((params.edit == true) ? params.data['exp_date'] : null)
    const [stock, setStock] = useState((params.edit == true) ? params.data['stock'] : null)

    function addData(event){
        event.preventDefault()
        let msg = 'Added Successfully'
        let url = `http://localhost:8000/pharmacy/add/${hosp_id}`
        if(params.edit){
          url = `http://localhost:8000/pharmacy/modify/${hosp_id}/${params.data['med_id']}`
          msg = 'Edited Successfully'
        }
        let data={
            med_name :  med_name,
            company : company,
            price : price,
            mfg_date : mfg_date,
            exp_date : exp_date ,
            stock : stock
        }
        console.log(data)
        axios.post(url,data,{withCredentials : true})
        .then((res)=>{
            if(res.data.success && (res.data.insert || res.data.update)){
                params.toast(msg,'Pharmacy')
                params.closeModal()
                params.refresh()
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Pharmacy')
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
           Medicine Name
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Medicine Name' value={med_name}
        onChange={(e)=>{setName(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Company
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Company' value={company}
        onChange={(e)=>{setCompany(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Price
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Enter Price' value={price} type='number'
        onChange={(e)=>{setPrice(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           MFG date
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Manufacturee Date' value={mfg_date} type='date'
        onChange={(e)=>{setMFG(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Exp date
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Expiry Date' value={exp_date} type='date'
        onChange={(e)=>{setExpiry(e.target.value)}}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
           Stock
        </Form.Label>
        <Col sm={10}>
        <Form.Control placeholder='Stock present' value={stock}
        onChange={(e)=>{setStock(e.target.value)}}/>
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

export default AddMedcine