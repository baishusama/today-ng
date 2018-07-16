import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Todo, TodoList } from '../../../../../domain/entities';
import { TodoListsService } from './../../../../services/todo-lists/todo-lists.service';
import { TodoService } from './../../../../services/todo/todo.service';
import { floorToDate, getTodayTime } from '../../../../../utils/time';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  todos: Todo[] = [];
  todoLists: TodoList[] = [];
  currentContextTodo: Todo;

  constructor(
    private todoListsService: TodoListsService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todoListsService.todoLists$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lists => {
        // console.log('[test] #Todos# subscribe lists :', lists);
        this.todoLists = lists;
      });

    combineLatest(this.todoListsService.currentUuid$, this.todoService.todos$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(sources => {
        // console.log('[test] #Todos# subscribe(combine) sources :', sources);
        this.processTodos(sources[0], sources[1] as Todo[]);
      });

    this.todoListsService.getLocalAll();
    this.todoService.getLocalAll();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  private processTodos(listUUID: string, todos: Todo[]): void {
    // console.log(
    //   '[test] #processTodos# Before filtering, this.todos :',
    //   this.todos
    // );
    const filteredTodos = todos
      .filter(todo => {
        return (
          (listUUID === 'today' &&
            todo.planAt &&
            floorToDate(todo.planAt) <= getTodayTime()) ||
          (listUUID === 'todo' &&
            (!todo.listUUID || todo.listUUID === 'todo')) ||
          listUUID === todo.listUUID
        );
      })
      /**
       * ImoNote:
       * 这里的 Object.assign 虽然是浅拷贝，
       * 但对于键值对中的值都是基本值（primitive value）的 Todo 实例来说，其实算深拷贝。
       * 做一次“深”拷贝的原因大概是，不想 todos 组件对服务中的 todos 数据作出意外修改，
       * 因为 subject.next 方法传递到 subscribe 回调函数中的值是按引用传递的。
       */
      .map(todo => Object.assign({}, todo) as Todo);

    this.todos = filteredTodos;
    // console.log(
    //   '[test] #processTodos# After filtering, this.todos :',
    //   this.todos
    // );
  }

  add(title: string): void {
    this.todoService.add(title);
  }

  select(uuid: string): void {
    console.log(`[test] should select the todo (${uuid})`);
  }

  toggle(uuid: string): void {
    console.log(`[test] should toggle the todo (${uuid})`);
  }
}
