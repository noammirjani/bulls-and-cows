import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import GameButtons from "./GameButtons";
import NumberSelector from "./NumberSelector";
import UserMessages from "./UserMessages";


function Game() {
    const NUMBER_OF_DIGITS = 4;
    const [actualNumbers, setActualNumbers] = useState(() => generateRandom());
    const [guessNumbers, setGuessNumbers] = useState(['guess...', 'guess...', 'guess...', 'guess...']);
    const [userMessage, setUserMessage] = useState("Your history of guesses will appear below:");
    const [newGame, setNewGame] = useState(false);


    function generateRandom() {
        // Generate a random array of numbers
        const digits = new Set();
        while (digits.size < 4) {
            digits.add(Math.floor(Math.random() * 10).toString());
        }
        console.log(digits);
        return [...digits];
    }

    function init() {
        setActualNumbers(generateRandom());
        setGuessNumbers(['guess...', 'guess...', 'guess...', 'guess...']);
        setNewGame(false);
    }

    // Hook for the newGame state
    useEffect(() => {
        if (newGame) {
            init();
        }
    }, [newGame]);

    return (
        <>
            <Container>
                <Row className="d-flex justify-content-center text-center mb-3">
                    <GameButtons  actualNumbers={actualNumbers} currGuesses={guessNumbers} setMsg={setUserMessage} newGame={setNewGame}/>
                </Row>
                <Row className="d-flex justify-content-center text-center mb-3">
                    <NumberSelector index={0} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                    <NumberSelector index={1} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                    <NumberSelector index={2} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                    <NumberSelector index={3} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                </Row>
                <Row className="d-flex justify-content-center text-center mb-3">
                    <UserMessages userMessage={userMessage}/>
                </Row>
                <Row className="d-flex justify-content-center text-center mb-3">
                    <UserMessages userMessage={userMessage}/>
                </Row>
            </Container>
        </>
    );
}

export default Game;
