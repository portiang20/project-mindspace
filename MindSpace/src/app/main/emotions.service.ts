import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EmotionsComponent } from './emotions.component';
import { Injectable, Input } from '@angular/core';
import { Emotion } from './emotion.model';
import { Record } from './record.model';

@Injectable({
  providedIn: 'root',
})
export class EmotionsService {
  // Use BehaviorSubject for making _emotions observable
  private _emotions = new BehaviorSubject<Emotion[]>([
    { id: 'e1', type: 'happy', name: 'Excitement', times: 23 },
    //{ id: 'e2', type: 'happy', name: 'Peace', times: 18 },
    { id: 'e3', type: 'sad', name: 'Disappointment', times: 14 },
    { id: 'e4', type: 'anger', name: 'Fury', times: 12 },
    //{ id: 'e5', type: 'fear', name: 'Anxiety', times: 11 },
    { id: 'e6', type: 'fear', name: 'Panic', times: 9 },
    { id: 'e7', type: 'disgust', name: 'Dislike', times: 6 },
  ]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  updateEmotionsFromServer() {
    this.http
      .get(this.authService.djangoUrl + 'api/record/emotions')
      .pipe(
        take(1),
        map((records: Record[]) => {
          //First, convert from server format to:
          //  {'emotion1':[freq1], 'emotion2':[freq2], ...}
          let emotionsCount = records.reduce((emotions, record) => {
            emotions[record.emotion]
              ? emotions[record.emotion]++
              : (emotions[record.emotion] = 1);
            return emotions;
          }, {});

          console.log(emotionsCount);
          //Then, convert {'emotion1':[freq1], 'emotion2':[freq2], ...} to:
          //  [{id:1, name:'emotion1', times: [freq1]},
          //   {id:2, name:'emotion2', times: [freq2]}]
          return Object.keys(emotionsCount).map((emotion, index) => {
            return {
              id: index.toString(),
              name: emotion,
              times: emotionsCount[emotion],
            };
          });
        })
      )
      .subscribe((results) => {
        // TODO: add type to returned results above and save it to _emotions
        console.log(results);
        let updatedEmotions: Emotion[] = results.map((result) => {
          let type = '';
          if (result.name == 'joy') {
            type = 'happy';
          }
          if (result.name == 'sadness') {
            type = 'sad';
          }
          if (result.name == 'anger') {
            type = 'anger';
          }
          if (result.name == 'fear') {
            type = 'fear';
          }
          if (result.name == 'disgust') {
            type = 'disgust';
          }
          //TODO: add the remaining 23 emotions
          return { ...result, type };
        });

        // TODO: uncomment the following line to make the update effective
        //this._emotions.next(updatedEmotions);
      });
  }

  get emotions() {
    // Return this._emotions observable for subsciption
    return this._emotions.asObservable();
  }
}
