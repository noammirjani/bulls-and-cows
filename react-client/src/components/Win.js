import {Row} from "react-bootstrap";
import UserMessages from "./UserMessages";


function Win({userScore, handlePostWinner}) {

    const variant = "success large-alert text-uppercase";

    function handleSubmit(event){
        event.preventDefault();
        handlePostWinner(event.target.userName.value);
    }

    return (
        <>
            <Row className=" d-flex justify-content-center" >
                <UserMessages userMessage={`you win! your score is ${userScore}!`} variant={variant} className="text-uppercase" />
            </Row>

            <Row className="d-flex justify-content-center text-center">
                <form onSubmit={handleSubmit} className="mx-auto">
                    <div className="input-group">
                        <span className="input-group-text fw-bolder fs-4" id="basic-addon1">@</span>
                        <input
                            placeholder="Enter username:"
                            type="text"
                            pattern="^[a-zA-Z]+$"
                            title="Only Letters !"
                            name="userName"
                            className="form-control text-center fw-bolder fs-4"
                            required
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