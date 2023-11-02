import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DentistComponent } from './dentist/dentist/dentist.component';

const routes: Routes = [{ path: 'dentist', component: DentistComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
