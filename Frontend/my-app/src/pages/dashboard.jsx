import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import MyNavbar from '../components/navbar';
import MyTabs from '../components/myTabs';
import ContentPage from '../components/contentPage';
import {getTabList} from '../commonfunctions';
import ShowToast from '../components/ShowToast';


export default function Dashboard(){
    const tabList = getTabList();
    const [tabSelected, setTab] = useState(tabList[0]);
    const [showToast, setShowToast] = useState({'show' : false, 'message' : ''})

    function openToast(message,page){
        let temp = {
            'page' : page,
            'show' : !showToast.show,
            'message' : (message != null) ? message : showToast.message,
        }
        setShowToast(temp)
    }
    
    const navigate = useNavigate()
    useEffect(()=>{
        if(Cookies.get('jwt') == null){
            navigate('/')
        }
    },[])
    
    return(
        <div>
            <MyNavbar toast={openToast}  />
            <MyTabs tabsList={tabList} selectedTab={tabSelected} changeTab={setTab} />
            <ContentPage ContentToShow={tabSelected} toast={openToast}/>
            <ShowToast show={showToast} onClose={openToast} pagename={showToast.page}/>
        </div>
    );
}