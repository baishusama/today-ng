import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './pages/setup/setup.component';
import { InitGuardService } from './services/init-guard/init-guard.service';

const routes: Routes = [
  { path: 'setup', component: SetupComponent, canActivate: [InitGuardService] },
  /**
   * 个人感觉没有必要再如下一行代码那样定义 main 了，因为都定义在 main-routing 中了
   * { path: 'main', redirectTo: '/main', pathMatch: 'full' },
   */
  // TODO: 这里 redirectTo 加不加 / 有什么区别？ 暂时来看没啥区别
  { path: '', redirectTo: '/setup', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
