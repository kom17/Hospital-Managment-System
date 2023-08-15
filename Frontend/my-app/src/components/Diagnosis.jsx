import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { filterData } from '../commonfunctions'
import { ListGroup, Card, Button, Form } from 'react-bootstrap' 

function Diagnosis(params) {
  const [data,setData] = useState([])
  const [edit, setEdit] = useState(false)
  const patient_id = params.patientData.patient_id
  const hosp_id = params.patientData.hosp_id
  

  const url = `http://localhost:8000/patients/report/${hosp_id}/${patient_id}`

  useEffect(()=>{
    axios.get(url,{withCredentials : true})
    .then((res)=>{
      if(res.data.success){
        setData(filterData(res.data.data)[0])
      }
    })
    .catch((err)=>{console.log(err)})
  },[url])

  function editMode(){
    setEdit(!edit)
  }

  function updateDiagnosis(){
    console.log('data',data)
    let updateurl = `http://localhost:8000/patients/report/modify/${hosp_id}/${patient_id}/${data['report_id']}`
    axios.post(updateurl,data,{withCredentials : true})
    .then((res)=>{
      if(res.data.success && res.data.update){
        editMode()
      }
    })
    .catch((err)=>{console.log(err)})

  }

  

  return (data.length != 0) ?(
    <>
    <div style={{height : '20px'}}></div>
    <Card style={{ width: '97%' }}>
      <Card.Header>
        <h4 style={{'display' : 'inline'}}>Diagnosis</h4>
        {!edit && <Button variant='outline-dark' onClick={editMode} style={{'marginLeft' : '10px'}}>Edit</Button>}
        {edit && <Button variant='outline-dark' onClick={updateDiagnosis} style={{'marginLeft' : '10px'}}>Save</Button>}
        {edit && <Button variant='outline-dark' onClick={editMode} style={{'marginLeft' : '10px'}}>Cancel</Button>}
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <>
          <h5>Problem</h5>
          {(edit == true) ? <Form.Control as="textarea" rows={3} value={data.description_of_illness}
          onChange={(e)=>{
            let temp = Object.assign({},data)
            temp.description_of_illness = e.target.value
            setData(temp)
          }}/> :
           <p style={{'fontSize' : '15px'}} >{data.description_of_illness}</p>}
          
          </>
        </ListGroup.Item>
        <ListGroup.Item>
          <>
          <h5>Previous Medical Issues</h5>
          {(edit == true) ? <Form.Control as="textarea" rows={3} value={data.prev_medical_issues}
          onChange={(e)=>{
            let temp = Object.assign({},data)
            temp.prev_medical_issues = e.target.value
            setData(temp)
          }}/> :
          <p style={{'fontSize' : '15px'}} >{data.prev_medical_issues}</p>}
          </>
        </ListGroup.Item>
      </ListGroup>
    </Card>
    <div style={{height : '20px'}}></div>
    </>
  ) : <></>
}

export default Diagnosis