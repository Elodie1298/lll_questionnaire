import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  @Input() num: number;
  @Input() nbQuestTot: number;

  @Input() comparisonClass: string;

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  @Input() audio;

  @Input() caracteristique: string;

  @Output() validation = new EventEmitter();

  speaker1Nb: number = 0;
  speaker2Nb: number = 0;
  currentAudio: string = "";

  _speaker1: boolean = false;
  _speaker2: boolean = false;

  spk1_on: boolean = false;
  spk2_on: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(this.audioPlayer);
  }

  select(n) {
    if (n==1) {
      this._speaker1 = !this._speaker1;
      this._speaker2 = false;
    }
    if (n==2) {
      this._speaker2 = !this._speaker2;
      this._speaker1 = false;
    }
  }

  play(who) {
    let path;
    if (who == "main") {
      path = this.audio.main;
      this.spk1_on = false;
      this.spk2_on = false;
    } else if (who == "speaker1") {
      path = this.audio.speaker1[this.speaker1Nb];
      this.spk1_on = !this.spk1_on;
    } else if (who == "speaker2") {
      path = this.audio.speaker2[this.speaker2Nb];
      this.spk2_on = !this.spk2_on;
    }
    let paused = this.audioPlayer.nativeElement.paused;
    let current = this.currentAudio;
    this.audioPlayer.nativeElement.pause();
    if (this.currentAudio != path) {
      this.currentAudio = path;
    }
    if (paused || current!=this.currentAudio) {
      setTimeout(() => this.audioPlayer.nativeElement.play(), 500);
    }
  }

  next(who) {
    if (who == "speaker1") {
      this.speaker1Nb = (this.speaker1Nb+1)%this.audio.speaker1.length;
    } else if (who == "speaker2") {
      this.speaker2Nb = (this.speaker2Nb+1)%this.audio.speaker2.length;
    }
    if (!this.audioPlayer.nativeElement.paused) {
      this.play(who);
    }
  }

  previous(who) {
    if (who == "speaker1") {
      this.speaker1Nb = (this.speaker1Nb-1)%this.audio.speaker1.length;
    } else if (who == "speaker2") {
      this.speaker2Nb = (this.speaker2Nb-1)%this.audio.speaker2.length;
    }
    if (!this.audioPlayer.nativeElement.paused) {
      this.play(who);
    }
  }

  get speaker1Style() {
    if (this._speaker1) {
      return {'background-color': "#64dd17"};
    }
  }

  get speaker2Style() {
    if (this._speaker2) {
      return {'background-color': "#64dd17"};
    }
  }

  get duration() {
    return (this.audioPlayer==undefined)?0: this.audioPlayer.nativeElement.duration;
  }
  get currentTime() {
    return (this.audioPlayer==undefined)?0: this.audioPlayer.nativeElement.currentTime;
  }
  get paused() {
    return (this.audioPlayer==undefined)?0: this.audioPlayer.nativeElement.paused;
  }

  get isCaracteristique() {
    return this.caracteristique != undefined;
  }

  validate(event) {
    this.validation.emit(event);
  }
}
