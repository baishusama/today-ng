import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './pages/setup/setup.component';

const routes: Routes = [
  { path: 'setup', component: SetupComponent },
  // { path: 'main', component: SetupComponent },
  // TODO: 这里 redirectTo 加不加 / 有什么区别？ 暂时来看没啥区别
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
