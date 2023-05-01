import Table from "./Tables";

/*
 * HighScore component displays the current high scores of the game. It receives an array of player stats objects
 * and renders a table showing the player's name and their score.
 *
 * @param {object[]} currHighscores - The array of objects containing the current high scores.
 * @returns a JSX element containing the high scores table.
 */
function HighScore({currHighscores}) {

    const usersWithIndex = currHighscores.map((score, index) => {
        return {...score, place: index+1};
    });

    return (
        <Table rowsData={usersWithIndex} titles={["place","username","score"]} tkey={"scores"} />
    );
}

export default HighScore;
