/**
 * GameRules component displays the rules of the Bulls and Cows game. It explains the game's objective,
 * how to play the game, and what the "Exist" and "Match" columns in the guessing table mean.
 *
 * @returns a JSX element containing the rules of the game.
 */
function GameRules() {
    return (
        <div className="card mt-3">
            <div className="card-body bg-light">
                <p className="card-text bg-light fw-bolder text-start fs-4">
                    Bulls and Cows Game is also known as MasterMind. Computer selects a four digit number, all four digits are different.
                    In current implementation number may not begin with 0. Any number can be guessed in 7 tries or less.
                    "Exist" column displays total number of digits you guessed right - "Cow",
                    "Match" shows how many of those that exists were placed at the right spots - "Bull".
                    Play by entering your guess in the 4 boxes on the right side and click "Check" to validate your entry.
                    You may also click "New" to start another game. 🐄 🐂
                </p>
            </div>
        </div>
    );
}

export default GameRules;
