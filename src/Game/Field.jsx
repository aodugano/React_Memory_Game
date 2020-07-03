import React, { Component } from "react";
import CardItem from "./CardItem";
import "./Field.scss";
import sourceImages from "./Images";

export default class Field extends Component {

  state = {
    cards: sourceImages.sort(() => Math.random() - 0.5),
    lockedCardField: false,
    deletedCards: [],
    voidCheck: sourceImages
  }

  openCards = [];
  

  resetOpenCards = () => {
    this.openCards = [];
  };

  compareCards = () => {
    const [firstCard, secondCard] = this.openCards;

    if (firstCard.dataset.key !== secondCard.dataset.key) {
      setTimeout(() => {
        firstCard.classList.remove("active");
        secondCard.classList.remove("active");
        this.resetOpenCards();
        this.setState({
          lockedCardField: false
        })
      }, 800);
    } else {
      setTimeout(() => {
        this.setState({
          lockedCardField: false,
          deletedCards: [...this.state.deletedCards, firstCard.dataset.key],
          voidCheck: this.state.voidCheck.filter(card => card !== firstCard.dataset.key)
        })
        
        this.resetOpenCards();
      }, 800);
    }
  };

  flipCard = event => {
    if (this.state.lockedCardField) return;
    if (event.target.parentNode.className.includes("active")) return;
    event.target.parentNode.classList.add("active");
    this.openCards.push(event.target.parentNode);

    if (this.openCards.length === 2) {
      this.setState({
        lockedCardField: true
      })
      this.compareCards();
    }
  };

  restartGame = () => {
    this.setState({
      cards: sourceImages.sort(() => Math.random() - 0.5),
      deletedCards: [],
      voidCheck: sourceImages
    })
  }
  

  render() {
    return (
      this.state.voidCheck.length !== 0 ?
        <div className="Game">
          {this.state.cards
            .map((el, index) => {
              return <CardItem value={el} key={index} flipCard={this.flipCard} deletedCards={this.state.deletedCards} />;
            })}
      </div> 
        :
        <div className="Game">
          <p className="Game-title">Thanks for playing!</p>
          <p className="Game-title"> You can play this game again</p>
          <button className="Game-restart" onClick={()=>this.restartGame()}>Restart</button>
        </div>
    );
  }
};