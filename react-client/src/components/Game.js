import { Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import GameButtons from "./GameButtons";
import NumberSelector from "./NumberSelector";
import UserMessages from "./UserMessages";
import GuessingTable from "./GuessingTable";


function Game() {

    const [actualNumbers, setActualNumbers] = useState(() => generateRandom());
    const [guessNumbers, setGuessNumbers] = useState(['guess...', 'guess...', 'guess...', 'guess...']);
    const [userMessage, setUserMessage] = useState("Your history of guesses will appear below:");
    const [newGame, setNewGame] = useState(false);
    const [cowsAndBulls, setCowsAndBulls] = useState([]);


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
        setCowsAndBulls([]);
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
                    <GameButtons  actualNumbers={actualNumbers}
                                  currGuesses={guessNumbers}
                                  setMsg={setUserMessage}
                                  newGame={setNewGame}
                                  setCowsAndBulls = {setCowsAndBulls}
                    />
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
                    <GuessingTable cowsAndBulls={cowsAndBulls} />
                </Row>
            </Container>
        </>
    );
}

export default Game;
