import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private _questionTemplates = new Map();
  get questionTemplates(): Map<any, any> {
    return this._questionTemplates;
  }

  private _testTemplates = new Map();
  get testTemplates(): Map<any, any> {
    return this._testTemplates;
  }

  private _types: Array<string> = ['CC','CL','VC','VL','IC'];
  get types(): Array<string> {
    return this._types;
  }

  constructor() {
    this._questionTemplates.set('CL', 4);
    this._questionTemplates.set('CC', 2);
    this._questionTemplates.set('VL', 2);
    this._questionTemplates.set('VC', 3);
    this._questionTemplates.set('IC', 1);

    this._testTemplates.set('CL', 4);
    this._testTemplates.set('CC', 3);
    this._testTemplates.set('VL', 3);
    this._testTemplates.set('VC', 3);
    this._testTemplates.set('IC', 3);
  }

  // type is CC,CL,VC,VL or IC
  getTestTemplate(type: string): string {
    if (this.types.indexOf(type)>-1) {
      return 'T_'+type+'_'+this.testTemplates.get(type);
    }
  }

  // type is CC,CL,VC,VL or IC
  getQuestionTemplate(type: string): string {
    if (this.types.indexOf(type)>-1) {
      return 'T_'+type+'_'+this.questionTemplates.get(type);
    }
  }



}
