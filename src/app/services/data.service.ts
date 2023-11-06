import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://datadashboard.health.gov.il/api/checkup/nursing')
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return [];
      })
    );
  }
  getDataforChart2(){
    return this.http.get('https://datadashboard.health.gov.il/api/checkup/nursing')
  }
  getDataForChat3(){
    return this.http.get('https://datadashboard.health.gov.il/api/experienceInstitutes/surveyPatientExperienceVariables')
  }
}