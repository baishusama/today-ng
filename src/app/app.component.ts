import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /**
     * ImoNote:
     * - 关于右键菜单栏的两处代码：
     *   - 可以通过以下代码阻止顶级标签的 contextmenu 的浏览器默认行为
     *   - 本应用有一些通过 `(contextmenu)` 自定义的右键菜单栏（详见 todo-lists.component）
     * - 说明：
     *   - 如果不阻止，那么未自定义的表现为浏览器原生的右键菜单栏，自定义的表现为自定义的右键菜单栏
     *   - 阻止后，未自定义的表现为没有右键菜单栏，自定义的表现为自定义的右键菜单栏
     * P.S. 暂时注释掉下述代码，方便右键 inspect 测试
     */
    // window.addEventListener('contextmenu', e => {
    //   e.preventDefault();
    // });
  }
}
