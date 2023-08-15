
import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Table} from 'react-bootstrap';
import axios from 'axios';
import AdminTableCell from './AdminTableCell';
import { isLoginIdAvailable } from '../commonfunctions';


export default function ManageAdminModal(params){
    const [data, setData] = useState([])
    const [new_admin, setNewAdmin] = useState(false)
    const [login_id, setLoginID] = useState('')
    const [password, setPassword] = useState('')
    let titles=[]

    useEffect(()=>{
        let url= 'http://localhost:8000/users'
        axios.get(url,{withCredentials : true})
        .then((res)=>{
            if(res.data.success && res.data.found){
                setData(res.data.data)
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Change Password')
        })
    },[])

    async function addAdmin(){
        let url = 'http://localhost:8000/admin/add'
        let temp = {
            'login_id' : login_id,
            password : password,
            hosp_id : 1,
            user_type : 1,
            jwt_token : null,
            user_id : 1,
            dep_id : 1,
        }

        let availability = await isLoginIdAvailable(login_id)

        if(!availability){
            params.toast('Login ID already exists')
        }else{
        axios.post(url, temp, {withCredentials : true})
        .then((res)=>{
            if(res.data.success && res.data.insert){
                let new_data = data
                new_data.push(temp)
                setData(new_data)
                params.toast('New Admin Created', 'Manage Admins')
                setNewAdmin(false)
                setLoginID('')
                setPassword('')
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Manage Admins')
        })
    }
    }

    if(data.length != 0){
        titles = ['Login ID', 'User Type', 'Options']
    }

    return((data.length != 0) ? <>
    <Modal
      show={params.show} onHide={params.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Manage Admins
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table  bordered hover>
            <thead>
                <tr>
                    {titles.map((heading,index)=>{
                         return <th key={index}>{heading}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((user,index)=>{
                    return <tr key={index}>
                        <AdminTableCell user={user} toast={params.toast}
                        data={data} setData={setData}/>
                    </tr>
                })}
                { new_admin ? <> 
                    <tr>
                        <td><Form.Control placeholder='Login ID' value={login_id}
                        onChange={(e)=>{setLoginID(e.target.value)}}/></td>
                        <td>Admin</td>
                        <td> <Form.Control placeholder='Password' value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}/> </td>
                    </tr> 
                    <Button variant='light' style={{'marginTop' : '5px'}}
                    onClick={()=>{
                        addAdmin()
                    }}
                    >Add</Button>
                    <Button variant='light' style={{'marginTop' : '5px'}}
                    onClick={()=>{
                        setNewAdmin(false)
                        setLoginID('')
                        setPassword('')
                    }}
                    >Cancel</Button>
                    </>:<></>}
            </tbody>
        </Table>
        {!new_admin ? <Button variant='light' style={{'marginTop' : '0px'}} onClick={()=>{
            setNewAdmin(true)
          }}>Create New Admin</Button>:<></>}
      </Modal.Body>
    </Modal>
    </> : <><h1>ok</h1></>
    );
}