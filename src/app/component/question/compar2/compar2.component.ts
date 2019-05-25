import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-compar2',
  templateUrl: './compar2.component.html',
  styleUrls: ['./compar2.component.css']
})
export class Compar2Component implements OnInit {
  @Input() num;
  @Input() nbQuestTot;
  @Input() isCaracteristique: boolean;

  @Output() validation = new EventEmitter();

  selected: number;

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

  validate() {
    this.validation.emit({
      selected: this.selected
    });
  }
}
