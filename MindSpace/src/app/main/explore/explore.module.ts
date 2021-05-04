import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { ExplorePage } from './explore.page';
import { InsightsPage } from './../insights/insights.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExplorePageRoutingModule],
  declarations: [ExplorePage, InsightsPage],
})
export class ExplorePageModule {}
