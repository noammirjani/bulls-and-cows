import CardImage from "./CardImage";
import {Container} from "react-bootstrap";
import MenuButtons from "./MenuButtons";
import UserMessages from "./UserMessages";
import Game from "./Game";
import Win from "./Win";
import HighScore from "./HighScore";
import {useState} from "react";

/**
 * Main component is the root component of the game. It contains the game logic and renders other components.
 * It manages the state of the game, user data and handles API calls to store and retrieve high scores.
 *
 * @returns a JSX element containing the game interface.
 */
function Main() {
    //const variables
    const initialGuess = ['', '', '', ''];
    const initialMsg = "Your history of guesses will appear below:";

    // state of the game
    const [inGame, setInGame] = useState(true);
    const [inWin, setInWin] = useState(false);
    const [inHighScore, setInHighScore] = useState(false);

    //user / game data
    const [userScore, setUserScore] = useState(0);
    const [actualNumbers, setActualNumbers] = useState(() => generateRandom());
    const [guessNumbers, setGuessNumbers] = useState(initialGuess);
    const [userMessage, setUserMessage] = useState(initialMsg);
    const [cowsAndBulls, setCowsAndBulls] = useState([]);

    const [hasError, setHasError] = useState(false);
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
        setGuessNumbers(initialGuess);
        setCowsAndBulls([]);
        setUserMessage(initialMsg);
        setActualNumbers(generateRandom());
    }

    /**
     * Handles the response from a fetch request.
     *
     * @param {object} res - The response object.
     * @returns the JSON data from the response.
     * @throws {Error} if the response is not ok.
     */
    function handleResponse(res) {
        console.log(res.status)
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

        setHasError(false);
        return res.json();
    }

    /**
     * Handles the JSON data returned by a fetch request.
     *
     * @param {object} jsonObj - The JSON data returned by the request.
     */
    function handleJson(jsonObj) {
        setCurrHighscores(jsonObj);
        console.log(jsonObj)
    }

    /**
     * Handles errors that occur during a fetch request.
     *
     * @param {object} error - The error object.
     */
    function handleError(error) {
        setHasError(true);
        setError("Some error occurred:" + error.toString());
    }

    /**
     * Sends a POST request to the server to save the user's name and score to the high scores list.
     *
     * @param {string} name - The user's name.
     */
    function handlePostWinner(name) {

        console.log("post form fetch!!");

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
            body: new URLSearchParams(params).toString
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
        setInWin(false);
        console.log("get highscore fetch!!");

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
            .then(() => setInHighScore(true))
            .catch(handleError);
    }

    return (
        <>
            <div className="card mb-3 border-light" style={{backgroundColor: "#ffe4a9"}}>
                <CardImage/>
                <div className="card-body">
                    <Container>
                        <MenuButtons
                            setInGame={setInGame}
                            setInWin={setInWin}
                            setInHighScore={setInHighScore}
                            initFunc={init}
                        />
                        {hasError && <UserMessages userMessage={error} variant={"danger"}/>}
                        {inGame &&
                            <Game setInWin={setInWin}
                                  setInGame={setInGame}
                                  setScore={setUserScore}
                                  actualNumbers={actualNumbers}
                                  guessNumbers={guessNumbers}
                                  userMessage={userMessage}
                                  cowsAndBulls={cowsAndBulls}
                                  setGuessNumbers={setGuessNumbers}
                                  setUserMessage={setUserMessage}
                                  setCowsAndBulls={setCowsAndBulls}
                            />
                        }
                        {inWin &&
                            <Win
                                userScore={userScore}
                                setInWin={setInWin}
                                handlePostWinner={handlePostWinner}
                            />
                        }
                        {inHighScore && <HighScore
                            currHighscores={currHighscores}
                        />
                        }
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Main;