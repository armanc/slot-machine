const prompts = require("prompts");

type SlotPosition = {
  x: number;
  y: number;
};

type Line = {
  positions: SlotPosition[];
};

type GameSymbol = {
  value: string;
  price: number;
};

const lines: Line[] = [
  {
    positions: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
  },
  {
    positions: [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ],
  },
  {
    positions: [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ],
  },
  {
    positions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  },
  {
    positions: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
  },
  {
    positions: [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
  },
  {
    positions: [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
    ],
  },
];

const SYMBOLS: GameSymbol[] = [
  { value: "A", price: 5 },
  { value: "K", price: 4 },
  { value: "Q", price: 3 },
  { value: "J", price: 2 },
  { value: "D", price: 1 },
];

let playerCash: number = 100;
let board: GameSymbol[][] = [];
const BOARD_ROWS: number = 3;
const BOARD_COLUMNS: number = 4;
const COST_PER_SPIN: number = 3;

(async () => {


  while (true) {
    const response = await prompts({
      type: "toggle",
      name: "answer",
      message: "Spin? Costs 3 EUR",
      active: 'Yes',
      inactive: 'No',
      initial: "Yes"
    });

    if (response.answer === false) {
      break;
    }
      // cost per spin:
    playerCash -= COST_PER_SPIN;

    // generate random 3 x 4 board
    for (let row = 0; row < BOARD_ROWS; row++) {
      board[row] = [];
      for (let index = 0; index < BOARD_COLUMNS; index++) {
        board[row].push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      }
    }

    // prints board:
    // create a function to print board
    board.forEach((row) => {
      const elements: string[] = [];
      row.forEach((symbol) => {
        elements.push(symbol.value);
      });
      console.log(elements.join("-"));
    });

    // SHORTER VERSION:
    // board.forEach(row => {
    //     const elements = row.map(symbol => symbol.value);
    //     console.log(elements.join("-"));
    // });

    const elements: string[] = board.flatMap((row) =>
      row.map((symbol) => symbol.value)
    );

    lines.forEach((line) => {
      let lineValues: GameSymbol[] = [];

      line.positions.forEach((position) => {
        lineValues.push(board[position.x][position.y]);
      });

      if (lineValues.every((value, i, values) => value === values[0])) {
        // add some cash
        let prize = lineValues[0].price * (lineValues.length + 1);
        playerCash += prize;
        console.log("YOU GOT A LINE! YOU WON " + prize+" EUR");
      }
      // check if lineValues are the same in order to win
    });

    console.log("Your balance now: " + playerCash+" EUR");
    if (playerCash < 2) {
        console.log("YOU LOST! SHAME!");
        break;
    }
  }
})();