import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { USERNAME } from '../../../services/local-storage/local-storage.namespace';

@Component({
  selector: 'app-left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.scss']
})
export class LeftControlComponent implements OnInit {
  @Input() isCollapsed: boolean;
  /**
   * ImoNote: 关于 `ViewChild`
   * - 接收两类参数：
   *   - a component/directive type => the component/directive instance
   *   - name（ref） of a template reference variable（#ref） => reference to the native element: ElementRef
   * - 举例：
   *   - 第一类如下
   *   - 第二类详见 todo-lists.component
   * - 参考：
   *   - [ViewChild](https://angular.io/api/core/ViewChild)
   *   - TODO: [Understanding ViewChildren, ContentChildren, and QueryList in Angular](https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e)
   *   - [template reference variable](https://angular.io/guide/template-syntax#ref-vars)
   */
  @ViewChild(TodoListsComponent) todoListsComponent: TodoListsComponent;

  username: string;

  constructor(private store: LocalStorageService) {}

  ngOnInit() {
    // this.username = 'baishusama'; // test
    this.username = this.store.get(USERNAME);
  }

  /**
   * ImoNote: 为什么需要调用子组件的方法？
   * 其实是因为把 add list modal 放在了 todo-lists.component 中，这里才需要调用子组件的方法
   * 也完全可以将“+ 新列表”按钮作为一个单独的组件，把 add list modal 也放入其中，这样就不需要在这里调用子组件的方法了
   * rename list modal 也类似，可以放到“删除列表”按钮自成的组件中
   * 不过这些方案，目前来看没有绝对的好与坏，只是不同的实现而已 TODO: 更好的组件划分？
   */
  openAddListModal(): void {
    // 调用子组件的方法
    this.todoListsComponent.openAddListModal();
  }
}
