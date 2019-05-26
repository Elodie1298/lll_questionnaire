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



  constructor(private route: ActivatedRoute,
              private dbConnect: DatabaseConnectService) {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (UtilService.questions == undefined) {
      window.location.assign("");
    }
    this.question = UtilService.questions[this.id-1];
    this.template = UtilService.getQuestionTemplate(this.question);
  }

  // Redirection des templates suivant le type et le numéro
  get nbTemplate() {
    return Number.parseInt(this.template.charAt(5));
  }
  get typeTemplate() {
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
      (this.nbTemplate==3) &&
      (this.typeTemplate=='CL')
    );
  }
  get compar2() {
    return (
      ((this.nbTemplate==3) &&
        (this.typeTemplate=='CC')) ||
      ((this.nbTemplate==2) &&
        ((this.typeTemplate=='VC') || (this.typeTemplate=='CC')))
    );
  }
  get yesno() {
    return (
      (this.nbTemplate==1)
    );
  }

  next(ans) {
    new Promise(resolve => {
      UtilService.currentAnswer.set('answer_interface_template', this.template);
      UtilService.currentAnswer.set('answer_interface', ans);
      UtilService.currentAnswer.set('user_id', UtilService.userId);
      UtilService.currentAnswer.set('question_id', +this.question.questionId);
      UtilService.currentAnswer.set('answer_extra_log', "null");
      resolve(true);
    })
      .then(_ => this.dbConnect.postAnswer())
      .catch(e => console.log(e));
    console.log("Answer : ",UtilService.currentAnswer);
    if (this.id<10) {
      window.location.assign('#/test/'+(this.id+1));
    }
    else {
      window.location.assign('#/end');
    }
  }
}
