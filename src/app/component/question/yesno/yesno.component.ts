import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.css']
})
export class YesnoComponent implements OnInit {
  @Input() num;
  @Input() nbQuestTot;

  @Output() validation = new EventEmitter();

  selected: string;

  explanation = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.validate();
    }
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

  validate() {
    this.validation.emit({
      selected: this.selected,
      explanation: this.explanation.value
    });
  }
}
