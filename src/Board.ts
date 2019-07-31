import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";
import Deck from "./Deck";
import Chip from "./Chip";
import Position from "./Position";
import GAME_CONFIG from "./GAME_CONFIG";

export default class Board {
  cards: (Card | null | Chip)[][];
  constructor() {
    this.cards = [
      [
        null,
        new Card(Rank.TWO, Suit.SPADE),
        new Card(Rank.THREE, Suit.SPADE),
        new Card(Rank.FOUR, Suit.SPADE),
        new Card(Rank.FIVE, Suit.SPADE),
        new Card(Rank.SIX, Suit.SPADE),
        new Card(Rank.SEVEN, Suit.SPADE),
        new Card(Rank.EIGHT, Suit.SPADE),
        new Card(Rank.NINE, Suit.SPADE),
        null
      ],
      [
        new Card(Rank.SIX, Suit.CLUB),
        new Card(Rank.FIVE, Suit.CLUB),
        new Card(Rank.FOUR, Suit.CLUB),
        new Card(Rank.THREE, Suit.CLUB),
        new Card(Rank.TWO, Suit.CLUB),
        new Card(Rank.ACE, Suit.HEART),
        new Card(Rank.KING, Suit.HEART),
        new Card(Rank.QUEEN, Suit.HEART),
        new Card(Rank.TEN, Suit.HEART),
        new Card(Rank.TEN, Suit.SPADE)
      ],
      [
        new Card(Rank.SEVEN, Suit.CLUB),
        new Card(Rank.ACE, Suit.SPADE),
        new Card(Rank.TWO, Suit.DIAMOND),
        new Card(Rank.THREE, Suit.DIAMOND),
        new Card(Rank.FOUR, Suit.DIAMOND),
        new Card(Rank.FIVE, Suit.DIAMOND),
        new Card(Rank.SIX, Suit.DIAMOND),
        new Card(Rank.SEVEN, Suit.DIAMOND),
        new Card(Rank.NINE, Suit.HEART),
        new Card(Rank.QUEEN, Suit.SPADE)
      ],
      [
        new Card(Rank.EIGHT, Suit.CLUB),
        new Card(Rank.KING, Suit.SPADE),
        new Card(Rank.SIX, Suit.CLUB),
        new Card(Rank.FIVE, Suit.CLUB),
        new Card(Rank.FOUR, Suit.CLUB),
        new Card(Rank.THREE, Suit.CLUB),
        new Card(Rank.TWO, Suit.CLUB),
        new Card(Rank.EIGHT, Suit.DIAMOND),
        new Card(Rank.EIGHT, Suit.HEART),
        new Card(Rank.KING, Suit.SPADE)
      ],
      [
        new Card(Rank.NINE, Suit.CLUB),
        new Card(Rank.QUEEN, Suit.SPADE),
        new Card(Rank.SEVEN, Suit.CLUB),
        new Card(Rank.SIX, Suit.HEART),
        new Card(Rank.FIVE, Suit.HEART),
        new Card(Rank.FOUR, Suit.HEART),
        new Card(Rank.ACE, Suit.HEART),
        new Card(Rank.NINE, Suit.DIAMOND),
        new Card(Rank.SEVEN, Suit.HEART),
        new Card(Rank.ACE, Suit.SPADE)
      ],
      [
        new Card(Rank.TEN, Suit.CLUB),
        new Card(Rank.TEN, Suit.SPADE),
        new Card(Rank.EIGHT, Suit.CLUB),
        new Card(Rank.SEVEN, Suit.HEART),
        new Card(Rank.TWO, Suit.HEART),
        new Card(Rank.THREE, Suit.HEART),
        new Card(Rank.KING, Suit.HEART),
        new Card(Rank.TEN, Suit.DIAMOND),
        new Card(Rank.SIX, Suit.HEART),
        new Card(Rank.TWO, Suit.DIAMOND)
      ],
      [
        new Card(Rank.QUEEN, Suit.CLUB),
        new Card(Rank.NINE, Suit.SPADE),
        new Card(Rank.NINE, Suit.CLUB),
        new Card(Rank.EIGHT, Suit.HEART),
        new Card(Rank.NINE, Suit.HEART),
        new Card(Rank.TEN, Suit.HEART),
        new Card(Rank.QUEEN, Suit.HEART),
        new Card(Rank.QUEEN, Suit.DIAMOND),
        new Card(Rank.FIVE, Suit.HEART),
        new Card(Rank.THREE, Suit.DIAMOND)
      ],
      [
        new Card(Rank.KING, Suit.CLUB),
        new Card(Rank.EIGHT, Suit.SPADE),
        new Card(Rank.TEN, Suit.CLUB),
        new Card(Rank.QUEEN, Suit.CLUB),
        new Card(Rank.KING, Suit.CLUB),
        new Card(Rank.ACE, Suit.CLUB),
        new Card(Rank.ACE, Suit.DIAMOND),
        new Card(Rank.KING, Suit.DIAMOND),
        new Card(Rank.FOUR, Suit.HEART),
        new Card(Rank.FOUR, Suit.DIAMOND)
      ],
      [
        new Card(Rank.ACE, Suit.CLUB),
        new Card(Rank.SEVEN, Suit.SPADE),
        new Card(Rank.SIX, Suit.SPADE),
        new Card(Rank.FIVE, Suit.SPADE),
        new Card(Rank.FOUR, Suit.SPADE),
        new Card(Rank.THREE, Suit.SPADE),
        new Card(Rank.TWO, Suit.SPADE),
        new Card(Rank.TWO, Suit.HEART),
        new Card(Rank.THREE, Suit.HEART),
        new Card(Rank.FIVE, Suit.DIAMOND)
      ],
      [
        null,
        new Card(Rank.ACE, Suit.SPADE),
        new Card(Rank.KING, Suit.SPADE),
        new Card(Rank.QUEEN, Suit.SPADE),
        new Card(Rank.TEN, Suit.SPADE),
        new Card(Rank.NINE, Suit.SPADE),
        new Card(Rank.EIGHT, Suit.SPADE),
        new Card(Rank.SEVEN, Suit.HEART),
        new Card(Rank.SIX, Suit.HEART),
        null
      ]
    ];
  }

