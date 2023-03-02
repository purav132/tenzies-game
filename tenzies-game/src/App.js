import React from "react";
import Dice from "./Dice";
import Confetti from "react-confetti";

// localStorage.clear();

export default function App() {
  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++)
      arr.push({ id: i, value: Math.ceil(Math.random() * 6), isHeld: false });
    return arr;
  }

  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [minScore, setMinScore] = React.useState();

  React.useEffect(() => {
    const val = dices[0].value;
    for (let dice of dices) {
      if (!dice.isHeld) return;
      if (dice.value !== val) return;
    }
    setTenzies(true);
    // console.log("high score added");
    setMinScore((prevMinScore) =>
      !prevMinScore || score < prevMinScore ? score : prevMinScore
    );
  }, dices);

  function rollDice() {
    if (tenzies) {
      setDices(allNewDice());
      setTenzies(false);

      setScore(0);
    } else {
      setDices((prevDices) =>
        prevDices.map((dice) =>
          !dice.isHeld ? { ...dice, value: Math.ceil(Math.random() * 6) } : dice
        )
      );
      setScore((prevScore) => prevScore + 1);
    }
  }

  function heldDice(id) {
    setDices((prevDices) =>
      prevDices.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const diceComponent = dices.map((dice) => (
    <Dice key={dice.id} dice={dice} heldDice={heldDice} />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="main-title">Tenzies</h1>
      <h3 className="main-text">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div className="main-score">
        <div>Dice Roll: {score}</div>
        <div>Min Dice Roll: {minScore}</div>
      </div>
      <div className="main-boxes">{diceComponent}</div>
      <button className="main-roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
