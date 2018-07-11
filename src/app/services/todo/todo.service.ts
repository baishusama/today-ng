import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // TODO: 完成 TodoService

  constructor() {}

  deleteInList(uuid: string): void {
    // TODO: should delete todos in todoList#uuid...
    console.log(`[test] should delete todos in todoList (${uuid})...`);
  }
}
