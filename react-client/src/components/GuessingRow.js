/**
 * GuessingRow component is a row in the guessing table. It displays the player's guess and the number of bulls and cows in the guess.
 *
 * @param {object} guessData - The object containing the player's guess and its results.
 * @param {string} guessData.guess - The player's guess.
 * @param {number} guessData.bulls - The number of bulls in the player's guess.
 * @param {number} guessData.cows - The number of cows in the player's guess.
 * @returns a JSX element containing a row in the guessing table.
 */
function GuessingRow({guessData}){

    return(
        <tr className="justify-content-center fw-bolder fs-6">
            <td>{guessData.guess}</td>
            <td>{guessData.bulls}</td>
            <td>{guessData.cows}</td>
        </tr>
    );
}

export default GuessingRow;
