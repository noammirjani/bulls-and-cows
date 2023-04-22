
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