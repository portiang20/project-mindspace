import { Injectable } from '@angular/core';
import { Emotion } from './emotion.model';

@Injectable({
  providedIn: 'root',
})
export class EmotionsService {
  private _emotions: Emotion[] = [
    { id: 'e1', type: 'happy', name: 'Excitement', times: 23 },
    { id: 'e2', type: 'happy', name: 'Peace', times: 8 },
    { id: 'e1', type: 'sad', name: 'Disappointment', times: 14 },
  ];

  get emotions() {
    return [...this._emotions];
  }

  constructor() {}
}
