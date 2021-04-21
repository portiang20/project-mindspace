import { AuthService } from 'src/app/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EmotionsComponent } from './emotions.component';
import { Injectable, Input } from '@angular/core';
import { Emotion } from './emotion.model';
import { Record } from './record.model';

@Injectable({
  providedIn: 'root',
})
export class EmotionsService {
  //This is the processed record for rendering use
  emotionsList: Emotion[];

  // TODO: 1 read data 2 category into type 3 sort by times
  private _emotions: Emotion[] = [
    { id: 'e1', type: 'happy', name: 'Excitement', times: 23 },
    //{ id: 'e2', type: 'happy', name: 'Peace', times: 18 },
    { id: 'e3', type: 'sad', name: 'Disappointment', times: 14 },
    { id: 'e4', type: 'anger', name: 'Fury', times: 12 },
    //{ id: 'e5', type: 'fear', name: 'Anxiety', times: 11 },
    { id: 'e6', type: 'fear', name: 'Panic', times: 9 },
    { id: 'e7', type: 'disgust', name: 'Dislike', times: 6 },
  ];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.http
      .get(this.authService.djangoUrl + 'api/record/emotions')
      .pipe(
        take(1),
        map((records: Record[]) => {
          let emotionsCount = records.reduce((emotions, record) => {
            emotions[record.emotion]
              ? emotions[record.emotion]++
              : (emotions[record.emotion] = 1);
            return emotions;
          }, {});

          console.log(emotionsCount);
          //Following maps {'emotion1':[freq1], 'emotion2':[freq2], ...} to:
          //  [{id:1, name:'emotion1', times: [freq1]},
          //   {id:2, name:'emotion2', times: [freq2]}]
          return Object.keys(emotionsCount).map((emotion, index) => {
            return {
              id: index,
              name: emotion,
              times: emotionsCount[emotion],
            };
          });
        })
      )
      .subscribe((results) => {
        // TODO: add type to returned results above and save it to _emotions
        console.log(results);
        // this._emotions = results.map((result) => {
        //  if (result.name == 'xxx'){type = 'xxx'}
        //  return {...result, type:xxx}
        //})
      });
  }

  get emotions() {
    return [...this._emotions];
  }
}
