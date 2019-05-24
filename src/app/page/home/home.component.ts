import { Component, OnInit } from '@angular/core';
import {DatabaseConnectService} from '../../service/database-connect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(dbConnect: DatabaseConnectService) {
    dbConnect.getQuestionList();
  }

  ngOnInit() {
  }

}
