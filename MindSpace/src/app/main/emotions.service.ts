import { EmotionsComponent } from './emotions.component';
import { Injectable, Input } from '@angular/core';
import { Emotion } from './emotion.model';

@Injectable({
  providedIn: 'root',
})
export class EmotionsService {
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

  get emotions() {
    return [...this._emotions];
  }

  constructor() {}
}
