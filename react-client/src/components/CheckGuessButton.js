import { Col } from "react-bootstrap";

/**
 * CheckGuessButton component displays a button that allows the user to check their current guess.
 *
 * @param {Object} props - The props object containing the various props used by the component.
 * @param {number[]} props.actualNumbers - The array of numbers representing the secret code.
 * @param {number[]} props.currGuesses - The array of numbers representing the player's current guess.
 * @param {function} props.setMsg - The function used to set the message displayed to the user.
 * @param {Object[]} props.cowsAndBulls - The array of objects representing the player's guesses and their results.
 * @param {function} props.setCowsAndBulls - The function used to set the array of cows and bulls.
 * @param {function} props.setInWin - The function used to set the win state.
 * @param {function} props.setInGame - The function used to set the game state.
 * @param {function} props.setScore - The function used to set the player's score.
 *
 * @returns a JSX element containing a button for checking the user's guess.
 */
function CheckGuessButton(props) {

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

        if (!props.currGuesses.every((val) => /^\d$/.test(val))) {
            props.setMsg(notValidDigit);
            return false;
        }

        if (props.currGuesses.length !== new Set(props.currGuesses).size) {
            props.setMsg(notValidUnique);
            return false;
        }

        props.setMsg(validMsg);
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

        for (let i = 0; i < props.currGuesses.length; i++) {
            if (props.actualNumbers[i] === props.currGuesses[i]) bulls++;
            else if (props.actualNumbers[i] !== props.currGuesses[i] &&
                     props.actualNumbers.includes(props.currGuesses[i])) cows++;
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
            props.setScore(props.cowsAndBulls.length + 1);
            props.setGameState("win");
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
            props.setMsg(`Your Guess: ${bulls} bulls and ${cows} cows.`);
            let currGuessData = {guess: props.currGuesses.join(" "), bulls: bulls, cows: cows};
            props.setCowsAndBulls(current => [currGuessData, ...current]);
            checkWin(bulls, cows);
        }
    }


    return (
        <>
            <Col>
                <button type="button"
                        className="btn btn-lg btn-outline-success fw-bolder fs-4"
                        onClick={checkGuess}>
                    Check Your Guess
                </button>
            </Col>
        </>
    );
}

export default CheckGuessButton;
