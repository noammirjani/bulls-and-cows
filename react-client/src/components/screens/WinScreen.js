import {Row} from "react-bootstrap";
import UserMessages from "../layout/UserMessages";

/**
 * WinScreen component is displayed when the user wins the game. It receives the user's score and a function to handle the
 * submission of the user's name for the high score table.
 *
 * @param {number} userScore - The user's score.
 * @param {function} handlePostWinner - The function to handle the submission of the user's name for the high score table.
 * @returns a JSX element containing a message congratulating the user on winning the game and a form to submit the
 * user's name for the high score table.
 */
function WinScreen({userScore, handlePostWinner}) {

    /**
     * Handles the submission of the user's name for the high score table.
     *
     * @param {event} event - The form submission event.
     */
    function handleSubmit(event){
        event.preventDefault();
        handlePostWinner(event.target.userName.value);
    }

    const variant = "success large-alert text-uppercase";

    return (
        <>
            <Row className=" d-flex justify-content-center" >
                <UserMessages userMessage={`you win! your score is ${userScore}!`}
                              variant={variant}
                              className="text-uppercase" />
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


export default WinScreen;
