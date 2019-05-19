import {Component, HostListener, OnInit} from '@angular/core';
import {DatabaseConnectService} from '../../service/database-connect.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  age: number;

  works = [
    "Étudiant",
    "Commercial / Achats / Ventes",
    "Secrétariat / Administratif",
    "Communication / Marketing",
    "Finances / Gestion",
    "Informatique",
    "Retraité",
    "Autre"
  ];
  work: string;

  genders = [
    "Homme",
    "Femme",
    "Autre"
  ];
  gender: string;

  constructor(private dbConnec: DatabaseConnectService) { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.next();
    }
  }

  next(): void {
    console.log("age: ", this.age);
    let gender = this.gender;
    console.log("gender: ", gender);
    let w = this.work;
    console.log("work: ", w);
    if (this.age != null && w != null && gender!=null) {
      this.dbConnec.addPerson({
        age: this.age,
        gender: gender,
        activity: w
      })
        .then(_ => {this.dbConnec.postEntry()});
    }
  }

}
