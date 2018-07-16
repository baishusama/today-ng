import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  NzDropdownService,
  NzDropdownContextComponent,
  NzModalService
} from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TodoList, Todo } from '../../../../../domain/entities';
import { TodoService } from './../../../../services/todo/todo.service';
import { TodoListsService } from '../../../../services/todo-lists/todo-lists.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit, OnDestroy {
  @Input() isCollapsed: boolean;
  @ViewChild('addListInput') private addListInput;
  @ViewChild('renameListInput') private renameListInput;

  todoLists: TodoList[];
  currentListUuid: string;
  contextListUuid: string;
  addListModalVisible = false;
  renameListModalVisible = false;

  private dropdown: NzDropdownContextComponent;
  private destroy$ = new Subject();

  constructor(
    private dropdownService: NzDropdownService,
    private modal: NzModalService,
    private todoListsService: TodoListsService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    /**
     * ImoNote: 这里的 takeUntil 666 TODO: vs unsubscribe ?
     */
    this.todoListsService.todoLists$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lists => {
        // console.log('[test] #TodoLists# subscribe lists :', lists);
        this.todoLists = lists;
      });

    this.todoListsService.currentUuid$
      .pipe(takeUntil(this.destroy$))
      .subscribe(uuid => {
        // console.log('[test] #TodoLists# subscribe uuid :', uuid);
        this.currentListUuid = uuid;
      });

    this.todoListsService.getLocalAll();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  /* Modal */

  openAddListModal(): void {
    this.addListModalVisible = true;
    setTimeout(() => {
      // ImoNote: 注意这里的 `.nativeElement.focus` 贴心地把光标定位到了相应输入框
      this.addListInput.nativeElement.focus();
    });
  }

  openRenameListModal(): void {
    this.renameListModalVisible = true;
    setTimeout(() => {
      this.renameListInput.nativeElement.value = this.getContextListTitle();
      this.renameListInput.nativeElement.focus();
    });
  }

  closeAddListModal(): void {
    this.addListModalVisible = false;
  }

  closeRenameListModal(): void {
    this.renameListModalVisible = false;
  }

  // Way 1. 注意这里的注释
  add(title: string): void {
    this.todoListsService.add(title);
    this.closeAddListModal();
    // this.addListInput.nativeElement.value = '';
  }

  // Way 2.
  rename(title: string): void {
    this.todoListsService.rename(this.contextListUuid, title);
    this.closeRenameListModal();
    this.renameListInput.nativeElement.value = '';
  }

  delete(): void {
    const uuid = this.contextListUuid;
    this.modal.confirm({
      nzTitle: `确认删除列表“${this.getContextListTitle()}”么？`,
      nzContent: '警告，该操作会导致该列表下的所有待办事项被删除！',
      nzOnOk: () => {
        // TODO: 这里 Promise 里 `res()` 的写法不太熟。。ES6 的 Promise ?
        new Promise((res, rej) => {
          this.todoListsService.delete(uuid);
          this.todoService.deleteInList(uuid);
          res();
        }).catch(() => {
          console.log(`Delete todo list (${uuid}) failed :(`);
        });
      }
    });
  }

  /* 右键菜单栏 */

  onContextMenu(
    $event: MouseEvent,
    template: TemplateRef<void>,
    uuid: string
  ): void {
    // 通过 NzDropdownService 服务创建右键菜单栏
    this.dropdown = this.dropdownService.create($event, template);
    this.contextListUuid = uuid;
  }

  closeContextMenu(): void {
    this.dropdown.close();
  }

  // 选中某列表时
  select(uuid): void {
    this.todoListsService.setCurrentListByUuid(uuid);
  }

  private getContextListTitle(): string {
    return this.todoLists.find(l => l._id === this.contextListUuid).title;
  }
}
