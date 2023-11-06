import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { apiModelChart1 } from '../models/chart1.api.model';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css'],
})
export class Chart2Component implements OnInit {
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Years';
  yAxisLabel = 'מהתינוקות %';
  autoScale = true;
  colorScheme = 'cool';
  lineChartData: any[] = []; // Add your data here
  chartData: { name: string, series: { name: string, value: number }[] }[] = [];
  legendTitle=""
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.getDataforChart2().subscribe((data: any) => {
      this.transferData(data);
    });
  }
  transferData(data: apiModelChart1[]) {
    const groupedData = data.filter((item) => item.measure === "הנקה מלאה" && item.year !== null);
    const agesToDisplay = [1, 3, 6, 12]; // Modify this array as needed
    this.chartData = agesToDisplay.map((age) => {
      const ageData = groupedData.filter((item) => item.age === age);
      const series = ageData.map((item) => ({
        name: item.year.toString(),
        value: item.populationRate,
      }));  
      return {
        name: ` חודשים ${age}`,
        series,
      };
    });
  }
  yAxisTickFormatting(value: number): string {
    return `${value}%`;
  }
}
