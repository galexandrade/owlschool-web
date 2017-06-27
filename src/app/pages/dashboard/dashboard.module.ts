import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { Feed } from './feed';
import { FeedService } from './feed/feed.service';
import { PieChart } from './pieChart';
import { PieChartService } from './pieChart/pieChart.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    PieChart,
    Feed,
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService,
    FeedService,
    PieChartService
  ]
})
export class DashboardModule {}
