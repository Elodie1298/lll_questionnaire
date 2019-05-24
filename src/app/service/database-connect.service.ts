import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectService {
  postPersonURL: string = "https://lll.elodiemorin.web-edu.fr/php/addPerson.php";
  getQuestionListURL: string = "https://lll.elodiemorin.web-edu.fr/php/getQuestionList.php";
  postAnswerURL: string = "https://lll.elodiemorin.web-edu.fr/php/sendQuestion.php";
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

  public postPerson(person): Promise<any> {
    let params = new HttpParams()
      .set('age', person.age)
      .set('activity', person.activity)
      .set('gender', person.gender);
    let url = this.prepareUrl(this.postPersonURL, params);
    console.log(url);
    return this.http.post(url,{headers: this.headers})
      .toPromise();
  }

  //TODO : uncomment following code and test json requests

  public getQuestionList() {
    return this.http.get(this.getQuestionListURL, {headers: this.headers})
      .toPromise()
  }


  //TODO: treat request

  public postAnswer() {
    const answerData = new FormData();
    UtilService.currentAnswer.forEach((value, key) => {
      if (value == null) {
        value = "";
      }
      if (typeof value == 'object') {
        value = JSON.stringify(value);
      }
      console.log(key, typeof value , value);
      answerData.append(key, value);
    });
    this.http.post(this.postAnswerURL, answerData)
      .toPromise()
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
}
