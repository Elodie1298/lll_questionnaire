import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {
  @Input() num;
  @Input() nbQuestTot;

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

  validate() {
    console.log(this.utility);
    console.log(this.explanation.value);
  }

}
