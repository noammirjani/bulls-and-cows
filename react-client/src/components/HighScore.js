import {Row} from "react-bootstrap";

import WinnerRow from "./WinnerRow";


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