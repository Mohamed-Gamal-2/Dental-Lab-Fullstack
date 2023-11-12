import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { DentistServiceService } from 'src/app/dentist/service/dentist-service.service';
import { JobsService } from 'src/app/jobs/service/jobs.service';
import { StaffServiceService } from 'src/app/staff/service/staff-service.service';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css'],
})
export class DashboardContentComponent {
  clients: any;
  sortedClients: any;
  sortedClientNames: any[] = [];
  sortedClientCases: any[] = [];
  deadline: any;
  done: any;
  jobs: any;
  totalEarning = 0;
  finished: any;
  inProgress: any;
  staff: any;
  now = new Date();
  labels = [
    this.now.getMonth() - 4,
    this.now.getMonth() - 3,
    this.now.getMonth() - 2,
    this.now.getMonth() - 1,
    this.now.getMonth(),
    this.now.getMonth() + 1,
  ];

  constructor(
    private _Clients: DentistServiceService,
    private _jobs: JobsService,
    private _staff: StaffServiceService
  ) {}
  ngOnInit() {
    this._Clients.getAllDentists().subscribe((data: any) => {
      this.clients = data.data;
      this.sortedClients = [...data.data].sort((a: any, b: any) => {
        const caseOne = a.cases.length || 0;
        const caseTwo = b.cases.length || 0;
        return caseTwo - caseOne;
      });

      if (this.sortedClients.length >= 3) {
        this.sortedClients = this.sortedClients.slice(0, 3);
      }

      this.sortedClients.forEach((client: any) => {
        console.log(client);
        this.sortedClientNames.push(client.email);
        this.sortedClientCases.push(client.cases.length);
      });

      var ctxChartBar2 = document.getElementById(
        'myChartBar2'
      ) as HTMLCanvasElement;
      var myChart2 = new Chart(ctxChartBar2, {
        type: 'bar',
        data: {
          labels: [...this.sortedClientNames],
          datasets: [
            {
              label: 'Top Clinets',
              data: [...this.sortedClientCases],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    this._jobs.getAllJobs().subscribe((data: any) => {
      this.jobs = data.getallJobs;
      this.deadline = data.getallJobs.filter(
        (job: any) =>
          job.deadLine.split('-')[1] == this.now.getMonth() + 1 &&
          job.deadLine.toString().split('-')[2].slice(0, 2) >
            this.now.toString().split(' ')[2]
      );

      this.done = data.getallJobs.filter(
        (job: any) =>
          job.updatedAt.split('-')[1] == this.now.getMonth() + 1 &&
          job.status == 'finish'
      );
      this.totalEarning = this.done.reduce((acc: any, ele: any) => {
        return ele.price + acc;
      }, 0);

      var ctxChartBar = document.getElementById(
        'myChartBar'
      ) as HTMLCanvasElement;
      var myChart = new Chart(ctxChartBar, {
        type: 'bar',
        data: {
          labels: [...this.labels],
          datasets: [
            {
              label: 'Monthly Jobs',
              data: [
                this.jobs.filter(
                  (job: any) =>
                    job.createdAt.split('-')[1] == this.now.getMonth() - 4
                ).length,
                this.jobs.filter(
                  (job: any) =>
                    job.createdAt.split('-')[1] == this.now.getMonth() - 3
                ).length,
                this.jobs.filter(
                  (job: any) =>
                    job.createdAt.split('-')[1] == this.now.getMonth() - 2
                ).length,
                this.jobs.filter(
                  (job: any) =>
                    job.createdAt.split('-')[1] == this.now.getMonth() - 1
                ).length,
                this.jobs.filter(
                  (job: any) =>
                    job.createdAt.split('-')[1] == this.now.getMonth()
                ).length,
                this.jobs.filter(
                  (job: any) =>
                    job.createdAt.split('-')[1] == this.now.getMonth() + 1
                ).length,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,

          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      var pieChart = document.getElementById('myPieChart') as HTMLCanvasElement;
      var myPieChart = new Chart(pieChart, {
        type: 'pie',
        data: {
          labels: ['PFM', 'Zircon'],
          datasets: [
            {
              label: 'Number',
              data: [
                this.jobs.filter((job: any) => job.typeOfWork == 'PFM').length,
                this.jobs.filter((job: any) => job.typeOfWork == 'Zircon')
                  .length,
              ],
              backgroundColor: ['rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'PFM VS Zircon',
            },
          },
        },
      });

      this.finished = data.getallJobs.filter(
        (job: any) => job.status == 'finish'
      );
      this.inProgress = data.getallJobs.filter(
        (job: any) => job.status != 'finish'
      );
      this._staff
        .getAllStaff()
        .subscribe((data: any) => (this.staff = data.data));
    });
  }
}
