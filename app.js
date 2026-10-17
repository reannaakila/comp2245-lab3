const fruits = [
  { name: "apple", symbol: "🍎" },
  { name: "banana", symbol: "🍌" },
  { name: "cherry", symbol: "🍒" },
  { name: "coconut", symbol: "🥥" },
  { name: "grapes", symbol: "🍇" },
  { name: "mango", symbol: "🥭" },
  { name: "pineapple", symbol: "🍍" },
  { name: "watermelon", symbol: "🍉" },
];

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let deck;
let moves = 0;
let waiting = false;
let flipBackTimer = null;

const flippedCards = [];
const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const statusDisplay = document.getElementById("status");

// Builds the board
function createBoard() {
  deck = shuffle([...fruits, ...fruits]);

  deck.forEach((fruit, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("card");
    card.setAttribute("aria-label", `Card ${i + 1}, face down`);
    card.dataset.index = i;
    board.appendChild(card);
  });
}

createBoard();

// Click listener 
board.addEventListener("click", (event) => {
  if (waiting) return;

  const card = event.target;

  if (!card.classList.contains("card")) return;
  if (card.classList.contains("flipped")) return;

  // Flips card
  const index = card.dataset.index;
  const fruit = deck[index];

  card.textContent = fruit.symbol;
  card.classList.add("flipped");
  card.setAttribute("aria-label", `Card ${Number(index) + 1}, ${fruit.name}`);

  flippedCards.push(card);

  // If two cards are flipped
  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    const cardA = flippedCards[0];
    const cardB = flippedCards[1];

    const fruitA = deck[cardA.dataset.index];
    const fruitB = deck[cardB.dataset.index];

    if (fruitA.name === fruitB.name) {
      // Matched
      cardA.classList.add("matched");
      cardB.classList.add("matched");

      cardA.disabled = true;
      cardB.disabled = true;

      statusDisplay.textContent = "That's a pair!";
      flippedCards.length = 0;

      // Check if won
      const allMatched =
        document.querySelectorAll(".matched").length === deck.length;

      if (allMatched) {
        statusDisplay.textContent = `You found all the pairs in ${moves} moves!`;
        statusDisplay.classList.add("you-won");
      }
    } else {
      // If not matched
      statusDisplay.textContent = "Not a pair. Try again.";
      waiting = true;

      flipBackTimer = setTimeout(() => {
        cardA.textContent = "";
        cardB.textContent = "";

        cardA.classList.remove("flipped");
        cardB.classList.remove("flipped");

        cardA.setAttribute(
          "aria-label",
          `Card ${Number(cardA.dataset.index) + 1}, face down`
        );
        cardB.setAttribute(
          "aria-label",
          `Card ${Number(cardB.dataset.index) + 1}, face down`
        );

        flippedCards.length = 0;
        waiting = false;
        flipBackTimer = null;
      }, 1000);
    }
  }
});

// New game button
document.getElementById("new-game").addEventListener("click", () => {

  // Cancels any pending timeout
  if (flipBackTimer !== null) {
    clearTimeout(flipBackTimer);
    flipBackTimer = null;
  }

  waiting = false;

  // Resets moves
  moves = 0;
  movesDisplay.textContent = moves;

  // Resets status
  statusDisplay.textContent = "Turn over two cards to find a matching pair.";
  statusDisplay.classList.remove("you-won");

  // Clears flipped cards
  flippedCards.length = 0;

  // Removes old cards
  board.replaceChildren();

  // Builds new board
  createBoard();
});
