import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { PagerModule } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NhchComponent } from './pages/nhch/nhch.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderCheckboxComponent } from './components/header-checkbox/header-checkbox.component';
import { FilterComponent } from './components/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { QuenstionbankComponent } from './pages/nhch/components/quenstionbank/quenstionbank.component';
import { CapacityPageComponent } from './pages/capacity-page/capacity-page.component';
import { HeaderApacityComponent } from './pages/capacity-page/components/header-apacity/header-apacity.component';
import { CapacityComponent } from './pages/capacity-page/components/capacity/capacity.component';
import { QuestionbankComponent } from './pages/questionbank/questionbank.component';
import { MenuComponent } from './pages/questionbank/components/menu/menu.component';
import { SideBarComponent } from './pages/questionbank/components/side-bar/side-bar.component';
import { FiltersComponent } from './pages/questionbank/components/filters/filters.component';
import { SearchTextComponent } from './pages/questionbank/components/search-text/search-text.component';
import { QuestionbankListComponent } from './pages/questionbank/components/questionbank-list/questionbank-list.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    NhchComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderCheckboxComponent,
    FilterComponent,
    QuenstionbankComponent,
    CapacityPageComponent,
    HeaderApacityComponent,
    QuestionbankComponent,
    MenuComponent,
    SideBarComponent,
    FiltersComponent,
    SearchTextComponent,
    QuestionbankListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent, MatTableDataSource],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    FormsModule,
    PopupModule,
    BrowserAnimationsModule,
    DialogsModule,
    PagerModule,
    NotificationModule,
    DatePickerModule,
    LabelModule,
    CapacityComponent,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginator,
    MatTableModule,
  ],
})
export class AppModule {}
