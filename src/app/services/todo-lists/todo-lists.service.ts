import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TodoList } from '../../../domain/entities';
import { TODOLISTS } from '../local-storage/local-storage.namespace';

/**
 * ImoNote: 关于 `type`
 * - 指出很多过时/错误说法的文章：[Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)
 * - 据上文所说“过时”的官方文档：[Type alias](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)
 */
type SpecialListUUID = 'today' | 'todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService {
  private todoLists: TodoList[] = [];
  // TODO: current 和 currentUuid（current$ 和 currentUuid$）其实冗余了，可以考虑只保留一个
  private current: TodoList;
  private currentUuid: SpecialListUUID | string = 'today';

  todoLists$ = new Subject<TodoList[]>();
  current$ = new Subject<TodoList>();
  currentUuid$ = new Subject<string>();

  constructor(private store: LocalStorageService) {}

  // 从本地存储中获取列表数组
  getLocalAll(): void {
    this.todoLists = this.store.getList(TODOLISTS);
    this.broadCast();
    // 刚从本地存储获取的数据自然也不需要持久化
  }

  // // 返回当前选中列表的 uuid
  // getCurrentListUuid(): SpecialListUUID | string {
  //   return this.currentUuid;
  // }

  // 根据 uuid 设置当前选中的列表
  setCurrentListByUuid(uuid: string): void {
    this.setCurrentUuidAndList(uuid);
    this.broadCast();
    // current 相关不需要持久化——持久化的数据不包括 current，current 是应用的显示相关的状态
  }

  // 新增新列表的同时，设置其为当前选中的列表
  add(title: string): void {
    const newList = new TodoList(title);
    const uuid = newList._id;
    console.log('[test] #TodoListsService.add# newList :', newList);
    console.log('[test] #TodoListsService.add# uuid :', uuid);

    this.todoLists.push(newList);
    this.setCurrentUuidAndList(uuid);

    this.broadCast();
    this.persist();
  }

  // 重命名某列表
  rename(uuid: string, title: string) {
    const list = this.getTodoListByUuid(uuid);
    if (list) {
      // 重命名
      list.title = title;
      // this.update(list); // ImoNote: 我觉得之类不需要 update 方法啊。。因为 list 是个引用类型
      this.broadCast();
      this.persist();
    }
  }

  // 删除某列表，同时确保当前选中列表存在
  delete(uuid: string): void {
    const index = this.getTodoListIndexByUuid(uuid);
    if (index !== -1) {
      // 根据 uuid 删除对应 todolist
      this.todoLists.splice(index, 1);
      // 如果被删除列表是当前选中列表，默认选择 today
      if (this.currentUuid === uuid) {
        this.setCurrentUuidAndList('today');
      }
      this.broadCast();
      this.persist();
    }
  }

  // TODO: 其实很多不需要 boardCast all 的地方也 boardCast all 了。。。
  private broadCast(): void {
    this.todoLists$.next(this.todoLists);
    this.current$.next(this.current);
    this.currentUuid$.next(this.currentUuid);
  }

  // 本地持久化
  private persist(): void {
    this.store.set(TODOLISTS, this.todoLists);
  }

  // // TODO: 这里的 update 函数肯定有问题 0.0 。。
  // private update(list: TodoList): void {
  //   /**
  //    * 当 todoLists 中不存在要 update 的 list 才做 update
  //    * 1. ~~添加到 todoLists 数组~~ ？？？
  //    * 2. 做持久化
  //    * 3. 做广播
  //    */
  //   const index = this.getTodoListIndexByUuid(list._id);
  //   if (index !== -1) {
  //     this.todoLists.splice(index, 1, list); // 代码为什么是替换最后一个？？？
  //     this.persist();
  //     this.broadCast();
  //   }
  // }

  // 根据 uuid 设置当前选中相关的数据
  private setCurrentUuidAndList(uuid: string): void {
    this.currentUuid = uuid;
    this.current = this.getTodoListByUuid(uuid);
  }

  // 根据 uuid 找到列表在列表数组中的角标
  private getTodoListIndexByUuid(uuid: string): number {
    return this.todoLists.findIndex(l => l._id === uuid);
  }

  // 根据 uuid 找到列表
  private getTodoListByUuid(uuid: string): TodoList {
    return this.todoLists.find(l => l._id === uuid);
  }
}
