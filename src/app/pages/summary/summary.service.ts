import { floorToDate, ONE_DAY } from './../../../utils/time';
import { Injectable } from '@angular/core';

import { TodoService } from './../../services/todo/todo.service';
import {
  LAST_SUMMARY_DATE,
  START_USING_DATE
} from './../../services/local-storage/local-storage.namespace';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { Summary, Todo } from '../../../domain/entities';
import { getTodayTime } from '../../../utils/time';
import { SUMMARIES } from '../../services/local-storage/local-storage.namespace';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  summaries: Summary[] = [];

  constructor(
    private store: LocalStorageService,
    private todoService: TodoService
  ) {}

  doSummary(): void {
    const todayDate = getTodayTime();
    let fromDate =
      this.store.get(LAST_SUMMARY_DATE) ||
      floorToDate(this.store.get(START_USING_DATE));

    if (fromDate === todayDate) {
      return;
    }

    const todos = this.todoService.getRawAll();
    const todosToAna: Todo[] = [];
    const summaries: Summary[] = [];
    const dates: number[] = [];

    // 获取从开始使用至今的已计划的待办事项
    todos.forEach(todo => {
      if (todo.planAt) {
        const planAt = floorToDate(todo.planAt);
        if (planAt <= todayDate) {
          todosToAna.push(todo);
        }
      }
    });

    // 获取从开始使用至今（不包含今天）的日期范围
    /**
     * ImoNote:
     * 逻辑上，默认不会对过去的待办事项进行各种奇怪的修改，
     * 所以记录一个 LAST_SUMMARY_DATE 来记录上一次统计的日期，
     * 并将每次统计的结果缓存到 SUMMARIES 中，以增加的方式优化统计
     */
    while (fromDate < todayDate) {
      dates.push(fromDate);
      fromDate += ONE_DAY;
    }
    dates.push(todayDate);

    dates.forEach(date => {
      const completedItems: string[] = [];
      const uncompletedItems: string[] = [];

      todosToAna.forEach(todo => {
        const planAt = floorToDate(todo.planAt);
        // TODO: 无视超前完成的？
        // 计划日截至 date 才去进一步判断其完成情况
        if (planAt <= date) {
          if (todo.completedFlag && floorToDate(todo.completedAt) === date) {
            completedItems.push(todo.title);
          } else if (
            todo.completedFlag &&
            floorToDate(todo.completedAt) < date
          ) {
            // do nothing..
          } else {
            uncompletedItems.push(todo.title);
          }
        }
      });

      summaries.push(new Summary(date, completedItems, uncompletedItems));
    });

    this.store.set(LAST_SUMMARY_DATE, todayDate);
    this.addSummaries(summaries);
  }

  public summaryForDate(date: number): Summary {
    if (!this.summaries.length) {
      this.summaries = this.loadSummaries();
    }
    return this.summaries.find(s => s.date === date);
  }

  private loadSummaries(): Summary[] {
    /**
     * ImoNote: <Summary>
     * 大部分 getList 可以正常使用，但是这里的 getList 指定了类型为 Summary 的原因是，
     * getList 内部使用 JSON.parse 来解析本地存储中的数据，对于 number|string|boolean 能自动的转成对应的类型，
     * 而 Summary 本质上只是一个对象，所以为了让 TypeScript 的编译器知道是 Summary 故显示指明类型。
     */
    return this.store.getList<Summary>(SUMMARIES);
  }

  private addSummaries(summaries: Summary[]): void {
    const oldSummaries = this.loadSummaries();
    const newSummaries = oldSummaries.concat(summaries);
    this.store.set(SUMMARIES, newSummaries);
  }
}
