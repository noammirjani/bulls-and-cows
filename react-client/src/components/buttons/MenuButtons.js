import {Col, Row} from "react-bootstrap";
import GameRules from "../layout/GameRules";
import {useState} from "react";

/**
 * MenuButtons component displays the menu buttons for the game. It receives functions to start a new game, show the rules,
 * and set the game state variables for the current game.
 *
 * @param {function} initFunc - The function to initialize the game state variables for a new game.
 * @returns a JSX element containing the menu buttons.
 */
function MenuButtons({initFunc}) {

    const [rulesModal, setRulesModal] = useState(false);

    /**
     * Starts a new game by calling the provided initFunc and setting the "in game" and "in win" state variables.
     */
    function startNewGame(){
        initFunc();
    }

    return (
        <Row className="d-flex justify-content-center text-center mb-5 mt-5">
            <Col>
                <button className="btn btn-lg btn-outline-info fw-bolder fs-4"
                        onClick={() => setRulesModal(!rulesModal)}>
                    Show Rules
                </button>
            </Col>
            <Col>
                <button type="button" className="btn btn-lg btn-outline-primary fw-bolder fs-4"
                        onClick={startNewGame}>
                    New Game
                </button>
            </Col>
            {rulesModal && <GameRules/>}
        </Row>
    );
}

export default MenuButtons;
