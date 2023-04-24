import {Container} from "react-bootstrap";
import {useState} from "react";
import CardImage from "./CardImage";
import MenuButtons from "./MenuButtons";
import UserMessages from "./UserMessages";
import Game from "./Game";
import Win from "./Win";
import HighScore from "./HighScore";

/*
 * Main component is the root component of the game. It contains the game logic and renders other components.
 * It manages the state of the game, user data and handles API calls to store and retrieve high scores.
 *
 * @returns a JSX element containing the game interface.
 */
function Main() {
    //const variables
    const initialGuess = ['', '', '', ''];
    const initialMsg = "Your history of guesses will appear below:";
    const [GAME, WIN, HIGHSCORES] = ["game", "win", "highscore"];

    // game states
    const [actualNumbers, setActualNumbers] = useState(() => generateRandom());
    const [guessNumbers, setGuessNumbers] = useState(initialGuess);
    const [gameMessage, setGameMessage] = useState(initialMsg);
    const [cowsAndBulls, setCowsAndBulls] = useState([]);

    // control game screens
    const [gameState, setGameState] = useState(GAME);
    const [userScore, setUserScore] = useState(0);
    const [error, setError] = useState("");
    const [currHighscores, setCurrHighscores] = useState([]);

    /**
     * Generates a random array of four unique numbers from 0 to 9.
     *
     * @returns {string[]} an array of four unique numbers as strings.
     */
    function generateRandom() {
        const digits = new Set();
        while (digits.size < 4) {
            digits.add(Math.floor(Math.random() * 10).toString());
        }
        console.log(digits);
        return [...digits];
    }

    /**
     * Resets the game to its initial state.
     */
    function init() {
        setGameState(GAME);
        setGuessNumbers(initialGuess);
        setCowsAndBulls([]);
        setGameMessage(initialMsg);
        setActualNumbers(generateRandom());
        setError("");
    }

    /**
     * Handles the response from a fetch request.
     *
     * @param {object} res - The response object.
     * @returns the JSON data from the response.
     * @throws {Error} if the response is not ok.
     */
    function handleResponse(res) {
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        setError("");
        return res.json();
    }

    /**
     * Handles the JSON data returned by a fetch request.
     * @param {object} jsonObj - The JSON data returned by the request.
     */
    function handleJson(jsonObj) {
        setCurrHighscores(jsonObj);
    }

    /**
     * Handles errors that occur during a fetch request.
     * @param {object} error - The error object.
     */
    function handleError(error) {
        setError("Some error occurred:" + error.toString());
    }

    /**
     * Sends a POST request to the server to save the user's name and score to the high scores list.
     * @param {string} name - The user's name.
     */
    function handlePostWinner(name) {
        const url = "/api/highscores"
        let params = {
            username: name,
            score: userScore
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            },
            body: new URLSearchParams(params).toString()
        })
            .then(handleResponse)
            .then(handleJson)
            .then(handleGetHighScore)
            .catch(handleError);
    }

    /**
     * Sends a GET request to the server to retrieve the current high scores list.
     */
    function handleGetHighScore() {
        const url = "/api/highscores"

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            }
        })
            .then(handleResponse)
            .then(handleJson)
            .then(() => setGameState(HIGHSCORES))
            .catch(handleError);
    }

    return (
        <>
            <div className="card mb-3 border-light" style={{backgroundColor: "#ffe4a9"}}>
                <CardImage/>
                <div className="card-body border border-white">
                    <Container>
                        <MenuButtons initFunc={init}/>
                        {error && <UserMessages userMessage={error} variant={"danger"}/>}
                        {gameState === GAME && <Game setScore={setUserScore}
                                                     actualNumbers={actualNumbers}
                                                     guessNumbers={guessNumbers}
                                                     userMessage={gameMessage}
                                                     cowsAndBulls={cowsAndBulls}
                                                     setGuessNumbers={setGuessNumbers}
                                                     setUserMessage={setGameMessage}
                                                     setCowsAndBulls={setCowsAndBulls}
                                                     setGameState={setGameState}
                        />}
                        {gameState === WIN && <Win userScore={userScore} handlePostWinner={handlePostWinner}/>}
                        {gameState === HIGHSCORES && <HighScore currHighscores={currHighscores}/>}
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Main;