import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('victoryTemplate')
  private victoryTemplate: TemplateRef<any> | undefined;
  private readonly ROW_SIZE = 4;
  public modalRef: BsModalRef | undefined;
  public cellList: (number | null)[] = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, null
  ];


  constructor(
    private modalService: BsModalService,
  ) { }

  public shuffle() {
    let cnt = Math.round(Math.random() * this.ROW_SIZE**this.ROW_SIZE) + this.ROW_SIZE**2;
    while (--cnt > 0) {
      this.moveCell(Math.round(Math.random() * (this.ROW_SIZE**2 -1)));
    }
  }

  public moveCell(cellId: number) {
    const newCellId = this.canMoveCell(cellId);
    if (newCellId >= 0) {
      // copying value to new position
      this.cellList[newCellId] = this.cellList[cellId];
      // cleaning previous position
      this.cellList[cellId] = null;

      // Check if the game is complete
      if (this.isMidvymove()) {
        this.openModal();
      }
    }
  }

  public canMoveCell(cellId: number): number {
    // cellId = 5
    // cellId up = 1
    if (cellId - this.ROW_SIZE >= 0 && this.cellList[cellId - this.ROW_SIZE] === null) {
      return cellId - this.ROW_SIZE;
    }
    // cellId down = 9
    if (cellId + this.ROW_SIZE < this.ROW_SIZE**2 && this.cellList[cellId + this.ROW_SIZE] === null) {
      return cellId + this.ROW_SIZE;
    }
    // cellId left = 4
    if (Math.ceil((cellId + 1)/4) === Math.ceil(cellId/4) && this.cellList[cellId - 1] === null) {
      return cellId - 1;
    }
    // cellId right = 6
    if (Math.ceil((cellId + 1)/4) === Math.ceil((cellId + 2)/4) && this.cellList[cellId + 1] === null) {
      return cellId + 1;
    }
    return -1;
  }

  /**
   * @description Check if the game is complete / the last move was the winning one
   */
  private isMidvymove(): boolean {
    return this.cellList.every(( cellValue, cellIdx, cellList ) => 
      cellValue === (cellList.length === cellIdx + 1 ? null : cellIdx + 1)
    );
  }

  ngOnInit(): void {
    this.shuffle();
  }

  private config = {
    animated: true
  };
 
  private openModal() {
    if (this.victoryTemplate) {
      this.modalRef = this.modalService.show(this.victoryTemplate, this.config);
    }
  }

}
