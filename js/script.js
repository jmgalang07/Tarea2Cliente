import { generateDeck, shuffleDeck } from "../js/cards.js";

let deck = [];
let drawButton;
let resetButton;
let messageDisplay;

function startGame() {
  deck = shuffleDeck(generateDeck());
  //console.log("Deck generated and shuffled:", deck);

  // Body
  const body = document.querySelector("body");
  body.innerHTML = "";

  // Container for the game
  const gameContainer = document.createElement("div");
  gameContainer.setAttribute("id", "game-container");
  body.appendChild(gameContainer);

  // Draw card button
  drawButton = document.createElement("button");
  drawButton.textContent = "Draw";
  drawButton.addEventListener("click", drawCard);
  gameContainer.appendChild(drawButton);

  // Reset button
  resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.style.display = "none";
  resetButton.addEventListener("click", resetGame);
  gameContainer.appendChild(resetButton);

  // Message
  messageDisplay = document.createElement("p");
  gameContainer.appendChild(messageDisplay);
}

function drawCard() {
  const body = document.querySelector("body");

  const displayedCard = document.querySelector(".card");
  if (displayedCard) {
    body.removeChild(displayedCard);
  }

  if (deck.length > 0) {
    const card = deck.pop(); // Remove the card from the array

    // Container for the card
    const divElementCard = document.createElement("div");
    divElementCard.classList.add("card");

    switch (card.type) {
      case "Bomb":
        divElementCard.classList.add("card-bomb");
        break;
      case "Defuse":
        divElementCard.classList.add("card-defuse");
        break;
      case "Skip turn":
        divElementCard.classList.add("card-skip");
        break;
      case "Nope":
        divElementCard.classList.add("card-nope");
        break;
      case "Points":
        divElementCard.classList.add("card-points");
        break;
    }

    const cardValue =
      card.type === "Points" ? `<p class="card-text">${card.value}</p>` : "";

    divElementCard.innerHTML = `
<div class="container">
  <div class="card-info">
    <img src="${card.icon}" class="card-icon" alt="${card.type} icon">
    <div>
      <div class="text-card"> 
        <p class="card-text">${card.type}</p>
        <div class="points">${cardValue}</div>  
      </div>
      <p class="card-desc">${card.description}</p>
    </div>
  </div>
  <div class="card-body">
    <img src="${card.icon}" class="card-icon-big" alt="${card.type} icon">
  </div>
  <div class="card-info-reverse">
    <img src="${card.icon}" class="card-icon" alt="${card.type} icon">
    <div>
      <div class="text-card"> 
        <p class="card-text">${card.type}</p>
        <div class="points">${cardValue}</div>  
      </div>
      <p class="card-desc">${card.description}</p>
    </div>
  </div>
</div>
`;

    body.appendChild(divElementCard);

    if (deck.length === 0) {
      body.removeChild(divElementCard);
      drawButton.style.display = "none";
      resetButton.style.display = "block";
      messageDisplay.textContent = "Game over! Press 'Reset' to play again.";
    }
  }
  //console.log(deck)
}

function resetGame() {
  drawButton.style.display = "block";
  resetButton.style.display = "none";
  startGame();
}

startGame();