import {Button, Tab, Tabs} from 'react-bootstrap';

export default function MyTabs(params) {
    return (
    <Tabs activeKey={params.selectedTab} onSelect={(k)=>{params.changeTab(k)}} 
     defaultActiveKey={'Hospitals'} id="fill-tab-example" className="mb-3" fill>
        {params.tabsList.map((name,index)=>{
            return <Tab key={name} eventKey={name} title={name}></Tab>
        })}
    </Tabs>
  );
}



    