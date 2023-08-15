import Cookies from 'js-cookie';
import React, {useState} from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyProfileModal from '../components/MyProfileModal.jsx';
import ManageAdminModal from './ManageAdminModal.jsx';
import PasswordModal from './PasswordModal.jsx';

export default function MyNavbar(params){
    const [showProfile, setProfile] = useState(false)
    const [showPasswordChange, setPassword] = useState(false)
    const [adminModal, setAdminModal] = useState(false)
    const user_type = Cookies.get('user_type');
    const navigate = useNavigate();

    function logout(){
        Cookies.remove('jwt')
        navigate('/')
    }

    function openProfile(){
        setProfile(!showProfile)
    }

    function openPasswordModal(){
        setPassword(!showPasswordChange)
    }

    function openAdmin(){
        setAdminModal(!adminModal)
    }

    return(<>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Hospital Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    <NavDropdown title="Options" id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={openProfile}>My Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={openPasswordModal} >Change Password</NavDropdown.Item>
                        {(user_type < 3) && <NavDropdown.Item onClick={openAdmin}>Manage Admins</NavDropdown.Item>}
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    {/* <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Container>
    </Navbar>
    {(showProfile) ? <MyProfileModal openProfile={openProfile} showProfile={showProfile}/> : <></>}
    {(showPasswordChange) ? 
    <PasswordModal openPassword={openPasswordModal} showPassword={showPasswordChange} toast={params.toast}/>
    : <></>}
    {(adminModal) ? <ManageAdminModal show={adminModal} onHide={openAdmin} toast={params.toast}/> : <></>}
    </>
    );
}