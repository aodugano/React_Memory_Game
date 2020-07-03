import React from "react";

export default props => {
  const { value, flipCard, deletedCards } = props;

  return deletedCards.indexOf(value) === -1 ? (
    <div data-key={value} className="Game-card" onClick={e => flipCard(e)}>
      <img className="front" src={`./images/${value}`} alt={value} />
      <img className="back" src="./images/backface.png" alt="backface" />
    </div>
  ) : (
    <div className="Game-card__deleted" />
  );
};

