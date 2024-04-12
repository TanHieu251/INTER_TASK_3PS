import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhchComponent } from './pages/nhch/nhch.component';
import { CapacityPageComponent } from './pages/capacity-page/capacity-page.component';

const routes: Routes = [
  {
    path: 'nhch',
    component: NhchComponent,
  },
  {
    path: 'capacity',
    component: CapacityPageComponent,
  },
  {
    path: '',
    redirectTo: 'capacity',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
