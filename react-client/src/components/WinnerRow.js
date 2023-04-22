/**
 * WinnerRow component displays a row in the high score table for a single winner. It receives the player's statistics
 * (username and score) and the index of the row.
 *
 * @param {object} playerStats - An object containing the player's username and score.
 * @param {number} index - The index of the row in the table.
 * @returns a JSX element containing a row in the high score table for a single winner.
 */
function WinnerRow({playerStats, index}){

    return(
        <tr className="justify-content-center fw-bolder fs-6">
            <td>{index+1}</td>
            <td>{playerStats.username}</td>
            <td>{playerStats.score}</td>
        </tr>
    );
}

export default WinnerRow;
