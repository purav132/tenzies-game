import React from "react";

export default function Dice(props) {
  const diceStyle = {
    backgroundColor: props.dice.isHeld && "#59E391",
  };

  return (
    <div
      style={diceStyle}
      onClick={props.heldDice.bind(this, props.dice.id)}
      className="box"
    >
      <h2>{props.dice.value}</h2>
    </div>
  );
}
