import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { Button, Table, Spinner } from 'react-bootstrap'
import DataModal from './DataModal'
import { getDisplayTitle, filterData, getPrivilages, getContentPageData, dictionarySort } from '../commonfunctions'
import AddModal from './AddModal'


const tabsUrls = {
    'Hospitals' : 'http://localhost:8000/hospital',
    'Departments' : 'http://localhost:8000/department',
    'HODS' : 'http://localhost:8000/hods',
    'Doctors' : 'http://localhost:8000/doctors',
    'Staff' : 'http://localhost:8000/staff',
    'Patients' : 'http://localhost:8000/patients',
    'Rooms' : 'http://localhost:8000/room',
    'Pharmacy' : 'http://localhost:8000/pharmacy'
}

function ContentPage(params) {
    const [data, setData] = useState({raw_data : [], display_data : []})
    const [refresh, setRefresh] = useState(false);
    const [addData, setAddData] = useState(false)
    
    let privilages = getPrivilages(params.ContentToShow)
    const [showData, setShowData] = useState({
        show : false,
        details : null
    })

    function refreshComponent(){
        setRefresh(!refresh)
    }

    function showAddModal(){
        setAddData(!addData)
    }

    function showDataModal(details){
        setShowData({
            show : !showData.show,
            details : details
        })
    }

    const url = tabsUrls[params.ContentToShow]
    var titles = []

    useEffect(()=>{
        const hello = async () => {
        axios.get(url,{withCredentials : true})
        .then(async(res)=>{
            if(res.data.success && res.data.found){
                let raw_data = filterData(res.data.data)
                let display_data = []
                let result = await getContentPageData(params.ContentToShow,raw_data)
                    setTimeout(()=>{
                    display_data = result;
                    let final_data = {}
                    final_data.raw_data = raw_data
                    final_data.display_data = display_data
                    setData(final_data)
                    },400)
                    
            }else{
                let final_data = {}
                final_data.raw_data = []
                final_data.display_data = []
                setData(final_data)
            }
        })
        .catch((err)=>{
            console.log(err)
        });
    }
hello()},[url,refresh])

    if(data.display_data.length != 0){
        let first = dictionarySort(data.display_data[0])
        titles = Object.keys(first)
    }

    return (data.display_data.length != 0) ? (
        <>
        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>SNo</th>
                    {titles.map((heading,index)=>{
                        return <th key={index}>{getDisplayTitle(heading)}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.display_data.map((item, index1)=>{
                    return(
                        <tr key={index1} onClick={()=>{showDataModal(data.raw_data[index1])}}>
                            <td>{index1 + 1}</td>
                            {titles.map((heading,index2)=>{
                                return <td key={index2}>{item[heading]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <Button style={{'marginLeft' : '95%', 'marginRight' : '0px'}} 
        variant={'outline-dark'} disabled={(!privilages.add)  || (params.ContentToShow == 'Hospitals')}
         onClick={()=>{showAddModal()}}>Add</Button>
        <DataModal show={showData} onHide={showDataModal} toast={params.toast}
        dataToShow={params.ContentToShow} 
        refresh={refreshComponent}
        userPrivilages={privilages}/>
        <AddModal show={addData} onHide={showAddModal} addType={params.ContentToShow} refresh={setRefresh}
         toast={params.toast}/>
        </>
    ) : <>
    <div style={{'width' : '100%', 'height' : '80vh', 'verticalAlign' : 'middle'}}>
        <center>
            <Spinner animation="border" style={{'marginTop' : '2px','width' : '50px', 'height' : '50px'}} />
        </center>
    </div>
    </>
}

export default ContentPage