  public placeChip(chip: Chip, card: Card, position: Position) {
    this.validateChipCanBePlaced(card, position);

    this.cards[position.row][position.col] = chip;
  }

  private validateChipCanBePlaced(playerCard: Card, position: Position) {
    const { row, col } = position;
    const elementAtPos = this.cards[row][col];
    if (elementAtPos instanceof Chip) {
      throw new Error(
        `Chip already placed at position: ${position.toString()}`
      );
    }

    // check if its a corner
    if (elementAtPos === null) {
      return;
    }

    if (elementAtPos instanceof Card && playerCard.matches(elementAtPos)) {
      return;
    }

    throw new Error(
      `Card at: ${row}, ${col} in deck is: ${
        elementAtPos == null ? "corner" : elementAtPos.toString()
      }, and player's card is ${playerCard.toString()}`
    );
  }

  public verifyBoard() {
    const deck = new Deck();

    for (let row = 0; row < this.cards.length; row = row + 1) {
      const rowCards = this.cards[row];
      for (let col = 0; col < rowCards.length; col = col + 1) {
        const boardCard = rowCards[col];
        if (boardCard == null) {
          continue;
        }
        for (let i = 0; i < deck.cards.length; i++) {
          const deckCard = deck.cards[i];
          if (
            boardCard instanceof Card &&
            deckCard.suit === boardCard.suit &&
            deckCard.rank === boardCard.rank
          ) {
            deck.cards.splice(i, 1);
            break;
          }
        }
      }
    }

    console.log(deck);
  }

  public displayBoard(canvas: HTMLCanvasElement) {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx === null) {
      throw Error("Unable to get CanvasRenderingContext2D");
    }

    for (let row = 0; row < this.cards.length; row = row + 1) {
      const rowCards = this.cards[row];
      for (let col = 0; col < rowCards.length; col = col + 1) {
        const boardElement = rowCards[col];
        const position = new Position(row, col);
        if (boardElement == null) {
          this.drawCorner(ctx, position);
        } else if (boardElement instanceof Chip) {
          this.drawChip(ctx, boardElement, position);
        } else if (boardElement instanceof Card) {
          this.drawCard(ctx, boardElement, position);
        } else {
          throw Error(`Invalid board element: ${boardElement}`);
        }
      }
    }
  }

  private drawCorner(ctx: CanvasRenderingContext2D, position: Position) {
    this.drawBorderedRect(ctx, position, "blue");
  }

  private drawChip(
    ctx: CanvasRenderingContext2D,
    chip: Chip,
    position: Position
  ) {
    this.drawBorderedRect(ctx, position, chip.color);
  }

  private drawCard(
    ctx: CanvasRenderingContext2D,
    card: Card,
    position: Position
  ) {
    ctx.fillStyle = "#ccc";
    ctx.font = "12px Arial";
    ctx.fillText(
      `${card.rank} ${card.suit}`,
      position.col * GAME_CONFIG.CARD_SIZE,
      position.row * GAME_CONFIG.CARD_SIZE
    );
  }

  private drawBorderedRect(
    ctx: CanvasRenderingContext2D,
    position: Position,
    color: string
  ) {
    const y = position.row * GAME_CONFIG.CARD_SIZE;
    const x = position.col * GAME_CONFIG.CARD_SIZE;
    const width = GAME_CONFIG.CARD_SIZE;
    const thickness = 1;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, width);

    ctx.fillStyle = "#000";
    ctx.fillRect(
      x - thickness,
      y - thickness,
      width + thickness * 2,
      width + thickness * 2
    );
  }
}

/* Board.prototype.isDeadCard = function(card) {
  // verify card is present
  // verify card is open
};

Board.prototype.removeChip = function(row, col) {
  // verify position has card
};

Board.prototype.placeCard = function(row, col, card) {
  // verify card can be placed
  // verify card is open
}; */
