import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { filterData } from '../commonfunctions'
import { ListGroup, Card, Table, Toast } from 'react-bootstrap' 

function Billing(params) {
    const [data,setData] = useState([])
    const patient_id = params.patientData.patient_id
    const hosp_id = params.patientData.hosp_id
    let total = 0;
    let amount_paid = 0;
    let due_amount = 0;
  
    const url = `http://localhost:8000/patients/bills/${hosp_id}/${patient_id}`
  
    useEffect(()=>{
      axios.get(url,{withCredentials : true})
      .then((res)=>{
        if(res.data.success){
          setData(filterData(res.data.data))
        }
      })
      .catch((err)=>{console.log(err)})
    },[url])
  
    
  
    return (data.length != 0) ?(
      <>
      <div style={{height : '20px'}}></div>
      <Card style={{ width: '97%' }}>
        <Card.Header><h4>Billing</h4></Card.Header>
        <div style={{'marginLeft' : '5px', 'marginRight' : '5px', 'marginTop' : '5px'}}>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>SNo</th>
                    <th>Service</th>
                    <th>Price</th>
                    <th>Amount Paid</th>
                    <th>Amount Due</th>
                </tr>
            </thead>
            <tbody>
                {data.map((service,index)=>{
                    total = total + service.price;
                    amount_paid = amount_paid + service.amount_paid
                    due_amount = due_amount + service.due_amount
                    return(
                        <tr key={index}>
                            <td>{service.bill_id}</td>
                            <td>{service.pays_for}</td>
                            <td>{service.price}</td>
                            <td>{service.amount_paid}</td>
                            <td>{service.due_amount}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td></td>
                    <td>Total</td>
                    <td>{total}</td>
                    <td>{amount_paid}</td>
                    <td>{due_amount}</td>
                </tr>
            </tbody>
        </Table>
        </div>
      </Card>
      <div style={{height : '20px'}}></div>
      </>
    ) : <></>
}

export default Billing