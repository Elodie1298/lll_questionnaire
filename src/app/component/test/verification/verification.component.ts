import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  @Input() num: number;
  @Input() nbQuestTot: number;

  @Input() verificationClass: string;
  @Input() question;
  @Input() isCaracteristique: boolean;

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  @Output() validation = new EventEmitter();

  speaker1Nb: number = 0; //Numéro du fichier audio affiché pour le locuteur
  currentAudio: string = ""; //fichier audio actuellement chargé dans le lecteur

  _speaker1: boolean = false; // Le locuteur est selectionné

  spk1_on: boolean = false; // Le locuteur est actuellement chargé dans le lecteur


  constructor() { }

  ngOnInit() { }

  // Chargement du fichier demandé, si nécessaire,  puis mise en play ou pause du lecteur.
  play(who) {
    let path;
    if (who == "demo") {
      path = this.question.audio.audioPath;
      this.spk1_on = false;
    }
    else if (who == "speaker1") {
      path = this.question.speaker1.audiosPath[this.speaker1Nb];
      this.spk1_on = !this.spk1_on;
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

  // Changement d'audio sur un speaker
  next(who) {
    if (who == "speaker1") {
      this.speaker1Nb = (this.speaker1Nb+1)%this.question.speaker1.audiosPath.length;
    }
    if (!this.audioPlayer.nativeElement.paused) {
      this.play(who);
    }
  }
  previous(who) {
    if (who == "speaker1") {
      this.speaker1Nb = (this.speaker1Nb-1)%this.question.speaker1.audiosPath.length;
    }
    if (!this.audioPlayer.nativeElement.paused) {
      this.play(who);
    }
  }

  // Changement du style du locuteur sélectionné -> visibilité de la sélection
  get speaker1Style() {
    if (this._speaker1) {
      return {'background-color': "#64dd17"};
    }
  }

  validate(ans) {
    this.validation.emit(ans);
  }

}
