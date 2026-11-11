import { Component, OnInit, inject } from '@angular/core';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { AdherentService } from '../services/adherent.service';
import { UpdateTypeComponent } from '../update-type/update-type.component';

@Component({
  selector: 'app-liste-types',
  imports: [UpdateTypeComponent],
  templateUrl: './liste-types.component.html',
})
export class ListeTypesComponent implements OnInit {
  types!: TypeAbonnement[];
  updatedType: TypeAbonnement = { idType: 0, nomType: '' };
  ajout: boolean = true;

  private adherentService = inject(AdherentService);

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.types = this.adherentService.listeTypes();
  }

  // événement reçu de l'enfant UpdateType
  typeUpdated(type: TypeAbonnement) {
    console.log('Type updated event', type);
    if (this.ajout) {
      this.adherentService.ajouterType(type);
    } else {
      this.adherentService.updateType(type);
    }
    // on remet le formulaire en mode "ajout"
    this.updatedType = { idType: 0, nomType: '' };
    this.ajout = true;
    this.chargerTypes();
  }

  updateType(type: TypeAbonnement) {
    // copie : la table ne change qu'après clic sur "Modifier"
    this.updatedType = { ...type };
    this.ajout = false;
  }

  supprimerType(type: TypeAbonnement) {
    const conf = confirm('Êtes-vous sûr de vouloir supprimer ce type ?');
    if (conf) {
      this.adherentService.supprimerType(type);
      this.chargerTypes();
    }
  }
}
