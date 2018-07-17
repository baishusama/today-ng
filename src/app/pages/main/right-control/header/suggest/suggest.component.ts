import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Todo } from '../../../../../../domain/entities';
import {
  floorToDate,
  getTodayTime,
  ONE_DAY
} from '../../../../../../utils/time';
import { TodoService } from './../../../../../services/todo/todo.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SuggestComponent implements OnInit, OnDestroy {
  private todos$: Subscription;

  suggestedTodo: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos$ = this.todoService.todos$.subscribe(todos => {
      const filtered = todos.filter(t => {
        // 推荐今天之前的待办事项
        if (t.planAt && floorToDate(t.planAt) <= getTodayTime()) {
          return true;
        }
        // 推荐未来两天内的带待办事项
        if (t.dueAt && t.dueAt - getTodayTime() <= ONE_DAY * 2) {
          return true;
        }
        return false;
      });
      this.suggestedTodo = filtered;
    });

    this.todoService.getLocalAll();
  }

  ngOnDestroy() {
    this.todos$.unsubscribe();
  }

  setTodoToday(todo: Todo): void {
    this.todoService.setTodoToday(todo._id);
  }
}
