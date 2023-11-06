export type apiModelChart1 = {
    year: number;
    age: number;
    populationRate: number;
    measure: string;
    count: number;
};

export type SeriesData = {
    name: string;
    value: number;
};

export type TransformedDataItem = {
    name: string;
    series: SeriesData[];
};
export type TransformedData = TransformedDataItem[];

export   type MeasuresMap = {
    [key: string]: string;
  };

export type Year = {
    year:string
}