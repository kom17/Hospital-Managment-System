import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie'
import DisplayMsg from '../components/displayMsg';
import {Form, Button} from 'react-bootstrap';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('')
    const [displayMsg, setMsg] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        if(Cookies.get('jwt')){
            navigate('/dashboard')
        }
    },[Cookies,navigate])

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try{
            axios.post('http://localhost:8000/login',{
                'login_id' : email,
                'password' : password
            },{withCredentials : true}).then((response)=>{
                var data = response.data
                if(data.success){
                    navigate('/dashboard')
                }

            }).catch((error)=>{
                var data = error.response.data
                console.log(error)
                setMsg(data.msg)
            })
        }
        catch(err){
            console.log(err);
        }
    }
    return(
    <center>
    <div style={{width : '400px', marginTop : '10%', marginBottom : '10%'}}>
        <h2>HOSPITAL MANAGEMENT SYSTEM</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">        
                <Form.Label>Login id</Form.Label>
                <Form.Control type="text" placeholder="Enter Login id" value={email}
                 onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <DisplayMsg inputText={displayMsg}/>
            <Button variant="primary" type="submit">
            Log in
            </Button>
        </Form>
    </div>
    </center>);
}
