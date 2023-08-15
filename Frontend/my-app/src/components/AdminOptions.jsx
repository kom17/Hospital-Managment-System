import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'

function AdminOptions(params) {
    const [password, setPassword] = useState(false)
    const [new_password, setNewPassword] = useState('')
    const navigate = useNavigate()
    const my_login_id = Cookies.get('login_id')
    
    function changePassword(){
        let url = `http://localhost:8000/changepassword/${params.login_id}`
        let data = {
            'old_password' : null,
            'new_password' : new_password,
        }
        axios.post(url,data, {withCredentials : true})
        .then((res)=>{
            if(res.data.success){
                params.toast('Password Changed Succesfully','Manage Admins')
                setNewPassword('')
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Manage Admins')
        })
    }

    function deleteAdmin(){
        let url = `http://localhost:8000/admin/delete/${params.login_id}`
        let data = params.data
        axios.get(url, {withCredentials : true})
        .then((res)=>{
            if(res.data.success && res.data.delete){
                data.map((user,index)=>{
                    if(user['login_id'] == params.login_id){
                        if(my_login_id == params.login_id){
                            Cookies.remove('jwt')
                            navigate('/')
                        }
                        delete data[index]
                        params.setData(data)
                    }
                })
                params.toast('Admin Deleted Succesfully','Manage Admins')
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Manage Admins')
        })
        
    }

  return (
  <>
    {(!params.edit && !password) ? <>
    <Button variant='light' style={{'margin' : '2px'}}
    onClick={()=>{
        params.setEdit(true)
    }}
    >Edit Login ID</Button>

    <Button variant='light' style={{'margin' : '2px'}} onClick={deleteAdmin}>Delete</Button>

    <Button variant='light' style={{'margin' : '2px'}}
    onClick={()=>{
        setPassword(true)
    }}
    >Change Password</Button>
    </> : null}

    {password ? <Form.Control placeholder='New Password' 
    value={new_password} onChange={(e)=>{setNewPassword(e.target.value)}}/> : null}

    {(params.edit || password) ? <> 
    <Button variant='light' style={{'margin' : '3px'}}
    onClick={()=>{
        if(params.edit){
            params.changeLoginID()
        }
        else{
            changePassword()
            setPassword(false)
        }
    }}>Save</Button>
    <Button variant='light' style={{'margin' : '3px'}}
    onClick={()=>{
        if(params.edit){
            params.setNewID(params.old_id)
            params.setEdit(false)
        }else{
            setPassword(false)
        }
    }}
    >Cancel</Button>
    </>
     : null}

  </>
  )
}

export default AdminOptions