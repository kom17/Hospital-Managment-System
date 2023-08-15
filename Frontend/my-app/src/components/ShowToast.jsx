import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

function ShowToast(params) {
  return (
    <div>
        <ToastContainer className="p-3" position={'bottom-end'}>
        <Toast onClose={params.onClose} show={params.show.show} delay={3000} autohide>
            <Toast.Header>
              <h5 className="me-auto">{params.pagename}</h5>
            </Toast.Header>
            <Toast.Body><h6>{params.show.message}</h6></Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  )
}

export default ShowToast