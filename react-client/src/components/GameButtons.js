import {Col} from "react-bootstrap";
import {useState} from "react";
import GameRules from "./GameRules";


function GameButtons() {
    const [rulesModal, setRulesModal] = useState(false);
    function checkGuess() {
        
    }

    function initGame() {

    }

    return (
        <>
            <Col>
                <button className="btn btn-lg btn-outline-light fw-bolder fs-4" onClick={() => setRulesModal(true)}>
                    Show Rules
                </button>
            </Col>
            <Col>
                <button type="button" className="btn btn-lg btn-outline-light fw-bolder fs-4" onClick={checkGuess}>
                    Check Your Guess
                </button>
            </Col>
            <Col>
                <button type="button" className="btn btn-lg btn-outline-light fw-bolder fs-4" onClick={initGame}>
                    New Game
                </button>
            </Col>
            {rulesModal && <GameRules onClose={() => setRulesModal(false)} />}
        < />
    );
}

export default GameButtons;