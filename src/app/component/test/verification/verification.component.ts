import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  @Input() num;
  @Input() nbQuestTot;

  @Input() verificationClass;
  @Input() audio;

  @Input() caracteristique: string;

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  currentAudio: string;

  spk_on: boolean = false;
  speakerNb: number = 0;

  _speaker: boolean = false;

  //TODO: All class - look at comparison

  constructor() { }

  ngOnInit() {
  }

  play(who) {
    let path;
    if (who == "demo") {
      path = this.audio.main;
      this.spk_on = false;
    } else if (who == "speaker1") {
      path = this.audio.speaker1[this.speakerNb];
      this.spk_on = !this.spk_on;
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
      this.speakerNb = (this.speakerNb+1)%this.audio.speaker1.length;
    }
    if (!this.audioPlayer.nativeElement.paused) {
      this.play(who);
    }
  }

  previous(who) {
    if (who == "speaker1") {
      this.speakerNb = (this.speakerNb-1)%this.audio.speaker1.length;
    }
    if (!this.audioPlayer.nativeElement.paused) {
      this.play(who);
    }
  }

  get isCaracteristique() {
    return this.caracteristique != undefined;
  }

  get speakerStyle() {
    if (this._speaker) {
      return {'background-color': "#64dd17"};
    }
  }

}
