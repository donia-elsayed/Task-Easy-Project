import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import BarCharts from "../charts/BarCharts";
import ChatView from "../layout/ChatView";
import Todo from "../add-todo/Todo";
import ProjectDetails from '../project-details/ProjectDetails';
import "./Tabs.css";
import { Link } from 'react-router-dom';
function FeaturesTabs({show}) {
    return (
        <div className={`project__features ${show ?"active-cont":""}`}>
            <Tabs
                id="controlled-tab-example"
                className="mb-3"
                defaultActiveKey="tasks"
                >
                    <Link></Link>

                <Tab eventKey="tasks" title="Tasks">
                   <Todo/>
                </Tab> 
                <Tab eventKey="projectDetails" title="ProjectDetails">
                    <ProjectDetails/>
                </Tab>
                <Tab eventKey="chat" title="Chat">
                    <ChatView/>
                </Tab>
                <Tab eventKey="charts" title="Charts">
                    <BarCharts/>
                </Tab>
                <Tab eventKey="allFiles" title="All Files">
                    All Files
                </Tab>
            </Tabs>
        </div>
    )
}
export default FeaturesTabs