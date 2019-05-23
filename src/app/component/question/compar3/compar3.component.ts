import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-compar3',
  templateUrl: './compar3.component.html',
  styleUrls: ['./compar3.component.css']
})
export class Compar3Component implements OnInit {
  @Input() num;
  @Input() nbQuestTot;

  @Input() isRecord;

  selected: number;

  constructor() { }

  ngOnInit() {
  }

  select(n) {
    this.selected = (this.selected==n)?undefined:n;
  }

  validate() {
    console.log(this.selected);
  }

}
