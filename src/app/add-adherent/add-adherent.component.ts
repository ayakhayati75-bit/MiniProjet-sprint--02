import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Adherent } from '../model/adherent.model';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { AdherentService } from '../services/adherent.service';

@Component({
  selector: 'app-add-adherent',
  imports: [FormsModule],
  templateUrl: './add-adherent.component.html',
})
export class AddAdherentComponent {
  newAdherent = new Adherent();
  types: TypeAbonnement[];
  newIdType = 1;
  private adherentService = inject(AdherentService);
  private router = inject(Router);

  constructor() {
    this.types = this.adherentService.listeTypes();
  }

  addAdherent() {
    this.newAdherent.typeAbonnement = this.adherentService.consulterType(this.newIdType);
    this.adherentService.ajouterAdherent(this.newAdherent);
    this.router.navigate(['adherents']);
  }
}
