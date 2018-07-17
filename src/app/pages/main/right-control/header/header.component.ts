import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { OrderOption } from './../../../../../domain/types';
import { TodoService } from './../../../../services/todo/todo.service';
import { TodoListsService } from './../../../../services/todo-lists/todo-lists.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private listTitle$: Subscription;

  listTitle = '';

  constructor(
    private todoListsService: TodoListsService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.listTitle$ = this.todoListsService.current$.subscribe(list => {
      // 如果当前选中是自定义的列表
      if (list) {
        this.listTitle = list.title;
        return;
      }

      // 如果当前选中是默认的列表
      const TITLE_MAP = {
        today: '今日事项',
        todo: '待办事项'
      };
      const currentUuid = this.todoListsService.getCurrentListUuid();
      if (TITLE_MAP[currentUuid]) {
        this.listTitle = TITLE_MAP[currentUuid];
        return;
      }

      // 如果当前选中不存在
      this.listTitle = '';
    });
  }

  switchOrderOption(order: OrderOption): void {
    this.todoService.toggleOrder(order);
  }
}
