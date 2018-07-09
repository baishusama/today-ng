# TodayNg

## 说明

本项目是阅读 [today-ng](https://github.com/wendzhue/today-ng) 项目，并跟随[相关教程](https://zhuanlan.zhihu.com/p/38373638)而动手实践的一个笔记记录性质项目。

## 笔记

### ng-zorro

- 在 `angular.json` 文件的 `test` 和 `build` 各自的 `styles` 数组中添加 `ng-zorro-antd.min.css` 文件的路径（在 `node_modules` 中）。从而避免直接从 `index.html` 中手动引入，并随之而来的打包问题（需要手动将所有依赖的静态文件添加到 `src/assets` 目录下，并根据情况设置 `--base-href` 和 `--deploy-url`）。

---

## NG CLI TMP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
