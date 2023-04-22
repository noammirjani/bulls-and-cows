import {Container} from "react-bootstrap";
import {useState} from "react";

import CardImage from "./CardImage";
import Game from "./Game";
import Win from "./Win";
import MenuButtons from "./MenuButtons";
import HighScore from "./HighScore";
import UserMessages from "./UserMessages";


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

    const [hasError, setHasError]         = useState(false);
    const [error, setError]               = useState("");
    const [currHighscores, setCurrHighscores] = useState([]);

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
        setGuessNumbers(initialGuess);
        setCowsAndBulls([]);
        setUserMessage(initialMsg);
        setActualNumbers(generateRandom());
    }

    function handleResponse(res) {
        console.log(res.status)
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

        setHasError(false);
        return res.json();
    }

    function handleJson(jsonObj) {
        setCurrHighscores(jsonObj);
        console.log(jsonObj)
    }

    function handleError(error) {
        setHasError(true);
        setError("Some error occurred:" + error.toString());
    }

    function handlePostWinner(name) {

        console.log("post form fetch!!");

        const url = "/api/highscores"
        let params = {
            username: name,
            score: userScore
        };

        fetch(url,  {
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

    function handleGetHighScore() {
        setInWin(false);
        console.log("get highscore fetch!!");

        const url = "/api/highscores"

        fetch(url,  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            }
        })
            .then(handleResponse)
            .then(handleJson)
            .then(()=> setInHighScore(true) )
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
                        {hasError && <UserMessages userMessage= {error} variant={"danger"} />}
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
