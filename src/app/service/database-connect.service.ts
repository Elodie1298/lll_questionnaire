import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectService {
  postPersonURL: string = "https://lll.elodiemorin.web-edu.fr/php/addPerson.php";
  getQuestionListURL: string = "https://lll.elodiemorin.web-edu.fr/php/getQuestionList.php";
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

  public getQuestionList() {
    this.http.get(this.getQuestionListURL, {headers: this.headers})
      .subscribe(res => {
        // @ts-ignore
        console.log(res.res);
        // @ts-ignore
        UtilService.questions = res.res;
      });
  }


  //TODO: treat request

  public postQuestion() {}
  // public postQuestion() {
  //   this.http.post(postQuestionURL, {headers: this.headers})
  //     .subscribe();
  // }
}
