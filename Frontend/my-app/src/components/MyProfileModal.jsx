import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getDisplayTitle, getDataModalData } from '../commonfunctions'

function MyProfileModal(params) {
    const [data, setData] = useState([])

    const url = `http://localhost:8000/profile`
    useEffect(()=>{
        axios.get(url,{withCredentials : true})
        .then((res)=>{
            if(res.data.success){
                setData(res.data.data)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (data.length != 0) ? (
    <>
    <Modal
        size="lg"
        show={params.showProfile}
        onHide={params.openProfile}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            My Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{'overflowY': 'scroll', 'width' : '100%', 'height' : '80vh'}}>
            <ListGroup>
              {Object.keys(data[0]).map((item,index)=>{
                return (
                  <ListGroupItem key={index}>
                    <h6>{getDisplayTitle(item)}</h6>
                    <p style={{'fontSize' : '15px'}} >{data[0][item]}</p>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </div>
        </Modal.Body>
      </Modal>
    </>
  ) : <></>;
}

export default MyProfileModal