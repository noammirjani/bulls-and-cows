import {Col} from "react-bootstrap";
import {useState} from "react";
import GameRules from "./GameRules";


function GameButtons({actualNumbers, currGuesses, setMsg, newGame}) {


    const [rulesModal, setRulesModal] = useState(false);

    function validations(){

        const validMsg = "Your history of guesses will appear below:"
        const notValidDigit = "Please select 4 digits";
        const notValidUnique = "Please select 4 unique digits";

        if(!currGuesses.every((val) => /^\d$/.test(val))) {
            setMsg(notValidDigit);
            return false;
        }

        if(currGuesses.length !== new Set(currGuesses).size){
            setMsg(notValidUnique);
            return false;
        }

        setMsg(validMsg);
        return true;
    }


    function checkGuess() {

        if (validations()) {
            let bulls = 0;
            const cows = currGuesses.filter(number => actualNumbers.includes(number));
            for (let i = 0 ; i < currGuesses.length ; i++){
                if(actualNumbers[i] === currGuesses[i]) bulls++;
            }
            console.log(actualNumbers,currGuesses,cows, bulls);
            setMsg(`Your Guess: ${bulls} bulls and ${cows.length} cows.`);
        }
    }


    return (
        <>
            <Col>
                <button className="btn btn-lg btn-outline-light fw-bolder fs-4" onClick={() => setRulesModal(true)}>
                    Show Rules
                </button>
            </Col>
            <Col>
                <button type="button" className="btn btn-lg btn-outline-light fw-bolder fs-4" onClick={checkGuess}>
                    Check Your Guess
                </button>
            </Col>
            <Col>
                <button type="button" className="btn btn-lg btn-outline-light fw-bolder fs-4" onClick={() => newGame(true)}>
                    New Game
                </button>
            </Col>
            {rulesModal && <GameRules onClose={() => setRulesModal(false)} />}
        < />
    );
}

export default GameButtons;