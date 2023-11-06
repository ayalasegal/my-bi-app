
  import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
interface ChartData {
  name: string;
  series: { name: string; value: number }[];
}

interface RawData {
  score: number;
  year: number;
  subject: string;
  desc_survey: string;
  comparisonGroup: string;
  comparisonValue: string;
  avgSubjectScore: number;
  avgDiff: number;
  order: number;
}
@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.css']
})
export class Chart3Component implements OnInit {
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  legendTitle=""
  xAxisLabel = 'גודל המוסד';
  yAxisLabel = 'הפרש מהממוצע הארצי';
  colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],  
  };
  constructor(private dataService: DataService) { }
  chartData: ChartData[] = [];
  ngOnInit(): void {
    this.dataService.getDataForChat3().subscribe((data: any) => {
      this.chartData = this.processData(data);
    });
  }
  processData(data: RawData[]): ChartData[] {
    const groupedData: { [key: string]: { [key: string]: number } } = {};
    const categories: string[] = ['מרכז', 'קטנים', 'בינוניים - גדולים'];
    const series: ChartData[] = [];
    for (let item of data) {
      if (categories.includes(item.comparisonValue)) {
        if (!groupedData[item.subject]) {
          groupedData[item.subject] = {};
        }
        groupedData[item.subject][item.comparisonValue] = item.avgDiff;
      }
    }
    for (let key in groupedData) {
      const dataEntry: ChartData = { name: key, series: [] };
      for (let category of categories) {
        const value = groupedData[key][category] || 0;
        dataEntry.series.push({ name: category, value: value });
      }
      series.push(dataEntry);
    }
    return series;
  }
  yAxisTickFormatting(value: number): string {
    return `${value}%`;
  }
  }


