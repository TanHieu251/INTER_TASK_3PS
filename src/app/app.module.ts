import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NhchComponent } from './pages/nhch/nhch.component';
import { NavbarComponent } from './pages/nhch/components/navbar/navbar.component';
import { SidebarComponent } from './pages/nhch/components/sidebar/sidebar.component';
import { HeaderCheckboxComponent } from './pages/nhch/components/header-checkbox/header-checkbox.component';
import { FilterComponent } from './pages/nhch/components/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { QuenstionbankComponent } from './pages/nhch/components/quenstionbank/quenstionbank.component';

@NgModule({
  declarations: [
    AppComponent,
    NhchComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderCheckboxComponent,
    FilterComponent,
    QuenstionbankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
