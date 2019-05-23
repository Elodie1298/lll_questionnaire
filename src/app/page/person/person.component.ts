import {Component, HostListener, OnInit} from '@angular/core';
import {DatabaseConnectService} from '../../service/database-connect.service';
import {Router, RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';

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
    //TODO: uncomment following lines

    // console.log("age: ", this.age);
    // let gender = this.gender;
    // console.log("gender: ", gender);
    // let w = this.work;
    // console.log("work: ", w);
    // if (this.age != null && w != null && gender!=null) {
    //   this.dbConnec.postPerson({
    //     age: this.age,
    //     gender: gender,
    //     activity: w
    //   });
    // }
    // else {
    //   this.incorrect = true;
    // }

    this.router.navigateByUrl("test/0")
      .catch(e => console.log(e));
  }

}
