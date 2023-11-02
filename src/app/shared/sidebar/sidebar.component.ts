import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { linksOverview } from './LinksDataRoutes';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  dataProfile: any; // Add the required dataProfile if available
  toggle: boolean = true;
  dataRoutes = linksOverview;
  constructor() {}
  ngOnInit(): void {}

  toggleSidebar(): void {
    this.toggle = !this.toggle;
  }

  closeSidebar(): void {
    this.toggle = false;
  }
}
