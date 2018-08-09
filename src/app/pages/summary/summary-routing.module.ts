import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitGuardService } from '../../services/init-guard/init-guard.service';
import { SummaryComponent } from './summary.component';

const routes: Routes = [
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [InitGuardService]
    // children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule {}
