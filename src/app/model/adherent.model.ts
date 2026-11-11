import { TypeAbonnement } from './type-abonnement.model';

export class Adherent {
  idAdherent!: number;
  nom!: string;
  prenom!: string;
  typeAbonnement!: TypeAbonnement;
  prixAbonnement!: number;
  dateInscription!: Date;
}
