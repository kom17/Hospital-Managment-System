import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Modal, ListGroup, ListGroupItem, Button, Spinner } from 'react-bootstrap'
import { dataModalTitle, getDataModalData, getDataUrls, getDeleteUrls } from '../commonfunctions' 
import { getDisplayTitle, filterData } from '../commonfunctions'
import Diagnosis from './Diagnosis'
import Prescription from './Prescription'
import Billing from './Billing'
import AddModal from './AddModal'
import Cookies from 'js-cookie'




function DataModal(params) {
  const [data, setData] = useState(null)
  const [editData, setEditData] = useState(false)
  const user_dep_id = Cookies.get('dep_id')
  
  let height = window.innerHeight * 0.75

  function showEditModal(){
    setEditData(!editData)
  }

  function refreshComponent(){
    params.refresh()
    params.onHide(null)
  }

  function deleteData(data,dataType){
    var url = getDeleteUrls(dataType,data)
    axios.post(url,{},{withCredentials : true})
    .then((res)=>{
      if(res.data.success && res.data.delete){
        params.toast('Deleted Sucessfully', dataType)
        return true;
      }else{
        return false
      }
    })
    .catch((err)=>{
      console.log(err)
      return false;
    })
  }

  let title = ''
  useEffect(()=>{
    const hello = async ()=>{
      let modalData = await getDataModalData(params.dataToShow,params.show.details)
      setTimeout(()=>{
        setData(modalData)
      },500)
      
    }
    hello();
},[params.show.details])

    

if(data != null){
  title = dataModalTitle(params.dataToShow,data);
  // spinner = false
}


  return(data != null && params.show.details != null) ? (
    <Modal
        size="lg"
        show={params.show.show}
        onHide={() => {params.onHide(null);}}
        aria-labelledby="example-modal-sizes-title-lg"
      > 
        <Modal.Header closeButton>
          <div style={{'width' : '100%'}}>
          <Modal.Title id="example-modal-sizes-title-lg">
            {title}
          </Modal.Title>
          </div>
          <div style={{'width' : '100%'}}></div>
          <Button style={{'margin' : '4px'}} variant={'light'} onClick={()=>{showEditModal()}}
           disabled={!params.userPrivilages.edit}>Edit</Button>
          <Button style={{'margin' : '4px'}} variant={'light'} onClick={()=>{
            deleteData(params.show.details,params.dataToShow)
            params.onHide(null)
            params.refresh()
          }}
           disabled={!params.userPrivilages.delete}>Delete</Button>
        </Modal.Header>
        
        <Modal.Body>
        <div style={{'overflowY': 'scroll', 'width' : '100%', 'height' : height}}>
          <ListGroup variant="flush">
            {Object.keys(data).map((item,index)=>{
              return (
                <ListGroupItem key={index}>
                  <>
                  <h6>{getDisplayTitle(item)}</h6>
                  <p style={{'fontSize' : '15px'}} >{data[item]}</p>
                  </>
                </ListGroupItem>
              )
            })}
          </ListGroup>
          {(params.dataToShow == 'Patients' && user_dep_id != 3 && user_dep_id != 4)
           ? <Diagnosis patientData={params.show.details}/> : <></>}
          {(params.dataToShow == 'Patients' && user_dep_id != 4)
           ? <Prescription patientData={params.show.details}/> : <></>}
          {(params.dataToShow == 'Patients' && user_dep_id != 3)
           ? <Billing patientData={params.show.details}/> : <></>}
          </div>
        </Modal.Body>
        <AddModal show={editData} onHide={showEditModal} addType={params.dataToShow} refresh={refreshComponent} 
        edit={true} data={params.show.details} toast={params.toast}/>
      </Modal>
  ) : <></>
  // : <>
  // <div style={{'width' : '100%', 'height' : '80vh', 'verticalAlign' : 'middle'}}>
  //     <center>
  //         <Spinner animation="border" style={{'marginTop' : '50%','width' : '50px', 'height' : '50px'}} />
  //     </center>
  // </div>
  // </>
}

export default DataModal