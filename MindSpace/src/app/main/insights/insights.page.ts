import { Component, Input, OnInit } from '@angular/core';
import { Emotion } from '../emotion.model';
import { EmotionsService } from '../emotions.service';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss'],
})
export class InsightsPage implements OnInit {
  hashTags: Emotion[] = [];
  emotions: Emotion[] = [];
  emotionsSub: Subscription;
  awareness: string = '';
  @Input() hashtag;

  constructor(
    private emotionsService: EmotionsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.emotionsSub = this.emotionsService.emotions.subscribe((emos) => {
      this.emotions = emos.sort((a, b) => b.times - a.times);
      this.hashTags = this.emotions.slice(0, 10);
      console.log('Hashtags for today:', this.hashTags);
    });
  }

  onClickHashtag(tag: Emotion) {
    this.hashtag = tag;
  }

  // Post hashtag & awareness
  async onClickAddAwareness(content: string) {
    this.awareness = content;

    // TODO: post #hashtag + awareness to backend

    // dismiss this modal and deliver data to explore
    await this.modalCtrl.dismiss({
      hashtag: this.hashtag,
      awareness: this.awareness,
    });
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
