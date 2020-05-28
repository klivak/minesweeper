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

    for (let i = 0; i < totalGridSize; i++) {
      this.squares.push(i);
    }
  }
}
