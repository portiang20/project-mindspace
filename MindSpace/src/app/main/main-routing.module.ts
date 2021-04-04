import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: MainPage,
    children: [
      {
        path: 'explore/:id',
        loadChildren: () =>
          import('./explore/explore.module').then((m) => m.ExplorePageModule),
      },
      {
        path: 'explore',
        loadChildren: () =>
          import('./explore/explore.module').then((m) => m.ExplorePageModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'insights',
        loadChildren: () =>
          import('./insights/insights.module').then(
            (m) => m.InsightsPageModule
          ),
      },
      {
        path: 'strategies',
        loadChildren: () =>
          import('./strategies/strategies.module').then(
            (m) => m.StrategiesPageModule
          ),
      },
      {
        path: 'timeline',
        loadChildren: () =>
          import('./timeline/timeline.module').then(
            (m) => m.TimelinePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
