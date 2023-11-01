import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';

@NgModule({
  declarations: [DashboardContentComponent],
  imports: [CommonModule],
  exports: [DashboardContentComponent],
})
export class DashboardModule {}
