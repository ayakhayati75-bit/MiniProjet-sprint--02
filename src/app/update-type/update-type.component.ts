import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeAbonnement } from '../model/type-abonnement.model';

@Component({
  selector: 'app-update-type',
  imports: [FormsModule],
  templateUrl: './update-type.component.html',
})
export class UpdateTypeComponent implements OnInit {
  
  @Input()
  type!: TypeAbonnement;

  
  @Input()
  ajout!: boolean;

  
  @Output()
  typeUpdated = new EventEmitter<TypeAbonnement>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateType ', this.type);
  }

  saveType() {
    this.typeUpdated.emit(this.type);
  }
}
