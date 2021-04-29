import { HomePage } from './../home/home.page';
import { Component, OnInit } from '@angular/core';
import { Emotion } from '../emotion.model';
import { EmotionsService } from '../emotions.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {
  hashTags: Emotion[] = [];
  emotions: Emotion[] = [];
  emotionsSub: Subscription;
  loadedEmotions: Emotion[] = [];

  constructor(private emotionsService: EmotionsService) {}

  ngOnInit() {
    this.emotionsSub = this.emotionsService.emotions.subscribe((emotions) => {
      emotions = emotions.sort((a, b) => b.times - a.times);
      this.loadedEmotions = emotions.map((emotion) => {
        ///
        let transformed_size = 25 + emotion.times / 1.5 + '%';
        ///
        return { ...emotion, size: transformed_size };
      });
      this.hashTags = this.loadedEmotions.slice(0, 5);
      console.log(this.hashTags);
    });
  }

  onClickAdd() {
    console.log('Submit ');
  }
}
