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
  @Input() question;
  @Input() isCaracteristique: boolean;

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  @Output() validation = new EventEmitter();

  speaker1Nb: number = 0; //Numéro du fichier audio affiché pour le locuteur 1
  speaker2Nb: number = 0; //Numéro du fichier audio affiché pour le locuteur 1
  currentAudio: string = ""; //fichier audio actuellement chargé dans le lecteur

  _speaker1: boolean = false; // Le locuteur 1 est selectionné
  _speaker2: boolean = false; // Le locuteur 2 est selectionné

  spk1_on: boolean = false; // Le locuteur 1 est actuellement chargé dans le lecteur
  spk2_on: boolean = false; // Le locuteur 2 est actuellement chargé dans le lecteur

  constructor() { }

  ngOnInit() { }

  // Sélection d'un bouton -> choix de l'utilisateur
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

  // Chargement du fichier demandé, si nécessaire,  puis mise en play ou pause du lecteur.
  play(who) {
    let path;
    if (who == "demo") {
      path = this.question.audio.audioPath;
      this.spk1_on = false;
      this.spk2_on = false;
    }
    else if (who == "speaker1") {
      if (this.isCaracteristique) {
        path = this.question.carac1.audiosPath[this.speaker1Nb];
      } else {
        path = this.question.speaker1.audiosPath[this.speaker1Nb];
      }
      this.spk1_on = !this.spk1_on;
    }
    else if (who == "speaker2") {
      if (this.isCaracteristique) {
        path = this.question.carac2.audiosPath[this.speaker1Nb];
      } else {
        path = this.question.speaker2.audiosPath[this.speaker1Nb];
      }
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

  // Changement d'audio sur un speaker
  next(who) {
    if (who == "speaker1") {
      if (this.isCaracteristique) {
        this.speaker1Nb = (this.speaker1Nb+1)%this.question.carac1.audiosPath.length;
      } else {
        this.speaker1Nb = (this.speaker1Nb+1)%this.question.speaker1.audiosPath.length;
      }
    } else if (who == "speaker2") {
      if (this.isCaracteristique) {
        this.speaker2Nb = (this.speaker2Nb+1)%this.question.carac2.audiosPath.length;
      } else {
        this.speaker2Nb = (this.speaker2Nb+1)%this.question.speaker2.audiosPath.length;
      }
    }
    this.play(who);
  }
  previous(who) {
    if (who == "speaker1") {
      if (this.isCaracteristique) {
        this.speaker1Nb = (this.speaker1Nb-1)%this.question.carac1.audiosPath.length;
      } else {
        this.speaker1Nb = (this.speaker1Nb-1)%this.question.speaker1.audiosPath.length;
      }
    } else if (who == "speaker2") {
      if (this.isCaracteristique) {
        this.speaker2Nb = (this.speaker2Nb-1)%this.question.carac2.audiosPath.length;
      } else {
        this.speaker2Nb = (this.speaker2Nb-1)%this.question.speaker2.audiosPath.length;
      }
    }
    this.play(who);
  }

  // Changement du style du locuteur sélectionné -> visibilité de la sélection
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

  validate() {
    if (this._speaker1) {
      if (this.isCaracteristique) {
        this.validation.emit('carac 1');
      } else {
        this.validation.emit('speaker 1');
      }
    } else if (this._speaker2) {
      if (this.isCaracteristique) {
        this.validation.emit('carac 2');
      } else {
        this.validation.emit('speaker 2');
      }
    }
    else {
      this.validation.emit('pass');
    }
  }
}
