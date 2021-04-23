import { Component, OnInit, OnDestroy } from '@angular/core';
import { Emotion } from '../emotion.model';
import { EmotionsService } from '../emotions.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  name: string = '';
  emotionsSub: Subscription;
  loadedEmotions: Emotion[] = [];
  topFiveEmotions: Emotion[] = [];

  circlesPos = [
    { top: '10%', left: '37%' },
    { top: '30%', left: '18%' },
    { top: '30%', left: '56%' },
    { top: '56%', left: '50%' },
    { top: '56%', left: '27%' },
  ];

  constructor(
    private emotionsService: EmotionsService,
    public authService: AuthService
  ) {
    if (authService.isLoggedIn) {
      this.name = authService.userData.displayName || 'Dear';
    }
  }

  ngOnInit() {
    //Now emotions becomes an observable object
    //  with .subscribe(), the callback function will run everytime when _emotions is updated
    this.emotionsSub = this.emotionsService.emotions.subscribe((emotions) => {
      emotions = emotions.sort((a, b) => b.times - a.times);
      this.loadedEmotions = emotions.map((emotion) => {
        ///
        let transformed_size = 25 + emotion.times/1.5 + '%';
        ///
        return { ...emotion, size: transformed_size };
      });
      this.topFiveEmotions = this.loadedEmotions.slice(0, 5);
    });
  }

  ionViewWillEnter() {
    //This will update _emotions, which will then trigger the above subscription
    this.emotionsService.updateEmotionsFromServer();
  }

  ngOnDestroy() {
    // Unsubscribe the unused subscription to prevent memory lost
    if (this.emotionsSub) {
      this.emotionsSub.unsubscribe;
    }
  }
}
