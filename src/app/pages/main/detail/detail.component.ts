import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import {
  floorToDate,
  floorToMinute,
  getTodayTime,
  getCurrentTime,
  lessThanADay
} from '../../../../utils/time';
import { Todo } from './../../../../domain/entities';
import { TodoService } from './../../../services/todo/todo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Output() changedTodo = new EventEmitter();

  private sourceTodo: Todo;

  cacheTodo: Todo; // 是一个 cache
  dueDate: Date;
  planDate: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe().subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      const todo = this.todoService.getTodoByUuid(id);
      this.sourceTodo = todo;
      this.cacheTodo = Object.assign({}, todo) as Todo;
      if (todo.dueAt) {
        this.dueDate = new Date(todo.dueAt);
      }
      if (todo.planAt) {
        this.planDate = new Date(todo.planAt);
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('main');
  }

  confirm(): void {
    this.todoService.update(this.cacheTodo);
    this.goBack();
  }

  delete(): void {
    this.todoService.delete(this.cacheTodo._id);
    this.goBack();
  }

  // 截止日期精确到天
  dueDisableDate = (d: Date): boolean => floorToDate(d) < getTodayTime();
  // 计划时间精确到分钟
  planDisableDate = (d: Date): boolean => floorToMinute(d) < getCurrentTime();

  handleDueDateChange(date: Date): void {
    const dueAt = date ? date.getTime() : undefined;
    this.cacheTodo.dueAt = dueAt;
    if (dueAt && lessThanADay(dueAt)) {
      this.message.warning('该事项将会在 24 小时内到期', {
        nzDuration: 6000
      });
    }
    this.checkDate();
  }

  handlePlanDateChange(date: Date): void {
    const planAt = date ? date.getTime() : undefined;
    if (!planAt) {
      this.cacheTodo.notifyMe = false;
    }
    this.cacheTodo.planAt = planAt;
    this.checkDate();
  }

  // 只有在未完成、且存在计划日期的情况下，才能开关“计划提醒”
  switchNotifyMe(): void {
    if (this.cacheTodo.completedFlag) {
      return;
    }
    if (!this.cacheTodo.planAt) {
      this.message.warning('尚未设置计划日期！');
      return;
    }
    this.cacheTodo.notifyMe = !this.cacheTodo.notifyMe;
  }

  private checkDate(): void {
    const { dueAt, planAt } = this.cacheTodo;
    /**
     * 例如，dueAt 为 2018-08-08，planAt 为 2018-08-08 14:00 也是可以的
     * 所以比较的时候，需要先对 planAt 求 floorToDate 的值
     */
    if (dueAt && planAt && floorToDate(planAt) > dueAt) {
      this.message.warning('你确定要在到期之后才开始做这个待办事项么？', {
        nzDuration: 6000
      });
    }
  }
}
