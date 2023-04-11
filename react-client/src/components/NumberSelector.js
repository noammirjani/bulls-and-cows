import {Col} from "react-bootstrap";

function NumberSelector({index, currGuesses, setGuess}){

    function handleSelect(newGuess){

        const newGuesses = currGuesses.map((val, i) => {
            return index === i ? newGuess : val;
        })

        setGuess(newGuesses);
    }

    return (
        <Col>
        <label>
            <select value={currGuesses[index]}
                    className="form-select form-select-lg"
                    aria-label="Guess"
                    onChange={(e) => handleSelect(e.target.value)}
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