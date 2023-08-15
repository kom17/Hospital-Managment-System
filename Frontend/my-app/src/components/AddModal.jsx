import React from 'react'
import { Modal } from 'react-bootstrap'
import AddDepartment from './AddDepartment'
import AddDoctor from './AddDoctor'
import AddHOD from './AddHOD'
import AddMedcine from './AddMedcine'
import AddPatient from './AddPatient'
import AddRoom from './AddRoom'
import AddStaff from './AddStaff'

function AddModal(params) {
  return (
    <>
    <Modal show={params.show} fullscreen={true} onHide={()=>{params.onHide()}}>
        <Modal.Header closeButton>
            <Modal.Title>{`Add ${params.addType}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
            (params.addType == 'Departments') ? <AddDepartment closeModal={params.onHide} refresh={params.refresh}
            edit={params.edit} data={params.data} toast={params.toast}/> :
            (params.addType == 'HODS') ? <AddHOD closeModal={params.onHide} refresh={params.refresh} 
            edit={params.edit} data={params.data} toast={params.toast}/> :
            (params.addType == 'Doctors') ? <AddDoctor closeModal={params.onHide} refresh={params.refresh}
            edit={params.edit} data={params.data} toast={params.toast}/> :
            (params.addType == 'Staff') ? <AddStaff closeModal={params.onHide} refresh={params.refresh}
            edit={params.edit} data={params.data} toast={params.toast}/> :
            (params.addType == 'Rooms') ?<AddRoom closeModal={params.onHide} refresh={params.refresh}
            edit={params.edit} data={params.data} toast={params.toast}/> :
            (params.addType == 'Pharmacy') ? <AddMedcine closeModal={params.onHide} refresh={params.refresh}
            edit={params.edit} data={params.data} toast={params.toast}/> :
            (params.addType == 'Patients') ? <AddPatient closeModal={params.onHide} refresh={params.refresh}
            edit={params.edit} data={params.data} toast={params.toast}/> :
            <h1>Nothing Selected to Add</h1>
            }
            
        </Modal.Body>
    </Modal>
    </>
  )
}

export default AddModal