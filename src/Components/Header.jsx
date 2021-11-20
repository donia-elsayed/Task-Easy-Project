// import PropTypes from 'prop-types';
import { Row } from "react-bootstrap"
import Buttons from "./buttons"
import Tasks from './tasks'
function Header({title}) {
    return (
        <header className="container">
            <Row className="mx-0">
            <h1 className="text-center">Task Tracker</h1>
            <Tasks></Tasks>
            <Buttons/>
            </Row>
        </header>
    )
}
// Headers.PropTypes = {
//     title:PropTypes.string.isRequired,
// }
export default Header
