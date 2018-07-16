import { Component, ViewChild, OnInit } from '@angular/core';
import { TodosComponent } from './todos/todos.component';
// import { TodoListsComponent } from './../left-control/todo-lists/todo-lists.component';

@Component({
  selector: 'app-right-control',
  templateUrl: './right-control.component.html',
  styleUrls: ['./right-control.component.scss']
})
export class RightControlComponent implements OnInit {
  // TODO: ViewChild 可以获取到别的组件的子组件么？e.g. TodoListsComponent
  @ViewChild(TodosComponent) private todosComponent: TodosComponent;

  constructor() {}

  ngOnInit() {}

  /**
   * ImoNote: quick-add.component 触发的 add 操作
   * 由父组件（本组件）调用子组件 todos.component 的 add 方法来实现
   */
  addToTodos(title: string) {
    this.todosComponent.add(title);
  }
}
