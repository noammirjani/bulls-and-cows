import {Row} from "react-bootstrap";
import UserMessages from "./UserMessages";


function HighScore({setInHighScore, setInGame}) {

    return (
        <div className=" text-lg-center mb-5">
            <Row className=" d-flex justify-content-center" >
                <UserMessages userMessage={`suppose to be high score list`} className="text-uppercase" />
            </Row>
        </div>
    );
}


export default HighScore;