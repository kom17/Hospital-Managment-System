import React, {useState} from 'react'
import AdminOptions from './AdminOptions';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { isLoginIdAvailable } from '../commonfunctions';

function AdminTableCell(params) {
    let display = ['login_id', 'user_type', 'buttons']
    const [edit, setEdit] = useState(false)
    const [old_id, setOldID] = useState(params.user['login_id'])
    const [new_id, setNewID] = useState(old_id)
    
    async function changeLoginID(){
        let url = 'http://localhost:8000/changeLoginID'
        let data = {
            old_id : old_id,
            new_id : new_id,
            hosp_id : params.user['hosp_id'],
        }
        let availability = await isLoginIdAvailable(new_id)

        if(!availability){
            params.toast('Login ID already exists')
        }else{
        axios.post(url, data, {withCredentials : true})
        .then((res)=>{
            if(res.data.success && res.data.delete){
                setEdit(false)
                setOldID(new_id)
                params.toast('Login ID Updated', 'Manage Admins')
            }
        })
        .catch((err)=>{
            console.log(err)
            params.toast(err.response.data.msg,'Manage Admins')
        })
    }

    }

  return (
    display.map((detail,index)=>{
        if(params.user['user_type'] == 1){
            if(detail == 'buttons'){
                return <td>
                <AdminOptions user={params.user} edit={edit} setEdit={setEdit} login_id={new_id} 
                toast={params.toast} old_id={old_id} setNewID={setNewID} changeLoginID={changeLoginID}
                data={params.data} setData={params.setData} />
                </td>
            }
            else if(detail == 'user_type'){
                return <td key={index}>Admin</td>
            }
            else if(detail == 'login_id'){
                return (edit) ? <td key={index}>
                    <Form.Control placeholder='Login ID' value={new_id}
                     onChange={(e)=>{setNewID(e.target.value)}}/>
                </td> : <td key={index}>
                    {new_id}
                </td>
            }
        }
    })
  )
}

export default AdminTableCell