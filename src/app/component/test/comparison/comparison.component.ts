import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  @Input() num;
  @Input() tot;

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  audio = [
    'assets/audio/test.mp3',
    'assets/audio/test2.wav',
    'assets/audio/test.mp3'
  ];

  currentAudio: number = 0;

  validation_color: string = "#64dd17";

  _loc1: boolean = false;
  _loc2: boolean = false;

  constructor() { }

  ngOnInit() {  }

  click(n) {
    if (n==1) {
      this._loc1 = !this._loc1;
      this._loc2 = false;
    }
    if (n==2) {
      this._loc2 = !this._loc2;
      this._loc1 = false;
    }
  }

  play(n) {
    let paused = this.audioPlayer.nativeElement.paused;
    let current = this.currentAudio;
    this.audioPlayer.nativeElement.pause();
    if (this.currentAudio != n) {
      this.currentAudio = n;
    }
    console.log(current, this.currentAudio, paused);
    if (paused || current!=this.currentAudio) {
      setTimeout(() => this.audioPlayer.nativeElement.play(), 500);
    }
  }

  get loc1() {
    if (this._loc1) {
      return {'background-color': this.validation_color};
    }
  }

  get loc2() {
    if (this._loc2) {
      return {'background-color': this.validation_color};
    }
  }

  get audioSrc() {
    return this.audio[this.currentAudio];
  }
}
