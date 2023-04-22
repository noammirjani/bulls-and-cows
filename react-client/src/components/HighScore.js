import WinnerRow from "./WinnerRow";
import {Row} from "react-bootstrap";

/**
 * HighScore component displays the current high scores of the game. It receives an array of player stats objects
 * and renders a table showing the player's name and their score.
 *
 * @param {object[]} currHighscores - The array of objects containing the current high scores.
 * @returns a JSX element containing the high scores table.
 */
function HighScore({currHighscores}) {

    const rows = [];

    currHighscores.forEach((data, index) => {
        rows.push(<WinnerRow playerStats={data} index={index} key={index}/>)
    })

    return (
        <div className=" text-lg-center mb-5">
            <Row className=" d-flex justify-content-center" >
                <table className="table table-warning table-striped-columns table-hover table-bordered border-light">
                    <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </Row>
        </div>
    );
}

export default HighScore;
