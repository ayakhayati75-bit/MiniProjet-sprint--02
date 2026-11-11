import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Adherent } from '../model/adherent.model';
import { AdherentService } from '../services/adherent.service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-adherents',
  imports: [DatePipe, RouterLink],
  templateUrl: './adherents.component.html',
})
export class AdherentsComponent {
  adherents: Adherent[];
  private adherentService = inject(AdherentService);
  authService = inject(Auth);

  constructor() {
    this.adherents = this.adherentService.listeAdherents();
  }

  supprimerAdherent(v: Adherent) {
    const conf = confirm('Êtes-vous sûr de vouloir supprimer cet adhérent ?');
    if (conf) {
      this.adherentService.supprimerAdherent(v);
    }
  }
}
