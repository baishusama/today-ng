import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { LeftControlComponent } from './left-control/left-control.component';

@NgModule({
  imports: [SharedModule, MainRoutingModule],
  declarations: [MainComponent, LeftControlComponent]
})
export class MainModule {}
