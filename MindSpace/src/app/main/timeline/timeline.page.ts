import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InsightService } from '../insights/insights.service';
import { EmotionsService } from '../emotions.service';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { ModalController } from '@ionic/angular';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Insight } from '../insights/insight.model';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})

export class TimelinePage implements OnInit {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  eventSource = [];
  viewTitle: string;
  isToday: boolean;
  selectedDate: Date;
  block = false;

  emotionsSub: Subscription;
  reflectionsSub: Subscription;

  private getReflection: Insight[];
  public matchedReflection: string[] = [];
  private ref_record = new BehaviorSubject<Insight[]>([]);

  constructor(
    public authService: AuthService,
    public modalCtrl: ModalController,
    private insightService: InsightService,
    private emotionsService: EmotionsService

  ) {}

  calendar = {
    mode: 'month' as CalendarMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      },
    },
  };

  // TODO:Load event log from database
  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
  }

  get reflections() {
    // Return this._emotions observable for subsciption
    return this.ref_record.asObservable();
  }

  passedDate(selectedDate){
    const date = new Date();
    const newDate = moment(selectedDate).format('YYYY-MM-DD');

    if (this.matchedReflection.length != 0)
    {
      this.matchedReflection = [];
    }

    if(selectedDate < date){
      this.block = true;
    }
    else { this.block = false;}

    for (var i = 0; i < this.getReflection.length; i++) {
      if (this.getReflection[i].posted_date == newDate) {
        this.matchedReflection.push(this.getReflection[i].reflection);
      }
    }
  }


  today() {
    this.calendar.currentDate = new Date();
    console.log('Date:', this.calendar.currentDate);
  }

  slidePrev() {
    this.myCalendar.slidePrev();
    this.myCalendar.update();
  }

  slideNext() {
    this.myCalendar.slideNext();
    this.myCalendar.update();
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    return events;
  }

  ngOnInit() {
    this.reflectionsSub = this.ref_record.subscribe((insights) => {
      console.log(insights);
      this.getReflection = insights;
      console.log(this.getReflection);
    })
  }

  ionViewWillEnter() {
    //This will update _emotions, which will then trigger the above subscription
    this.insightService.updateReflectionsFromServer().subscribe((records: Insight[]) => {
      console.log(records);
      this.ref_record.next(records);
    });
  }

  removeEvents() {
    this.eventSource = [];
  }

  ngOnDestroy() {
    // Unsubscribe the unused subscription to prevent memory lost
    if (this.reflectionsSub) {
      this.reflectionsSub.unsubscribe;
    }

  }
}
