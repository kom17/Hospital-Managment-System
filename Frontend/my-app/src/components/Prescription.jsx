import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { filterData } from '../commonfunctions'
import { ListGroup, Card, Button } from 'react-bootstrap' 

function sortPrescription(prescriptions){
    let dates = []
    prescriptions.map((item,index)=>{
        if(!dates.includes(item.prescribed_date)){
            dates.push(item.prescribed_date)
        }
    })

    let newPrescriptionSet = {}

    dates.map((date,index)=>{
        newPrescriptionSet[date] = [];
    })

    prescriptions.map((item,index)=>{
        newPrescriptionSet[item.prescribed_date].push(item)
    })

    return newPrescriptionSet
}

function Prescription(params) {
    const [data,setData] = useState([])
    const patient_id = params.patientData.patient_id
    const hosp_id = params.patientData.hosp_id
  
    const url = `http://localhost:8000/patients/prescription/${hosp_id}/${patient_id}`
  
    useEffect(()=>{
      axios.get(url,{withCredentials : true})
      .then((res)=>{
        if(res.data.success){
          setData(sortPrescription(filterData(res.data.data)))
        }
      })
      .catch((err)=>{console.log(err)})
    },[url])
  
    
  
    return (data.length != 0) ?(
      <>
      <h4 style={{'display' : 'inline'}}>Prescriptions</h4>
      {/* <Button variant='outline-dark' style={{'marginLeft' : '5px'}}>New</Button> */}
      {Object.keys(data).map((date,index)=>{
      return(
        <div key={index} style={{'margin' : '0px', 'padding' : '0px'}}>
        <div style={{height : '10px'}} ></div>
        <Card style={{ width: '97%' }}>
        <Card.Header><h5>{`Dr.${data[date][0].doc_name} prescribed on ${date}`}</h5></Card.Header>
        <ListGroup variant="flush">
            {data[date].map((medicine,index1)=>{
                return <ListGroup.Item key={index1}>
                <h6>{medicine.med_name}</h6>
                <p style={{'fontSize' : '15px'}} >{medicine.instructions}</p>
              </ListGroup.Item>
            })}
        </ListGroup>
      </Card>
      <div style={{height : '10px'}}></div>
      </div>)
      })}
      </>
    ) : <></>
}

export default Prescription