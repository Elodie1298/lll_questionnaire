import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  id: number;
  nbQuestTot = 10;

  template: string;

  audioComparaison = {
    main: 'assets/audio/test.mp3',
    speaker1: ['assets/audio/test.mp3', 'assets/audio/test2.wav'],
    speaker2: ['assets/audio/test2.wav', 'assets/audio/test1.mp3']
  };
  audioVerification = {
    main: 'assets/audio/test.mp3',
    speaker: ['assets/audio/test.mp3', 'assets/audio/test2.wav']
  };

  private begin = new Date();

  // caracteristique:string = undefined;
  caracteristique:string = "Langue";

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.id == 0) {
      this.caracteristique = undefined;
    }
  }

  get time() {
    return (new Date()).getSeconds()-this.begin.getSeconds();
  }
  next(event) {
    console.log('time:',this.time);
    window.location.assign('#/test/'+(this.id+1));
  }

  get isComparison() {
    return this.template.charAt(2)=="C";
  }
  get nbTemplate() {
    return Number.parseInt(this.template.charAt(5));
  }

}
