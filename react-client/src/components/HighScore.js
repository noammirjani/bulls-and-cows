import Table from "./Tables";


function HighScore({currHighscores}) {


    const usersWithIndex = currHighscores.map((score, index) => {
        return {...score, place: index};
    });


    return (
        <Table rowsData={usersWithIndex} titles={["place","username","score"]} tkey={"scores"} />
    );
}


export default HighScore;