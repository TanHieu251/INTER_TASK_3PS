import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhchComponent } from './pages/nhch/nhch.component';

const routes: Routes = [
  {
    path: 'nhch',
    component: NhchComponent,
  },
  {
    path: '',
    redirectTo: 'nhch',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
