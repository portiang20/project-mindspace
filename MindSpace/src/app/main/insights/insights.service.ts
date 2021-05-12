import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { map, take, switchMap, catchError, tap  } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmotionsComponent } from '../emotions.component';
import { Injectable, Input } from '@angular/core';
import { Insight } from './insight.model';

@Injectable({
  providedIn: 'root',
})

export class InsightService {

  private ref_record = new BehaviorSubject<Insight[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  updateReflection(reflection: string, tag: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    let dataToUpdate = {
      "reflection": reflection,
      "tag": tag
    };

    return this.http.post(this.authService.djangoUrl + 'api/record/insights', dataToUpdate, httpOptions)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  updateReflectionsFromServer(){
    this.http
      .get(this.authService.djangoUrl + 'api/record/insights')
      .pipe(take(1))
      .subscribe((records: Insight[]) => {
        console.log(records);
        this.ref_record.next(records);
      })
  }

  get reflections() {
    // Return this._emotions observable for subsciption
    return this.ref_record.asObservable();
  }

}
