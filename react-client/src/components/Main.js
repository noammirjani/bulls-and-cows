import {Container} from "react-bootstrap";
import {useState} from "react";

import CardImage from "./CardImage";
import Game from "./Game";
import Win from "./Win";
import MenuButtons from "./MenuButtons";
import HighScore from "./HighScore";


function Main() {
    //const variables
    const initialGuess = ['', '', '', ''];
    const initialMsg = "Your history of guesses will appear below:";

    // state of the game
    const [inGame, setInGame] = useState(true);
    const [inWin, setInWin] = useState(false);
    const [inHighScore, setInHighScore] = useState(false);
    const [winnerSubmit, setWinnerSubmit] = useState(false);

    //user / game data
    const [winnerData, setWinnerData] = useState({score : 0, userName:""});
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
        setGuessNumbers(initialGuess);
        setCowsAndBulls([]);
        setUserMessage(initialMsg);
        setActualNumbers(generateRandom());
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
                        {inGame &&
                            <Game setInWin={setInWin}
                                  setInGame={setInGame}
                                  setScore={setWinnerData}
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
                                setWinnerData={setWinnerData}
                                winnerData={winnerData}
                                setInWin={setInWin}
                                setInHighScore={setInHighScore}
                                setWinnerSubmit={setWinnerSubmit}
                            />
                        }
                        {inHighScore && <HighScore
                            setInGame={setInGame}
                            setInHighScore={setInHighScore}
                            />
                        }
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Main;
