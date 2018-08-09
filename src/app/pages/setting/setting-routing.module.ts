import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitGuardService } from '../../services/init-guard/init-guard.service';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [InitGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
