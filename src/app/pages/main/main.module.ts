import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { MainRoutingModule } from './main-routing.module';

import { TodoListsService } from './../../services/todo-lists/todo-lists.service';
import { TodoService } from './../../services/todo/todo.service';

import { MainComponent } from './main.component';
import { LeftControlComponent } from './left-control/left-control.component';
import { TodoListsComponent } from './left-control/todo-lists/todo-lists.component';

@NgModule({
  imports: [SharedModule, MainRoutingModule],
  declarations: [MainComponent, LeftControlComponent, TodoListsComponent],
  providers: [TodoListsService, TodoService]
  /**
   * ImoNote:
   * 这两个服务虽然添加到了 MainModule 子模块，但本身设置的是 `providedIn: 'root'`，
   * 而且服务不是模块私有的东西，所以其它子模块理论上也可以访问到这两个服务【TODO:？】
   */
})
export class MainModule {}
