import Cookies from 'js-cookie';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import ShowToast from './ShowToast';

function PasswordModal(params) {
    const [old_password, setOldPassword] = useState()
    const [new_password, setNewPassword] = useState()
    const [confirm_password, setConfirmPassword] = useState()

    function submitFunction(){
        const jwt = Cookies.get('jwt')

        if(new_password != confirm_password){
          params.toast('New Passwords didn\'t match','Change Password')
        }
        else{
            let data = {
                'old_password' : old_password,
                'new_password' : new_password,
            }
            axios.post('http://localhost:8000/changepassword/self',data,{withCredentials : true})
            .then((res)=>{
                if(res.data.success){
                    params.toast('Password changed Succesfully','Change Password')
                    params.openPassword()
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                }
            })
            .catch((err)=>{
                console.log(err)
                params.toast(err.response.data.msg,'Change Password')
            })
        }
        }
        

  return (
    <div>
        <Modal show={params.showPassword} onHide={params.openPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                autoFocus
                value={old_password}
                onChange={(e)=>{setOldPassword(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" value={new_password} 
              onChange={(e)=>{setNewPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" value={confirm_password}
              onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={params.openPassword}>
            Close
          </Button>
          <Button variant="primary" onClick={submitFunction}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PasswordModal