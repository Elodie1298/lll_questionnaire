import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {
  @Input() num;
  @Input() nbQuestTot;

  @Output() validation = new EventEmitter();

  explanation = new FormControl();

  utilities = [
    "Oui, je l'utilise",
    "Oui, mais je ne l'ai pas utilisé",
    "Non, je ne l'utiliserai pas",
    "Non, ça m'embrouille plus qu'autre chose"
  ];
  utility: string;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.validate();
    }
  }


  validate() {
    this.validation.emit({
      selected: this.utility,
      explanation: this.explanation.value
    });
  }

}
