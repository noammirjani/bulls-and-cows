import {Row} from "react-bootstrap";
import UserMessages from "./UserMessages";


function Win({setWinnerData, winnerData, setInWin, setInHighScore, setWinnerSubmit}) {

    const variant = "success large-alert text-uppercase";

    function handleSubmit(event){
        //check that name is valid
        //enter winner to list of winners and it score -> if needed update the score of existed name
        event.preventDefault();
        setWinnerData({score: winnerData.score, userName: event.target.userName.value})
        console.log(event.target.userName.value)
        setInWin(false);
        setInHighScore(true);
        setWinnerSubmit(true);
    }

    return (
        <>
            <Row className=" d-flex justify-content-center" >
                <UserMessages userMessage={`you win! your score is ${winnerData.score}!`} variant={variant} className="text-uppercase" />
            </Row>

            <Row className="d-flex justify-content-center text-center">
                <form onSubmit={handleSubmit} className="mx-auto">
                    <div className="input-group">
                        <span className="input-group-text fw-bolder fs-4" id="basic-addon1">@</span>
                        <input
                            placeholder="Enter username:"
                            type="text"
                            name="userName"
                            className="form-control text-center fw-bolder fs-4"
                        />
                        <div className="input-group-btn">
                            <button type="submit" className="btn btn-lg btn-outline-success fw-bolder fs-4">
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </Row>

        </>
    );
}


export default Win;