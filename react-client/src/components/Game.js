import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import GameButtons from "./GameButtons";
import NumberSelector from "./NumberSelector";


function Game() {
    const NUMBER_OF_DIGITS = 4;
    const [actualNumbers, setActualNumbers] = useState(() => generateRandom());

    function generateRandom() {

        let randomNumber = Math.floor(Math.random() * 9000) + 1000;
        let digitsArray = randomNumber.toString().split("").map(digit => parseInt(digit));
        console.log(digitsArray);
        return digitsArray;
    }

    return (
        <>
            <Container>
                <Row className="d-flex justify-content-center text-center mb-3">
                    <GameButtons/>
                </Row>
                <Row className="d-flex justify-content-center text-center mb-3">
                    <NumberSelector/>
                    <NumberSelector/>
                    <NumberSelector/>
                    <NumberSelector/>
                </Row>
            </Container>


        </>
    );
}

export default Game