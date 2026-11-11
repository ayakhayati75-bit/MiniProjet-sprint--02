import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Adherent } from '../model/adherent.model';
import { AdherentService } from '../services/adherent.service';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

// Recherche par nom en utilisant un pipe
@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
  adherents!: Adherent[];
  searchTerm = '';
  private adherentService = inject(AdherentService);

  ngOnInit(): void {
    this.adherents = this.adherentService.listeAdherents();
  }
}
