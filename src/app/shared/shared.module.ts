import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
