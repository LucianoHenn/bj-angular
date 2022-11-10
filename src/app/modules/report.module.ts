import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../components/reports/reports.component';
import { ReportRoutingModule } from './report-routing.module';
import { PieComponent } from '../components/graphs/pie/pie.component';
import { LineComponent } from '../components/graphs/line/line.component';
import { ColumnComponent } from '../components/graphs/column/column.component';

import * as CanvasJSAngularChart from '../components/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    ReportsComponent,
    CanvasJSChart,
    PieComponent,
    LineComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }