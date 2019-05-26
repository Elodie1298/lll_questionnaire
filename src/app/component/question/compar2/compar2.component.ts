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

  selectedStyle = {
    'background-color': '#64dd17',
    'border-color': '#64dd17',
    'transition': '200ms'
  };

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

  getStyle(n) {
    if (this.selected==n) {
      return this.selectedStyle;
    }
  }

  validate() {
    this.validation.emit({
      selected: this.selected
    });
  }
}
