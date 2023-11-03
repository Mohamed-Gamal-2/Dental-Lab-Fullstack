import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { JobsChartComponent } from './jobs-chart/jobs-chart.component';
import { AppRoutingModule } from '../app-routing.module';
import { JobCardComponent } from '../jobs/job-card/job-card.component';

import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardContentComponent,
    JobsChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
  ],
  imports: [CommonModule, NgChartsModule],
  exports: [
    DashboardContentComponent,
    JobsChartComponent,

    PieChartComponent,
    DoughnutChartComponent,
  ],
})
export class DashboardModule {}
