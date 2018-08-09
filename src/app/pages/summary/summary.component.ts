import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

import { getTodayTime, ONE_DAY } from '../../../utils/time';
import {
  USERNAME,
  START_USING_DATE
} from './../../services/local-storage/local-storage.namespace';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { Summary } from './../../../domain/entities';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  username = this.store.get(USERNAME) || '匿名用户';
  dateCount = Math.floor(
    (getTodayTime() - this.store.get(START_USING_DATE)) / ONE_DAY + 1
  );

  // TODO:
  // @HostBinding('@pageSwitchTransition') private state = 'activated';

  constructor(
    // private router: Router,
    private location: Location,
    private store: LocalStorageService,
    private summaryService: SummaryService,
    private noti: NzNotificationService
  ) {}

  ngOnInit() {
    this.summaryService.doSummary();
  }

  requestForDate(date: Date): Summary | null {
    return this.summaryService.summaryForDate(date.getTime());
  }

  showSummaryDetail(summary: Summary): void {
    if (!summary) {
      return;
    }

    const { cCount, uCount } = summary;
    if (uCount) {
      this.noti.error(
        '有未完成的待办事项',
        `你完成了全部任务的 ${cCount / (cCount + uCount)}%`
      );
    } else if (cCount) {
      this.noti.success('完成了这一天的全部任务', 'Good job!');
    }
  }

  goBack(): void {
    /**
     * ImoNote: “返回”上一个路由的两种方式
     * 详见: https://stackoverflow.com/questions/35446955/how-to-go-back-last-page#answer-36470719
     */
    // this.router.navigateByUrl('/main');
    this.location.back();
  }
}
