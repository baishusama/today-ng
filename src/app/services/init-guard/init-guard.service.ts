import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { INIT_FLAG } from '../local-storage/local-storage.namespace';

@Injectable({
  providedIn: 'root'
})
export class InitGuardService implements CanActivate {
  constructor(private store: LocalStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    /**
     * ImoNote:
     * local-storage.service 中 get 和 getList 都用了泛型，这里有三种写法：
     * 1. 直接获取：因为内部使用了 JSON.parse 存进去的布尔值能够成功被解析为布尔值
     * 2. 获取后求两次反：比直接获取更加万无一失的得到布尔值的方式
     * 3. 指定类型为 boolean 后获取：仅供 TypeScript 编译使用，并不会发生类型的隐式转换，即如果获取到的是 'imo' 字符串，并不会转成 true 布尔值
     * 所以这里第三种方式，当结果本就是布尔值时都可行，但结果不是布尔值时，只有第二种方式可行
     */
    // const init = this.store.get(INIT_FLAG);
    const init = !!this.store.get(INIT_FLAG);
    // const init = this.store.get<boolean>(INIT_FLAG);

    if (state.url.includes('setup') && init) {
      this.router.navigateByUrl('/main');
      return false;
    }
    if (!state.url.includes('setup') && !init) {
      this.router.navigateByUrl('/setup');
      return false;
    }

    return true;
  }
}
