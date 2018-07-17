import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { floorToMinute, ONE_HOUR, getCurrentTime } from './../../../utils/time';
import { OrderOption } from './../../../domain/types';
import { Todo } from './../../../domain/entities';
import { TODOS } from '../local-storage/local-storage.namespace';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { TodoListsService } from './../todo-lists/todo-lists.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private order: OrderOption = 'title';

  todos$ = new Subject<Todo[]>();
  order$ = new Subject<OrderOption>();

  constructor(
    private todoListsService: TodoListsService,
    private store: LocalStorageService
  ) {
    /**
     * ImoNote:
     * 原教程在这里（constructor 内部）做了一次 getLocalAll，感觉没必要？
     */
  }

  getLocalAll(): void {
    this.todos = this.store.getList(TODOS);
    this.broadcast();
  }
  // getRaw(){}

  toggleTodoComplete(uuid: string): void {
    const todo = this.getTodoByUuid(uuid);
    if (todo) {
      todo.completedFlag = !todo.completedFlag;
      todo.completedAt = todo.completedFlag ? getCurrentTime() : undefined;
      this.broadcast();
      this.persist();
    }
  }

  setTodoToday(uuid: string): void {
    const todo = this.getTodoByUuid(uuid);
    if (todo && !todo.completedFlag) {
      todo.planAt = floorToMinute(new Date()) + ONE_HOUR;
      // this.update(todo)
      this.broadcast();
      this.persist();
    }
  }

  moveTodoToList(uuid: string, listUUID: string): void {
    const todo = this.getTodoByUuid(uuid);
    if (todo) {
      todo.listUUID = listUUID;
      // this.update(todo)
      this.broadcast();
      this.persist();
    }
  }

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

  // update(todo: Todo): void{
  //   const index = this.getTodoIndexByUuid(todo._id);
  //   if(index !== -1){}
  // }

  delete(uuid: string): void {
    const index = this.getTodoIndexByUuid(uuid);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.broadcast();
      this.persist();
    }
  }

  deleteInList(uuid: string): void {
    const toDelete = this.todos.filter(t => t.listUUID === uuid);
    toDelete.forEach(t => this.delete(t._id));
  }

  toggleOrder(r: OrderOption): void {
    this.order = r;
    this.order$.next(r);
  }

  private broadcast(): void {
    this.todos$.next(this.todos);
    this.order$.next(this.order);
  }

  private persist(): void {
    this.store.set(TODOS, this.todos);
  }

  // 根据 uuid 找到待办事项在数组中的角标
  private getTodoIndexByUuid(uuid: string): number {
    return this.todos.findIndex(t => t._id === uuid);
  }

  // 根据 uuid 找到待办事项
  private getTodoByUuid(uuid: string): Todo | null {
    return this.todos.find(t => t._id === uuid) || null;
  }
}
