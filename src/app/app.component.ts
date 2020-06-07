import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public width = 10;
  public bombAmount = 20;
  public squares = [];
  public isGameOver = false;

  @ViewChild('someVar') el: ElementRef;

  constructor(private rd: Renderer2) {

  }


  ngOnInit() {
    const grid = this.el;
    console.log('grid', grid);
    this.createBoard();
  }

  createBoard() {
    const totalGridSize = this.width * this.width;

    // get shuffled game array with random bombs
    const bombsArray = Array(this.bombAmount).fill('bomb');
    const emptyArray = Array(totalGridSize - this.bombAmount).fill('valid');

    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalGridSize; i++) {
      const item = {
        index: i,
        value: shuffledArray[i],
        data: null,
        checked: false,
        flag: false
      };
      this.squares.push(item);
    }

    // add numbers
    for (let i = 0; i < this.squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % this.width === 0;
      const isRightEdge = (i % this.width === this.width - 1);

      if (this.squares[i].value === 'valid') {
        if (i > 0 && !isLeftEdge && this.squares[i - 1].value === 'bomb') {
          total++;
        }
        if (i > 9 && !isRightEdge && this.squares[i + 1 - this.width].value === 'bomb') {
          total++;
        }
        if (i > 10 && this.squares[i - this.width].value === 'bomb') {
          total++;
        }
        if (i > 11 && !isLeftEdge && this.squares[i - 1 - this.width].value === 'bomb') {
          total++;
        }
        if (i < 98 && !isRightEdge && this.squares[i + 1].value === 'bomb') {
          total++;
        }
        if (i < 90 && !isLeftEdge && this.squares[i - 1 + this.width].value === 'bomb') {
          total++;
        }
        if (i < 88 && !isRightEdge && this.squares[i + 1 + this.width].value === 'bomb') {
          total++;
        }
        if (i < 89 && this.squares[i + this.width].value === 'bomb') {
          total++;
        }
        this.squares[i].data = total;
      }
    }

  }

  onSquareClick(square) {
    const currentId = square.index;
    if (this.isGameOver) {
      return;
    }
    if (square.checked || square.flag) {
      return;
    }
    if (square.value === 'bomb') {
      console.log('Game over');
    } else {
      const total = square.data;
      if (total !== 0) {
        square.checked = true;
        square.value = total;
        return;
      }
      this.checkSquare(square, currentId);
    }
    square.checked = true;
  }

  checkSquare(square: object, currentId: number) {
    const isLeftEdge = (currentId % this.width === 0);
    const isRightEdge = (currentId % this.width === this.width - 1);

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        // tslint:disable-next-line:radix
        const newId = this.squares[currentId - 1].index;
        // const newSquare =
      }
    }, 10);
  }
}
