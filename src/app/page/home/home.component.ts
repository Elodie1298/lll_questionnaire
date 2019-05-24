import { Component, OnInit } from '@angular/core';
import {DatabaseConnectService} from '../../service/database-connect.service';
import {UtilService} from '../../service/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(dbConnect: DatabaseConnectService) {
    dbConnect.getQuestionList()
      .then((ans: any) => {
        UtilService.questions = ans.res;
      })
      .catch(e => console.log(e));
  }

  ngOnInit() {
  }

}
