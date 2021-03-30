import { Component, OnInit } from '@angular/core';
import { Emotion } from '../emotion.model';
import { EmotionsService } from '../emotions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loadedEmotions: Emotion[];

  constructor(private emotionsService: EmotionsService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadedEmotions = this.emotionsService.emotions;
  }
}
