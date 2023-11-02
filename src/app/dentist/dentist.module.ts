import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentistComponent } from './dentist/dentist.component';
import { DentistListComponent } from './dentist-list/dentist-list.component';
import { DentistCardComponent } from './dentist-card/dentist-card.component';
import { DentistFormComponent } from './dentist-form/dentist-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DentistComponent,
    DentistListComponent,
    DentistCardComponent,
    DentistFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class DentistModule {}
