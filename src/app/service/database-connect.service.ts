import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectService {
  postPersonURL: string = "https://lll.elodiemorin.web-edu.fr/php/addPerson.php";
  //TODO: specifiate getQuestionURL;
  getQuestionURL: string;
  //TODO: specifiate postQuestionURL;
  postQuestionURL: string;
  private headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-origin', '*');

  constructor(private http: HttpClient, private util: UtilService) { }

  private prepareUrl(url: string, params): string {
    let queryUrl = url;
    for (let i=0 ; i<params.keys().length ; i++) {
      let key = params.keys()[i];
      if (i==0) queryUrl += '?';
      else queryUrl += "&";
      queryUrl += key + '=' + params.get(key);
    }
    return queryUrl;
  }

  public postPerson(person) {
    let params = new HttpParams()
      .set('age', person.age)
      .set('activity', person.activity)
      .set('gender', person.gender);
    let url = this.prepareUrl(this.postPersonURL, params);
    console.log(url);
    this.http.post(url,{headers: this.headers})
      .subscribe(_ => console.log("done"));
  }

  //TODO : uncomment following code and test json requests

  public getQuestion() {}
  // public getQuestion() {
  //   let ans = new Map();
  //   this.http.get(getQuestionURL, {headers: this.headers})
  //     .subscribe( (res:Response) => {
  //       res.json()
  //         .then(json => {
  //           //TODO : check that i get the right informations
  //           ans.set('question', json.question);
  //           ans.set('main', json.demo);
  //           ans.set('speaker1', json.speaker1);
  //           ans.set('speaker2', json.speaker2);
  //           ans.set('carac1', json.carac1);
  //           ans.set('carac2', json.carac2);
  //
  //           let type: string;
  //           if (json.speaker1 != null) {
  //             if (json.speaker2 != null) {
  //               type = 'CL';
  //             }
  //             else {
  //               type = 'VL';
  //             }
  //           } else if (json.carac1 != null) {
  //             if (json.carac2 != null) {
  //               type = 'CC';
  //             } else {
  //               type = 'VC';
  //             }
  //           } else {
  //             type = 'IC';
  //           }
  //
  //           ans.set('testTemplate', this.util.getTestTemplate(type));
  //           ans.set('testTemplate', this.util.getQuestionTemplate(type));
  //           return ans;
  //         })
  //         .catch(e => console.log(e));
  //     });
  // }
  //

  //TODO: treat request

  public postQuestion() {}
  // public postQuestion() {
  //   this.http.post(postQuestionURL, {headers: this.headers})
  //     .subscribe();
  // }
}
