import {Col} from "react-bootstrap";

/**
 * NumberSelector component is a select input for choosing a digit in a four-digit number guess. It receives an index
 * to represent which digit of the guess is being selected, and the current guess array and setter function to update
 * the guess array.
 *
 * @param {number} index - The index of the digit in the guess that this selector represents.
 * @param {number[]} currGuesses - The current guess array.
 * @param {function} setGuess - The function to update the current guess array.
 * @returns a JSX element containing a select input for choosing a digit in the guess.
 */
function NumberSelector({index, currGuesses, setGuess}) {

    /**
     * Handles updating the current guess array with the new selected digit.
     *
     * @param {string} newGuess - The new selected digit for the guess.
     */
    function handleSelect(newGuess) {

        const newGuesses = currGuesses.map((val, i) => {
            return index === i ? newGuess : val;
        })
        setGuess(newGuesses);
    }

    return (
        <Col className="col-md-3 col-8 mb-1">
            <label className="w-100">
                <select value={currGuesses[index]}
                        className="form-control form-switch text-center w-100"
                        aria-label="Guess"
                        onChange={(e) => handleSelect(e.target.value)}
                        style={{border: 'solid #BDD452', borderWidth: 3}}
                >
                    <option defaultValue>Guess...</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </label>
        </Col>
    );
}

export default NumberSelector;
