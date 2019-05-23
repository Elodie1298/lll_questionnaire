import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  id: number;
  nbQuestTot = 10;

  template: string = "Q_IC_1";
  static templates = new Map();




  constructor(private route: ActivatedRoute) {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

  //TODO : redirect templates
  get nbTemplate() {
    return Number.parseInt(this.template.charAt(5));
  }

  get typeTemplate() {
    console.log(this.template.substring(2,4));
    return this.template.substring(2,4);
  }

  get compar3() {
    return (
      (this.nbTemplate==2) &&
      (this.typeTemplate=='CL' || this.typeTemplate=='VL')
    );
  }
  get utility() {
    return (
      (this.nbTemplate==4) &&
      (this.typeTemplate=='CL')
    );
  }
  get compar2() {
    return (
      ((this.nbTemplate==3) &&
        (this.typeTemplate=='CL' || this.typeTemplate=='CC')) ||
      ((this.nbTemplate==2) &&
        (this.typeTemplate=='VC') || this.typeTemplate=='CC')
    );
  }
  get yesno() {
    return (
      (this.nbTemplate==1)
    );
  }
}
