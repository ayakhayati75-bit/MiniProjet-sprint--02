import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Adherent } from '../model/adherent.model';
import { TypeAbonnement } from '../model/type-abonnement.model';

@Injectable({ providedIn: 'root' })
export class AdherentService {
  types: TypeAbonnement[];
  adherents: Adherent[];

  constructor() {
    this.types = [
      { idType: 1, nomType: 'Mensuel' },
      { idType: 2, nomType: 'Trimestriel' },
      { idType: 3, nomType: 'Annuel' },
    ];
    this.adherents = [
      { idAdherent: 1, nom: 'Ben Ali', prenom: 'Sami', typeAbonnement: this.types[0],
        prixAbonnement: 60, dateInscription: new Date('2026-09-05') },
      { idAdherent: 2, nom: 'Trabelsi', prenom: 'Amel', typeAbonnement: this.types[1],
        prixAbonnement: 150, dateInscription: new Date('2026-08-20') },
      { idAdherent: 3, nom: 'Gharbi', prenom: 'Youssef', typeAbonnement: this.types[2],
        prixAbonnement: 500, dateInscription: new Date('2026-06-12') },
    ];
  }

  listeAdherents(): Adherent[] {
    return this.adherents;
  }

  listeTypes(): TypeAbonnement[] {
    return this.types;
  }

  // Recherche par type d'abonnement (équivalent de rechercherParCategorie du prof)
  rechercherParType(idType: number): Observable<Adherent[]> {
    return of(this.adherents.filter((a) => a.typeAbonnement.idType == idType));
  }

  // Recherche par nom (équivalent de rechercherParNom du prof)
  rechercherParNom(nom: string): Observable<Adherent[]> {
    return of(this.adherents.filter((a) => a.nom.toLowerCase().includes(nom.toLowerCase())));
  }

  consulterType(id: number): TypeAbonnement {
    return this.types.find((t) => t.idType == id)!;
  }

  // ---------- CRUD sur les types d'abonnement (tableau JSON, sans API) ----------
  ajouterType(type: TypeAbonnement) {
    // id généré automatiquement
    type.idType = Math.max(0, ...this.types.map((t) => t.idType)) + 1;
    this.types.push(type);
  }

  supprimerType(type: TypeAbonnement) {
    const index = this.types.findIndex((t) => t.idType === type.idType);
    if (index > -1) {
      this.types.splice(index, 1);
    }
  }

  updateType(type: TypeAbonnement) {
    const index = this.types.findIndex((t) => t.idType === type.idType);
    if (index > -1) {
      this.types[index] = type;
      // garder la cohérence : les adhérents qui pointent vers l'ancien objet
      this.adherents.forEach((a) => {
        if (a.typeAbonnement.idType === type.idType) {
          a.typeAbonnement = type;
        }
      });
    }
  }

  ajouterAdherent(adherent: Adherent) {
    // si aucun id n'est saisi, on en génère un automatiquement
    if (!adherent.idAdherent) {
      adherent.idAdherent = Math.max(0, ...this.adherents.map((v) => v.idAdherent)) + 1;
    }
    this.adherents.push(adherent);
  }

  supprimerAdherent(adherent: Adherent) {
    const index = this.adherents.indexOf(adherent, 0);
    if (index > -1) {
      this.adherents.splice(index, 1);
    }
  }

  consulterAdherent(id: number): Adherent {
    return this.adherents.find((v) => v.idAdherent === id)!;
  }

  updateAdherent(v: Adherent) {
    const index = this.adherents.findIndex((x) => x.idAdherent === v.idAdherent);
    if (index > -1) {
      this.adherents[index] = v;
    }
  }
}
