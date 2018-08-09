import { generateUUID } from '../utils/uuid';

export class Todo {
  _id: string;
  title: string;
  createAt: number;
  listUUID: string; // TodoList 的 _id
  desc: string;
  completedFlag: boolean;
  completedAt: number;
  dueAt: number;
  planAt: number;
  notifyMe = false; // Way 1. ?

  constructor(title: string, listUUID?: string) {
    this._id = generateUUID();
    this.title = title;
    this.listUUID = listUUID;
    this.completedFlag = false; // Way 2. ?
  }
  // TODO: 两种方式（way）有什么区别？
}

export class TodoList {
  _id: string;
  title: string;
  createAt: number;

  constructor(title: string) {
    this._id = generateUUID();
    this.title = title;
  }
}

export class Summary {
  _id: string;
  date: number;
  completedTodos: string[];
  uncompletedTodos: string[];
  cCount = 0;
  uCount = 0;

  constructor(date: number, cItems: string[], uItems: string[]) {
    this.date = date;
    this.completedTodos = cItems;
    this.uncompletedTodos = uItems;
    this.cCount = this.completedTodos.length;
    this.uCount = this.uncompletedTodos.length;
  }
}
