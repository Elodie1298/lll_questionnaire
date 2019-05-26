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
  caracs = [
    "Le locuteur est un homme",
    "Le locuteur est une femme",
    "Le locuteur est un enfant",
    "Le locuteur est un adulte",
    "La langue native est le français",
    "La langue native est l'arabe"
  ];

  constructor() { }

  ngOnInit() {
  }

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
