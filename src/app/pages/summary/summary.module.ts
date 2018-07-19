import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { SummaryService } from './summary.service';

@NgModule({
  imports: [CommonModule, SharedModule, SummaryRoutingModule],
  declarations: [SummaryComponent],
  providers: [SummaryService]
})
export class SummaryModule {}
