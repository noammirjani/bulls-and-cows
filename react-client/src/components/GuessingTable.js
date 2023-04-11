import {forEach} from "react-bootstrap/ElementChildren";
import GuessingRow from "./GuessingRow";

function GuessingTable({cowsAndBulls}) {

    const rows = [];

    cowsAndBulls.forEach((data, index) => {
        rows.push(<GuessingRow guessData={data} key={index}/>)
        console.log(data);
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

export default GuessingTable