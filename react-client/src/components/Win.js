import {Row} from "react-bootstrap";
import UserMessages from "./UserMessages";


function Win({setScore, setInWin, setInHighScore}){

    return(
        <Row className="d-flex justify-content-center text-center mb-5 mt-5">
            <UserMessages userMessage={"you win"}/>
        </Row>

    );
}

export default Win;