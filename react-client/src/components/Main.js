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
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (newGame) {
            setInGame(true);
            setInWin(false);
        }
    }, [newGame]);

    return (
        <>
            <div className="card mb-3 border-light" style={{backgroundColor: "#ffe4a9"}}>
                <CardImage/>
                <div className="card-body">
                    <Container>
                        <MenuButtons setNewGame={setNewGame}/>
                        {inGame &&
                            <Game setWin={setInWin}
                                  setInGame={setInGame}
                                  newGame={newGame}
                                  setNewGame={setNewGame}
                                  setScore={setScore}
                            />
                        }
                        {inWin &&
                            <Win
                                score={score}
                                setInWin={setInWin}
                                setInHighScore={setInHighScore}
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
