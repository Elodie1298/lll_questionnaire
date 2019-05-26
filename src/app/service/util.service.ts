import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  static questionTemplates = new Map();

  static testTemplates = new Map();

  static types: Array<string> = ['CC','CL','VC','VL','IC'];

  static questions;

  static userId: string = "5ce7b6295d70a";

  private _questionsDone: Map<string, Array<number>> = new Map<string, Array<number>>();
  static currentAnswer : Map<string, any>;


  constructor() {}

  static init() {
    UtilService.questionTemplates.set('CL', 3);
    UtilService.questionTemplates.set('CC', 3);
    UtilService.questionTemplates.set('VL', 2);
    UtilService.questionTemplates.set('VC', 2);
    UtilService.questionTemplates.set('IC', 1);

    UtilService.testTemplates.set('CL', 3);
    // UtilService.testTemplates.set('CL', 4);
    UtilService.testTemplates.set('CC', 3);
    // UtilService.testTemplates.set('CC', 4);
    UtilService.testTemplates.set('VL', 3);
    UtilService.testTemplates.set('VC', 4);
    UtilService.testTemplates.set('IC', 3);
  }

  // type is CC,CL,VC,VL or IC
  static getTestTemplate(question): string {
    let type = this.getType(question);
    if (this.types.indexOf(type)>-1) {
      return 'T_'+type+'_'+
        (Math.floor(Math.random()*this.testTemplates.get(type))+1);
    }
  }

  // type is CC,CL,VC,VL or IC
  static getQuestionTemplate(question): string {
    let type = this.getType(question);
    if (this.types.indexOf(type)>-1) {
      return 'Q_'+type+'_'+
        (Math.floor(Math.random()*this.questionTemplates.get(type))+1);
    }
  }

  addQuestion(type: string, nb: number) {
    if (this._questionsDone.get(type) == null) {
      //TODO: implement random question WHICH DIDN'T GET OUT YET
    }
  }

  private static getType(question) {
    let type: string;
    if (question.speaker1 != null) {
      if (question.speaker2 != null) {
        type = 'CL';
      } else {
        type = 'VL';
      }
    }
    else if (question.carac1 != null) {
      if (question.carac2 != null) {
        type = 'CC';
      } else {
        type = 'VC';
      }
    }
    else {
      type = 'IC';
    }
    return type;
  }
}
