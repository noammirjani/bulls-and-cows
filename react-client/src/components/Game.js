import {Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import CheckGuessButton from "./CheckGuessButton";
import NumberSelector from "./NumberSelector";
import UserMessages from "./UserMessages";
import GuessingTable from "./GuessingTable";


function Game({setInWin, setInGame, setScore, actualNumbers, guessNumbers, userMessage, cowsAndBulls,setGuessNumbers,
                  setUserMessage, setCowsAndBulls}) {

    return (
        <>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5 ">
                <NumberSelector index={0} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                <NumberSelector index={1} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                <NumberSelector index={2} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
                <NumberSelector index={3} currGuesses={guessNumbers} setGuess={setGuessNumbers}/>
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <CheckGuessButton actualNumbers={actualNumbers}
                                  currGuesses={guessNumbers}
                                  setMsg={setUserMessage}
                                  cowsAndBulls={cowsAndBulls}
                                  setCowsAndBulls={setCowsAndBulls}
                                  setInWin={setInWin}
                                  setInGame={setInGame}
                                  setScore={setScore}
                />
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <UserMessages userMessage={userMessage} variant={"warning"}/>
            </Row>
            <Row className="d-flex justify-content-center text-center mb-5 mt-5">
                <GuessingTable cowsAndBulls={cowsAndBulls}/>
            </Row>

        </>
    );
}

export default Game;
