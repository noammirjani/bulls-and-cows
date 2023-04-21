import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import GameRules from "./GameRules";

function MenuButtons({setInGame, setInWin, setInHighScore, initFunc}) {

    const [rulesModal, setRulesModal] = useState(false);

    function startNewGame(){
        setInGame(true);
        setInWin(false);
        setInHighScore(false);
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