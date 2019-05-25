import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-compar3',
  templateUrl: './compar3.component.html',
  styleUrls: ['./compar3.component.css']
})
export class Compar3Component implements OnInit {
  @Input() num;
  @Input() nbQuestTot;

  @Input() isRecord;

  @Output() validation = new EventEmitter();

  selected: number;

  _selectedStyle = {'background-color': 'a5d6a7'};
  _deselectedStyle = {'background-color': 'cfd8dc'};

  constructor() { }

  ngOnInit() {
  }

  select(n) {
    this.selected = (this.selected==n)?undefined:n;
  }


  validate() {
    this.validation.emit({
      selected: this.selected
    });
  }

  getStyle(n) {
    if (this.selected!=undefined && this.selected!=n) {
      return this._deselectedStyle
    }
    else {
      return this._selectedStyle;
    }
  }
}
