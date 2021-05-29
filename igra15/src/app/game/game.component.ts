import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public cellList: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  constructor() { }

  ngOnInit(): void {
  }

}
