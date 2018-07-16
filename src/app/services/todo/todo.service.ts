import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { floorToMinute, ONE_HOUR } from './../../../utils/time';
import { Todo } from './../../../domain/entities';
import { TODOS } from '../local-storage/local-storage.namespace';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { TodoListsService } from './../todo-lists/todo-lists.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  todos$ = new Subject();

  constructor(
    private todoListsService: TodoListsService,
    private store: LocalStorageService
  ) {
    // TODO: need ???
    // this.todos = this.store.getList(TODOS);
    // TODO: broadcast ?
  }

  getLocalAll(): void {
    this.todos = this.store.getList(TODOS);
    this.broadcast();
  }
  // getRaw(){}
  // getByUuid(){}
  // setTodoToday(){}
  // moveTodoToList(){}
  // toggleTodoComplete(){}

  add(title: string): void {
    const currentListUuid = this.todoListsService.getCurrentListUuid();
    const newTodo = new Todo(title, currentListUuid);

    // 如果当前是 today 列表，那么添加到 todo 列表中
    if (currentListUuid === 'today') {
      newTodo.planAt = floorToMinute(new Date()) + ONE_HOUR;
      newTodo.listUUID = 'todo';
    }

    this.todos.push(newTodo);

    this.broadcast();
    this.persist();
  }

  // update(){}
  // delete(){}

  deleteInList(uuid: string): void {
    // TODO: should delete todos in todoList#uuid...
    console.log(`[test] should delete todos in todoList (${uuid})...`);
  }

  private broadcast(): void {
    this.todos$.next(this.todos);
  }

  private persist(): void {
    this.store.set(TODOS, this.todos);
  }
}
