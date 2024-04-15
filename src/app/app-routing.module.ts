import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhchComponent } from './pages/nhch/nhch.component';
import { CapacityPageComponent } from './pages/capacity-page/capacity-page.component';
import { QuenstionbankComponent } from './pages/nhch/components/quenstionbank/quenstionbank.component';
import { QuestionbankComponent } from './pages/questionbank/questionbank.component';

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
    path: 'questionbank',
    component: QuestionbankComponent,
  },

  {
    path: '',
    redirectTo: 'questionbank',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
