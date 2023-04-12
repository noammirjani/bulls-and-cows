import {Row} from "react-bootstrap";
import UserMessages from "./UserMessages";


function Win({score, setInWin, setInHighScore}) {
    const variant = "success large-alert text-uppercase";

    function setWinner(){
        //check that name is valid
        //enter winner to list of winners and it score -> if needed update the score of existed name

        setInWin(false);
        setInHighScore(true);
    }

    return (
        <>
            <Row className=" d-flex justify-content-center" >
                <UserMessages userMessage={`you win! your score is ${score}!`} variant={variant} className="text-uppercase" />
            </Row>

            <Row className="d-flex justify-content-center">
                <div className="input-group">
                    <span className="input-group-text">@</span>
                    <input
                        name="username"
                        placeholder="enter username"
                        className="form-control-sm text-center"
                    />
                </div>
                <button type="button" className="btn btn-lg btn-outline-success fw-bolder fs-4 col-4" onClick={setWinner}>
                    submit
                </button>
            </Row>
        </>
    );
}


export default Win;