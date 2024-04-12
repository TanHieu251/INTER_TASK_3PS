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
import { CapacityComponent } from "./pages/capacity-page/components/capacity/capacity.component";

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
    ],
    providers: [],
    bootstrap: [AppComponent],
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
        SVGIconModule,
        NotificationModule,
        DatePickerModule,
        LabelModule,
        CapacityComponent
    ]
})
export class AppModule {}
