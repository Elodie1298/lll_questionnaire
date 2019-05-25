import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {
  @Input() num: number;
  @Input() nbQuestTot: number;

  @Input() identificationClass: string;
  @Input() question;
  @Input() isCaracteristique: boolean;

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  @Output() validation = new EventEmitter();

  currentAudio: string;

  carac = new Map();
  // TODO : get real carac list
  caracs = [
    "Langue",
    "Genre",
    "Age"
  ];

  constructor() { }

  ngOnInit() { }

  // Chargement du fichier demandé, si nécessaire,  puis mise en play ou pause du lecteur.
  play(who) {
    let path;
    if (who == "demo") {
      path = this.question.audio.audioPath;
    }
    let paused = this.audioPlayer.nativeElement.paused;
    let current = this.currentAudio;
    this.audioPlayer.nativeElement.pause();
    if (this.currentAudio != path) {
      this.currentAudio = path;
    }
    setTimeout(() => this.audioPlayer.nativeElement.play(), 500);
  }

  validate() {
    this.validation.emit(this.carac);
  }

}
