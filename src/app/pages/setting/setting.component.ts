import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { USERNAME } from './../../services/local-storage/local-storage.namespace';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
  // TODO: pageSwitchTransition
})
export class SettingComponent implements OnInit {
  // avatar = this. // TODO:
  originalUsername = this.store.get(USERNAME);

  @ViewChild('usernameInput')
  private usernameInput: ElementRef;

  constructor(
    private location: Location,
    private store: LocalStorageService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.usernameInput.nativeElement.value = this.originalUsername;
  }

  validateUsername(username: string): void {
    if (!username) {
      this.message.error('用户名不能为空！');
      this.usernameInput.nativeElement.value = this.originalUsername;
    } else if (username !== this.originalUsername) {
      this.originalUsername = username;
      this.store.set(USERNAME, username);
      this.message.success('用户名修改成功！');
    }
  }

  // TODO: 头像修改的逻辑：用到 FileReader 可以作为练习～

  goBack() {
    this.location.back();
  }
}
