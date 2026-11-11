import { Routes } from '@angular/router';
import { AdherentsComponent } from './adherents/adherents.component';
import { AddAdherentComponent } from './add-adherent/add-adherent.component';
import { RechercheParTypeComponent } from './recherche-par-type/recherche-par-type.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateAdherentComponent } from './update-adherent/update-adherent.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeTypesComponent } from './liste-types/liste-types.component';
import { adherentGuard } from './guard-adherent/adherent.guard';

export const routes: Routes = [
  { path: 'adherents', component: AdherentsComponent },
  { path: 'add-adherent', component: AddAdherentComponent, canActivate: [adherentGuard] },
  { path: 'rechercheParType', component: RechercheParTypeComponent },
  { path: 'rechercheParNom', component: RechercheParNomComponent },
  { path: 'update-adherent/:id', component: UpdateAdherentComponent },
  { path: 'listeTypes', component: ListeTypesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'adherents', pathMatch: 'full' },
];
