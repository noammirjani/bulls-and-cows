import NumberSelector from "./NumberSelector";
import {Row} from "react-bootstrap";
import CheckGuessButton from "./CheckGuessButton";
import UserMessages from "./UserMessages";
import Tables from "./Tables";


/**
 * Game component is the main component for the Bulls and Cows game. It displays the number selector, check guess button,
 * user messages, and guessing table. The component receives various props that it uses to manage the game state and
 * update the UI.
 *
 * @param {object} props - The props object containing the various props used by the component.
 * @param {number[]} props.guessNumbers - The array of numbers representing the player's current guess.
 * @param {function} props.setGuessNumbers - The function used to set the player's guess.
 * @param {number[]} props.actualNumbers - The array of numbers representing the secret code.
 * @param {string} props.userMessage - The message to be displayed to the user.
 * @param {function} props.setUserMessage - The function used to set the user message.
 * @param {object[]} props.cowsAndBulls - The array of objects representing the player's guesses and their results.
 * @param {function} props.setCowsAndBulls - The function used to set the array of cows and bulls.
 * @param {boolean} props.inWin - A boolean value indicating if the player has won the game.
 * @param {boolean} props.inGame - A boolean value indicating if the game is still in progress.
 * @param {number} props.score - The player's current score.
 * @param {function} props.setScore - The function used to set the player's score.
 * @returns a JSX element containing the various game components.
 */
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
                                  setScore={props.setScore}
                                  setState={props.setState}
                />
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <UserMessages userMessage={props.userMessage} variant={"warning"}/>
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <Tables rowsData={props.cowsAndBulls} titles={["guess","bulls","cows"]}/>
            </Row>

        </>
    );
}

export default Game;
