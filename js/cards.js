import { CARD_TYPES, CARD_COUNTS } from "../js/constants.js";

class Card {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;

    switch (this.type) {
      case "Bomb":
        this.icon = "./img/bomb.png";
        this.description =
          "If you draw one and don't have a Defuse card, you lose.";
        break;
      case "Defuse":
        this.icon = "./img/defuse.png";
        this.description = "You can keep all the ones you draw in your hand.";
        break;
      case "Skip turn":
        this.icon = "./img/skip.png";
        this.description = "They allow you to avoid drawing a card.";
        break;
      case "Nope":
        this.icon = "./img/nope.png";
        this.description =
          "If an opponent wants to skip a turn, you can cancel it using this card, both are discarded.";
        break;
      case "Points":
        this.icon = "./img/points.png";
        this.description =
          "When generated, they can have a random value between 1 and 10. If the game ends and more than one player is alive, the one with the most points wins.";
        break;
    }
  }
}

function generateDeck() {
  const deck = [];

  for (let i = 0; i < CARD_COUNTS.BOMB; i++) {
    deck.push(new Card(CARD_TYPES.BOMB));
  }

  for (let i = 0; i < CARD_COUNTS.DEFUSE; i++) {
    deck.push(new Card(CARD_TYPES.DEFUSE));
  }

  for (let i = 0; i < CARD_COUNTS.SKIP; i++) {
    deck.push(new Card(CARD_TYPES.SKIP));
  }

  for (let i = 0; i < CARD_COUNTS.NOPE; i++) {
    deck.push(new Card(CARD_TYPES.NOPE));
  }

  for (let i = 0; i < CARD_COUNTS.POINTS; i++) {
    const randomValue = Math.floor(Math.random() * 10) + 1;
    deck.push(new Card(CARD_TYPES.POINTS, randomValue));
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
  }
  return deck;
}

export { Card, generateDeck, shuffleDeck };