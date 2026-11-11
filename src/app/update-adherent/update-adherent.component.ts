import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adherent } from '../model/adherent.model';
import { TypeAbonnement } from '../model/type-abonnement.model';
import { AdherentService } from '../services/adherent.service';

@Component({
  selector: 'app-update-adherent',
  imports: [FormsModule, DatePipe],
  templateUrl: './update-adherent.component.html',
})
export class UpdateAdherentComponent implements OnInit {
  currentAdherent = new Adherent();
  types: TypeAbonnement[];
  updatedIdType = 1;
  private activatedRoute = inject(ActivatedRoute);
  private adherentService = inject(AdherentService);
  private router = inject(Router);

  constructor() {
    this.types = this.adherentService.listeTypes();
  }

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.currentAdherent = this.adherentService.consulterAdherent(id);
    this.updatedIdType = this.currentAdherent.typeAbonnement.idType;
  }

  updateAdherent() {
    this.currentAdherent.typeAbonnement = this.adherentService.consulterType(this.updatedIdType);
    this.adherentService.updateAdherent(this.currentAdherent);
    this.router.navigate(['adherents']);
  }
}
