import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-compar2',
  templateUrl: './compar2.component.html',
  styleUrls: ['./compar2.component.css']
})
export class Compar2Component implements OnInit {
  @Input() num;
  @Input() nbQuestTot;
  @Input() isCaracteristique: boolean;
  @Input() isSpeaker: boolean;

  selected: number;

  slider_on = false;

  constructor() { }

  ngOnInit() {
  }

  select(n) {
    if (this.selected == n) {
      this.selected = undefined;
    } else {
      this.selected = n;
    }
  }

  get speaker1Style() {
    if (this.selected == 0) {
      return {'background-color': "#64dd17"};
    }
  }
  get speaker2Style() {
    if (this.selected == 1) {
      return {'background-color': "#64dd17"};
    }
  }

  validate() {
    console.log(this.selected);
  }
}
