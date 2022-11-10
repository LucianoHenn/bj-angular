import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportService: ReportService) {
  }

  pie!: any;
  line!: any;
  column!: any;

  private subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.reportService.getResultAvg().subscribe({
        next: (response: any) => {
          console.log('response', response);
        this.pie = {
          animationEnabled: true,
          theme: "dark2",
          exportEnabled: true,
          title: {
          text: "Resultado de los juegos"
          },
          subtitles: [{
        
          }],
          data: [{
          type: "pie", //change type to column, line, area, doughnut, etc
          indexLabel: "{name}: {y}%",
          dataPoints: response
          }]
        }
        },
        error: (e)=> {
          console.log('error', e)
        }
      })
    )
    this.subscription.add(
      this.reportService.getDailyGames().subscribe({
        next: (response: any) => {
        const dp = response.map((element: any) => {
            element.x = new Date(element.dia)
            return element
          });
          console.log('dp', dp)
        this.line =  {
          theme: "dark2",
          animationEnabled: true,
          zoomEnabled: true,
          title: {
            text: "Juegos por Día"
          },
          axisY: {
            labelFormatter: (e: any) => {
              return e.value
            }
          },
          data: [{
            type: "line",
            xValueFormatString: "DD/MM/YYYY",
            yValueFormatString: "#####",
            dataPoints: dp
          }]
        }	
        },
        error: (e)=> {
          console.log('error', e)
        }
      })
    )
    this.subscription.add(
      this.reportService.getDealerWinningCards().subscribe({
        next: (response: any) => {
        console.log('wc', response);
        this.column =  {
          theme: "dark2",
          title:{
            text: "Valores con los que ganó el dealer"
          },
          animationEnabled: true,
          data: [{        
            type: "column",
            dataPoints: response
          }]
      }
        },
        error: (e)=> {
          console.log('error', e)
        }
      })
    )

  }





barChartOptions = {
  theme: "dark2",
  title:{
    text: "Top Jugadores (Ganancias)"
  },
  animationEnabled: true,
  axisY: {
    includeZero: true,
    suffix: "K"
  },
  data: [{
    type: "bar",
    indexLabel: "{y}",
    yValueFormatString: "#,###K",
    dataPoints: [
      { label: "Snapchat", y: 15 },
      { label: "Instagram", y: 20 },
      { label: "YouTube", y: 24 },
      { label: "Twitter", y: 29 },
      { label: "Facebook", y: 73 }
    ]
  }]
}	





} 
