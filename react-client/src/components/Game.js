import {Row} from "react-bootstrap";
import CheckGuessButton from "./CheckGuessButton";
import NumberSelector from "./NumberSelector";
import UserMessages from "./UserMessages";
import Tables from "./Tables";


function Game(props) {

    return (
        <>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5 ">
                <NumberSelector index={0} currGuesses={props.guessNumbers} setGuess={props.setGuessNumbers}/>
                <NumberSelector index={1} currGuesses={props.guessNumbers} setGuess={props.setGuessNumbers}/>
                <NumberSelector index={2} currGuesses={props.guessNumbers} setGuess={props.setGuessNumbers}/>
                <NumberSelector index={3} currGuesses={props.guessNumbers} setGuess={props.setGuessNumbers}/>
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <CheckGuessButton actualNumbers={props.actualNumbers}
                                  currGuesses={props.guessNumbers}
                                  setMsg={props.setUserMessage}
                                  cowsAndBulls={props.cowsAndBulls}
                                  setCowsAndBulls={props.setCowsAndBulls}
                                  setInWin={props.setInWin}
                                  setInGame={props.setInGame}
                                  setScore={props.setScore}
                />
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <UserMessages userMessage={props.userMessage} variant={"warning"}/>
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <Tables rowsData={props.cowsAndBulls} titles={["guess","bulls","cows"]} tableKey={"game"}/>
            </Row>

        </>
    );
}

export default Game;
