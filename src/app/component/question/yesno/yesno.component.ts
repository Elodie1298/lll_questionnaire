import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.css']
})
export class YesnoComponent implements OnInit {
  @Input() num;
  @Input() nbQuestTot;

  selected: string;

  explanation: string;

  constructor() { }

  ngOnInit() {
  }

  select(ans) {
    switch (ans) {
      case 'yes':
        if (this.yes) {
          this.selected = undefined;
        }
        else {
          this.selected = ans;
        }
        break;
      case 'no':
        if (this.no) {
          this.selected = undefined;
        }
        else {
          this.selected = ans;
        }
    }
  }

  get yes() {
    return this.selected == 'yes';
  }
  get no() {
    return this.selected == 'no';
  }
}
