import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
    "Retraité"
  ];
  workPrecise: boolean = false;
  workOther: string;
  workForm = new FormGroup({
    work: new FormControl('')
  });

  genders = [
    "Homme",
    "Femme",
    "Autre"
  ];
  genderForm = new FormGroup({
    gender: new FormControl('')
  });

  constructor(private dbConnec: DatabaseConnectService) { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.next();
    }
  }

  showOther(): void {
    setTimeout(() => {
      if (this.workForm.getRawValue().work == "Autre") {
        this.workPrecise = true;
      } else {
        this.workPrecise = false;
      }
    }, 5);

  }

  next(): void {
    console.log("age: ", this.age);
    let gender = this.genderForm.getRawValue().gender;
    console.log("gender: ", gender);
    let w = this.workForm.getRawValue().work;
    if (w == "Autre") {
      w = this.workOther;
    }
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
