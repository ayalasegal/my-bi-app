import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { MeasuresMap, TransformedData, apiModelChart1 } from '../models/chart1.api.model';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component {
  constructor(private dataService: DataService) { }
formGroup!: FormGroup;
selectedYear: number | null = null;
allData!: apiModelChart1[];
legendTitle=""

transformedData!: TransformedData;
view: [number,number] = [500, 300];// Other configuration properties
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = true;
showXAxisLabel = true;
showYAxisLabel = true;
yAxisLabel = '% מהתינוקות';
xAxisLabel = 'גיל בחודשים';
autoScale = true;
colorScheme = 'cool'
yAxisTicks: number[] = [0, 20, 40, 60, 80];
ngOnInit() {
  this.formGroup = new FormGroup({
    selectedYear: new FormControl<number | null>(null)
  });
  this.dataService.getData().subscribe((allData: any) => {
    this.transformedData = this.transformData(allData);  });
}
getYearOptions(): { name: string; code: number }[] {
  const uniqueYears = Array.from(new Set(this.allData?.map((item: any) => item.year)));
  const yearOptions = uniqueYears.map((year: number) => {
    return { name: year.toString() ,code: year };
  });
  yearOptions.unshift({ name: 'All Years', code: 0 });
  return yearOptions;
}
filterDataByYear() {
  if (this.selectedYear) {
    this.transformedData = this.transformData(this.allData.filter(item => item.year === this.selectedYear));
  } else {
    this.transformedData = this.transformData(this.allData);
  }
}
transformData(apiData: apiModelChart1[]):TransformedData {
  const ages:number[] = Array.from(new Set(apiData.map((item: any) => item.age)));
console.log(ages)
  const measuresMap:MeasuresMap = {
    'ללא הנקה': 'ללא הנקה',
    'הנקה מלאה': 'הנקה מלאה',
    'הנקה משולבת': 'הנקה משולבת'
  };
  // Group data by age and measure, and construct the series data
  const transformedData = Object.keys(measuresMap).map((measureKey: any) => {
    const measure = measuresMap[measureKey];
    const dataForMeasure = apiData.filter((item: any) => item.measure === measure );
    const seriesData = ages.map((age: any) => {
      const dataForAgeAndMeasure = dataForMeasure.find((item: any) => item.age === age);
      const value = dataForAgeAndMeasure ? dataForAgeAndMeasure.populationRate : 0; // Default value if no data found
      return {
        name: age.toString(),
        value: value
      };
    });

    return {
      name: measure,
      series: seriesData
    };
  });
  console.log(transformedData)
  return transformedData;
}
// In your chart component
yAxisTickFormatting(value: number):string {
  return `${value}%`;
}
}