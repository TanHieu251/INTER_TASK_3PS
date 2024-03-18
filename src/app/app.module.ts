import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NhchComponent } from './pages/nhch/nhch.component';
import { NavbarComponent } from './pages/nhch/components/navbar/navbar.component';
import { SidebarComponent } from './pages/nhch/components/sidebar/sidebar.component';
import { HeaderCheckboxComponent } from './pages/nhch/components/header-checkbox/header-checkbox.component';
import { FilterComponent } from './pages/nhch/components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NhchComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderCheckboxComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
