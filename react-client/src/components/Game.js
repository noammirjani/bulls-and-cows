import {Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import CheckGuessButton from "./CheckGuessButton";
import NumberSelector from "./NumberSelector";
import UserMessages from "./UserMessages";
import GuessingTable from "./GuessingTable";


function Game({setWin, setInGame, newGame, setNewGame}) {

    const initialGuess = ['guess...', 'guess...', 'guess...', 'guess...'];
    const initialMsg = "Your history of guesses will appear below:";

    const [actualNumbers, setActualNumbers] = useState(() => generateRandom());
    const [guessNumbers, setGuessNumbers] = useState(initialGuess);
    const [userMessage, setUserMessage] = useState(initialMsg);
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
        setGuessNumbers(initialGuess);
        setNewGame(false);
        setCowsAndBulls([]);
        setUserMessage(initialMsg);
    }

    // Hook for the newGame state
    useEffect(() => {
        if (newGame) {
            init();
        }
    }, [newGame]);

    return (
        <>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5 ">
                <NumberSelector index={0} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                <NumberSelector index={1} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                <NumberSelector index={2} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                <NumberSelector index={3} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <CheckGuessButton actualNumbers={actualNumbers}
                                  currGuesses={guessNumbers}
                                  setMsg={setUserMessage}
                                  setCowsAndBulls={setCowsAndBulls}
                                  setWin={setWin}
                                  setInGame={setInGame}
                />
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <UserMessages userMessage={userMessage}/>
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <GuessingTable cowsAndBulls={cowsAndBulls}/>
            </Row>

        </>
    );
}

export default Game;
