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

  // 感觉这么做很危险（todos 数据很容易被使用者不小心修改）
  getRawAll() {
    return this.todos;
  }

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

  update(todo: Todo): void {
    const index = this.getTodoIndexByUuid(todo._id);
    if (index !== -1) {
      /**
       * ImoNote:
       * - 博主下面的代码有 bug
       *   - 例如，当一个很早就完成的（todo.completedFlag === true）的待办事项请求更新（update）的时候，
       *     每次 update 都会修改其完成的时间（completedAt）。
       * - 所以我这里通过对比 update 前后 todo 的完成状态的值，决定是否和如何更新 completedAt 时间
       */
      const oldTodo = this.getTodoByUuid(todo._id);
      if (!oldTodo.completedFlag && todo.completedFlag) {
        todo.completedAt = getCurrentTime();
      } else if (oldTodo.completedFlag && !todo.completedFlag) {
        todo.completedAt = undefined;
      }

      this.todos.splice(index, 1, todo);
      this.broadcast();
      this.persist();
    }
  }

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

  // 根据 uuid 找到待办事项
  public getTodoByUuid(uuid: string): Todo | null {
    return this.todos.find(t => t._id === uuid) || null;
  }

  // 根据 uuid 找到待办事项在数组中的角标
  private getTodoIndexByUuid(uuid: string): number {
    return this.todos.findIndex(t => t._id === uuid);
  }

  private broadcast(): void {
    this.todos$.next(this.todos);
    this.order$.next(this.order);
  }

  private persist(): void {
    this.store.set(TODOS, this.todos);
  }
}
