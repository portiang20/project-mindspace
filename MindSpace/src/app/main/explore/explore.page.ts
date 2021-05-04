import { Emotion } from './../emotion.model';
import { InsightsPage } from './../insights/insights.page';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  title: string = 'Explore XXX Emotion';
  insights = null;

  constructor(
    private route: Router,
    public modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  // show insights modal
  async showInsightsModal() {
    const modal = await this.modalCtrl.create({
      component: InsightsPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
    modal.onDidDismiss().then((res) => {
      this.insights = res.data;
    });
  }

  ngOnInit() {}
}
