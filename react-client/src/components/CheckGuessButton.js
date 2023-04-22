import { Col } from "react-bootstrap";

/**
 * CheckGuessButton component displays a button that allows the user to check their current guess.
 * The component takes in several props: actualNumbers (the correct guess), currGuesses (the current guess),
 * setMsg (a function to set the message displayed to the user), cowsAndBulls (an array to store past guesses and results),
 * setCowsAndBulls (a function to update the array cowsAndBulls), setInWin (a function to indicate if the user has won the game),
 * setInGame (a function to indicate if the game is still in progress), and setScore (a function to update the user's score).
 *
 * @returns a JSX element containing a button for checking the user's guess.
 */
function CheckGuessButton({actualNumbers, currGuesses, setMsg, cowsAndBulls, setCowsAndBulls, setInWin, setInGame, setScore}) {

    const MAX_BULLS = 4;
    const MAX_COWS = 0;

    const validMsg = "Your history of guesses will appear below:";
    const notValidDigit = "Please select 4 digits";
    const notValidUnique = "Please select 4 unique digits";

    /**
     * validations function checks if the current guess is valid. If the guess is invalid, it sets the message to display an error
     * message and returns false. Otherwise, it sets the message to a valid message and returns true.
     *
     * @returns true if the current guess is valid, false otherwise.
     */
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

    /**
     * calculateGuess function calculates the number of bulls and cows in the current guess.
     *
     * @returns an object containing the number of bulls and cows in the current guess.
     */
    function calculateGuess() {
        let bulls, cows;
        bulls = cows = 0;
        for (let i = 0; i < currGuesses.length; i++) {
            if (actualNumbers[i] === currGuesses[i]) bulls++;
            else if (actualNumbers[i] !== currGuesses[i] && actualNumbers.includes(currGuesses[i])) cows++;
        }
        return {bulls, cows};
    }

    /**
     * checkWin function checks if the player has won the game by matching the secret code.
     * If the player has won, it updates the score, sets the game state to "win", and disables the game.
     *
     * @param {number} bulls - The number of bulls in the player's guess.
     * @param {number} cows - The number of cows in the player's guess.
     * @returns {void}
     */
    function checkWin(bulls, cows) {
        if (bulls === MAX_BULLS && cows === MAX_COWS) {
            setScore(cowsAndBulls.length + 1);
            setInWin(true);
            setInGame(false);
        }
    }

    /**
     * checkGuess function checks if the player's guess is valid and then calculates the number of bulls and cows in the guess.
     * It updates the message to display the number of bulls and cows and adds the guess to the list of cows and bulls.
     * Finally, it checks if the player has won the game.
     *
     * @returns {void}
     */
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
                <button type="button" className="btn btn-lg btn-outline-success fw-bolder fs-4"
                        onClick={checkGuess}>
                    Check Your Guess
                </button>
            </Col>
        </>
    );
}

export default CheckGuessButton;
