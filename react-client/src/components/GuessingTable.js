import GuessingRow from "./GuessingRow";

/**
 * GuessingTable component is a table that displays the player's guesses and their results (number of bulls and cows).
 *
 * @param {object[]} cowsAndBulls - The array of objects containing the player's guesses and their results.
 * @returns a JSX element containing the guessing table.
 */
function GuessingTable({cowsAndBulls}) {

    const rows = [];

    cowsAndBulls.forEach((data, index) => {
        rows.push(<GuessingRow guessData={data} key={index}/>)
    })

    return (
        <table className="table table-warning table-striped-columns table-hover table-bordered border-light">
            <thead>
            <tr>
                <th>Guess</th>
                <th>Bulls</th>
                <th>Cows</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default GuessingTable;
