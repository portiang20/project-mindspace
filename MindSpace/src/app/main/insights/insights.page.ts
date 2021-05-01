import { Component, OnInit } from '@angular/core';
import { Emotion } from '../emotion.model';
import { EmotionsService } from '../emotions.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {
  hashTags: Emotion[] = [];
  emotions: Emotion[] = [];
  emotionsSub: Subscription;
  awareness = {
    content: '',
    hashTag: '',
  };

  constructor(
    private emotionsService: EmotionsService,
    private route: Router
  ) {}

  ngOnInit() {
    this.emotionsSub = this.emotionsService.emotions.subscribe((emos) => {
      this.emotions = emos.sort((a, b) => b.times - a.times);

      this.hashTags = this.emotions.slice(0, 10);
      console.log(this.hashTags);
    });
  }

  // TODO: post #message to database
  onClickAddAwareness(content) {
    this.awareness.content = content;
    console.log(this.awareness);
    console.log('Awareness has been submit');

    this.route.navigateByUrl('main/tabs/explore');
  }

  onClickHashtag(tag) {
    this.awareness.hashTag = tag;
    console.log(this.awareness);
  }
}
