import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseConnectService} from '../../service/database-connect.service';
import {UtilService} from '../../service/util.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  id: number;
  nbQuestTot = 10;

  template;

  question;



  constructor(private route: ActivatedRoute) {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.question = UtilService.questions[this.id];
    this.template = UtilService.getQuestionTemplate(this.question);
  }

  // Redirection des templates suivant le type et le numéro
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

  next(ans) {
    console.log(ans);
    UtilService.currentAnswer.set('answer_interface_template', this.template);
    UtilService.currentAnswer.set('answer_interface', ans);
    window.location.assign('#/test/'+(this.id+1));
  }
}
