import { useState } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
function FeaturesTabs() {
    const [key, setKey] = useState('');
    return (
        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                >
                <Tab eventKey="tasks" title="tasks">
                </Tab> 
                <Tab eventKey="chat" title="Chat">
                </Tab>
                <Tab eventKey="allFiles" title="ALL Files">
                </Tab>
                <Tab eventKey="charts" title="Charts">
                </Tab>
            </Tabs>
        </>
    )
}

export default FeaturesTabs
 
