import {Component, HostListener, OnInit} from '@angular/core';
import {DatabaseConnectService} from '../../service/database-connect.service';
import {Router} from '@angular/router';
import {UtilService} from '../../service/util.service';

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

  incorrect: boolean = false;

  constructor(private dbConnec: DatabaseConnectService,
              private router: Router) { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.next();
    }
  }

  next(): void {
    let gender = this.gender;
    let w = this.work;
    if (this.age != null && w != null && gender!=null) {
      this.dbConnec.postPerson({
        age: this.age,
        gender: gender,
        activity: w
      })
        .then(res => {
          UtilService.userId = res.userId;
          this.router.navigateByUrl("test/1")
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
    else {
      this.incorrect = true;
    }
  }

}
