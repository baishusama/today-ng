import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { SummaryService } from './summary.service';

@NgModule({
  imports: [SharedModule, SummaryRoutingModule],
  declarations: [SummaryComponent],
  providers: [SummaryService]
})
export class SummaryModule {}
