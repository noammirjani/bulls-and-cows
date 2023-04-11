import Game from "./Game";
import CardImage from "./CardImage";
import {useState} from "react";
import Win from "./Win";
import {Container, Row} from "react-bootstrap";
import MenuButtons from "./MenuButtons";

function Main() {

    const [inGame, setInGame] = useState(true);
    const [inWin, setInWin] = useState(false);
    const [inHighScore, setInHighScore] = useState(false);

    const [newGame, setNewGame] = useState(false);

    return (
        <>
            <div className="card mb-3 border-light" style={{backgroundColor: "#f1ce76"}}>
                <CardImage/>
                <div className="card-body">
                    <Container>
                        <MenuButtons setNewGame={setNewGame}/>
                        {inGame &&
                            <Game setWin={setInWin} setInGame={setInGame} newGame={newGame} setNewGame={setNewGame}/>}
                        {inWin && <Win/>}
                        {inHighScore && <Game/>}
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Main;
