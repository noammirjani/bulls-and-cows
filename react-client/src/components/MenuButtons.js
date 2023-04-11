import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import GameRules from "./GameRules";

function MenuButtons({setNewGame}) {

    const [rulesModal, setRulesModal] = useState(false);

    return (
        <Row className="d-flex justify-content-center text-center mb-5 mt-5">
            <Col>
                <button className="btn btn-lg btn-outline-light fw-bolder fs-4" onClick={() => setRulesModal(true)}>
                    Show Rules
                </button>
            </Col>
            <Col>
                <button type="button" className="btn btn-lg btn-outline-light fw-bolder fs-4"
                        onClick={() => setNewGame(true)}>
                    New Game
                </button>
            </Col>
            {rulesModal && <GameRules onClose={() => setRulesModal(false)}/>}
        </Row>
    );
}

export default MenuButtons;