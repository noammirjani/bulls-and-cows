import {Col} from "react-bootstrap";

function CheckGuessButton({actualNumbers, currGuesses, setMsg, cowsAndBulls, setCowsAndBulls, setInWin, setInGame, setScore}) {

    const MAX_BULLS = 4;
    const MAX_COWS = 0;

    const validMsg = "Your history of guesses will appear below:"
    const notValidDigit = "Please select 4 digits";
    const notValidUnique = "Please select 4 unique digits";

    function validations() {

        if (!currGuesses.every((val) => /^\d$/.test(val))) {
            setMsg(notValidDigit);
            return false;
        }

        if (currGuesses.length !== new Set(currGuesses).size) {
            setMsg(notValidUnique);
            return false;
        }

        setMsg(validMsg);
        return true;
    }

    function calculateGuess() {
        let bulls ,cows ;
        bulls = cows = 0;
        //const cows = currGuesses.filter(number => actualNumbers.includes(number));
        for (let i = 0; i < currGuesses.length; i++) {
            if (actualNumbers[i] === currGuesses[i]) bulls++;
            else if (actualNumbers[i] !== currGuesses[i] && actualNumbers.includes(currGuesses[i])) cows++;
        }
        return {bulls, cows};
    }


    function checkWin(bulls, cows) {
        if (bulls === MAX_BULLS && cows === MAX_COWS) {
            setScore(cowsAndBulls.length+1);
            setInWin(true);
            setInGame(false);
        }
    }

    function checkGuess() {

        if (validations()) {
            const {bulls, cows} = calculateGuess();
            setMsg(`Your Guess: ${bulls} bulls and ${cows} cows.`);
            let currGuessData = {guess: currGuesses.join(" "), bulls: bulls, cows: cows};
            setCowsAndBulls(current => [currGuessData, ...current]);
            checkWin(bulls, cows);
        }
    }


    return (
        <>
            <Col>
                <button type="button" className="btn btn-lg btn-outline-success fw-bolder fs-4" onClick={checkGuess}>
                    Check Your Guess
                </button>
            </Col>
        < />
    );
}

export default CheckGuessButton;