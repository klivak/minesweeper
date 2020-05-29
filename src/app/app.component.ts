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
        value: shuffledArray[i]
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
      }
    }


  }
}
