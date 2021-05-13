import { Emotion } from './../emotion.model';
import { Record } from '../record.model';
import { InsightsPage } from './../insights/insights.page';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import * as moment from 'moment';
import { EmotionsService } from '../emotions.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  title: string = 'Explore';
  insights = null;
  emoTitle: string;

  //Selected date range
  selectedFrom: moment.Moment;
  selectedTo: moment.Moment;

  //Retrieved emotion records
  allRecords: Record[] = [];

  //Times of selected emotion and trigger keywords freqency within time range
  emotionTimesInTime = {}; // {'date1':freq, 'date2':freq, ...} where date is in the format of YYYY-MM-DD
  triggerKeywordsInTime = {}; // {'emotion1':freq, 'emotion2':freq, ...}

  constructor(
    private route: Router,
    public modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private activeRoute: ActivatedRoute,
    private emotionsService: EmotionsService
  ) {}

  // Set emoTitle to be the most significant emotion if it is undefined
  setEmoTitleIfNotSet() {
    //compute the emotion count from the selected Record
    let emotionsCount = this.allRecords.reduce((emotions, selectedRecord) => {
      emotions[selectedRecord.emotion]
        ? emotions[selectedRecord.emotion]++
        : (emotions[selectedRecord.emotion] = 1);
      return emotions;
    }, {});

    //if emoTitle is undefined, set the most intense one to be emoTitle
    if (this.emoTitle === undefined) {
      let max = 0;
      let maxEmotion = 'joy'; //Set default to be joy
      for (let emotion in emotionsCount) {
        if (emotionsCount[emotion] > max) {
          max = emotionsCount[emotion];
          maxEmotion = emotion;
        }
      }
      this.emoTitle = maxEmotion;
    }
  }

  // This function should be triggered after selectedFrom and selectedTo are updated
  updateSelected() {
    //filtered by all data by selected date range and emoTitle
    let selectedRecords = this.allRecords.filter((record) => {
      let posted_date_obj: moment.Moment = moment(
        record.posted_date,
        'YYYY-MM-DD'
      );
      return (
        posted_date_obj.isSameOrAfter(this.selectedFrom, 'day') &&
        posted_date_obj.isSameOrBefore(this.selectedTo, 'day') &&
        record.emotion == this.emoTitle
      );
    });
    console.log(selectedRecords);

    //get keywords and their frequency within the time range
    this.triggerKeywordsInTime = {};
    for (let i = 0; i < selectedRecords.length; ++i) {
      for (
        let j = 0;
        j < selectedRecords[i].trigger_keyword_frequency.length;
        ++j
      ) {
        let keyword = selectedRecords[i].trigger_keyword_frequency[j].keyword;
        let frequency =
          selectedRecords[i].trigger_keyword_frequency[j].frequency;
        if (keyword in this.triggerKeywordsInTime) {
          this.triggerKeywordsInTime[keyword] += frequency;
        } else {
          this.triggerKeywordsInTime[keyword] = frequency;
        }
      }
    }
    console.log(this.triggerKeywordsInTime);

    //get times of selected emotions within the time range
    let initialEmotionTimes = {};
    let readingDate = this.selectedFrom.clone();
    while (readingDate.isSameOrBefore(this.selectedTo, 'day')) {
      let readingDateString = readingDate.format('YYYY-MM-DD');
      initialEmotionTimes[readingDateString] = 0;
      readingDate = readingDate.add(1, 'd');
    }
    console.log(initialEmotionTimes);
    this.emotionTimesInTime = selectedRecords.reduce((emotions, record) => {
      ++emotions[record.posted_date];
      return emotions;
    }, initialEmotionTimes);
    console.log(this.emotionTimesInTime);
  }

  ngOnInit() {
    this.selectedTo = moment();
    this.selectedFrom = moment().subtract(6, 'd');

    //For testing, remove it after updating selected date range functionalities is done
    this.selectedTo = moment('2021-03-31', 'YYYY-MM-DD');
    this.selectedFrom = moment('2021-03-25', 'YYYY-MM-DD');
    /////////////////////////////////////////////////////////////

    this.activeRoute.params.subscribe((param) => {
      this.emoTitle = param['id'];
    });

    //This function will be triggered everytime when records are returned from server
    this.emotionsService.emotions.subscribe((records: Record[]) => {
      this.allRecords = records;
      this.setEmoTitleIfNotSet();
      this.updateSelected();
    });
  }

  ionViewWillEnter() {
    //This will update _emotions, which will then trigger the subscription of emotions in emotionService
    this.emotionsService.updateEmotionsFromServer();
  }

  // show insights modal
  async showInsightsModal() {
    const modal = await this.modalCtrl.create({
      component: InsightsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        emo: this.emoTitle,
      },
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      this.insights = res.data;
    });
  }
}
