import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../../service/util.service';
import {DatabaseConnectService} from '../../service/database-connect.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  id: number;
  nbQuestTot = 10;

  template;

  question;

  private begin: Date;

  constructor(private route: ActivatedRoute,
              private dbConnect: DatabaseConnectService) {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.question = UtilService.questions[this.id-1];
    this.template = UtilService.getTestTemplate(this.question);
    this.begin = new Date();
    console.log(this.template);
  }

  get time() {
    let now = new Date();
    let time = (now.getHours() - this.begin.getHours())*3600;
    time += (now.getMinutes() - this.begin.getMinutes())*60;
    time += now.getSeconds() - this.begin.getSeconds();
    return time;
  }
  next(ans) {
    console.log('ans:', ans);
    console.log('time:',this.time);
    UtilService.currentAnswer = new Map<string, any>();
    UtilService.currentAnswer.set('answer_text', ans);
    UtilService.currentAnswer.set('answer_template', this.template);
    UtilService.currentAnswer.set('answer_time', this.time);
    window.location.assign('#/question/'+(this.id));
  }

  get isComparison() {
    return this.template.charAt(2)=="C";
  }
  get isVerification() {
    return this.template.charAt(2)=="V";
  }
  get isIdentification() {
    return this.template.charAt(2)=="I";
  }
  get isCaracteristique() {
    return (this.template.charAt(3)=='C');
  }
  get nbTemplate() {
    return Number.parseInt(this.template.charAt(5));
  }
}
