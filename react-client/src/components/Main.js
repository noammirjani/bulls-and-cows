import Game from "./Game";
import CardImage from "./CardImage";
import {useEffect, useState} from "react";
import Win from "./Win";
import {Container, Row} from "react-bootstrap";
import MenuButtons from "./MenuButtons";
import HighScore from "./HighScore";

function Main() {

    const [inGame, setInGame] = useState(true);
    const [inWin, setInWin] = useState(false);
    const [inHighScore, setInHighScore] = useState(false);

    const [newGame, setNewGame] = useState(false);
    const [winnerSubmit, setWinnerSubmit] = useState(false);
    const [winnerData, setWinnerData] = useState({score : 0, userName:""});

    return (
        <>
            <div className="card mb-3 border-light" style={{backgroundColor: "#ffe4a9"}}>
                <CardImage/>
                <div className="card-body">
                    <Container>
                        <MenuButtons
                            setNewGame={setNewGame}
                            setInGame={setInGame}
                            setInWin={setInWin}
                            setInHighScore={setInHighScore}
                        />
                        {inGame &&
                            <Game setInWin={setInWin}
                                  setInGame={setInGame}
                                  newGame={newGame}
                                  setNewGame={setNewGame}
                                  setScore={setWinnerData}
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
