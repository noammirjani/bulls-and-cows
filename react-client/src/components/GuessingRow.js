
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