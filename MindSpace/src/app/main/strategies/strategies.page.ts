import { Component, OnInit } from '@angular/core';
import { Articles } from './../../articles.model';
import { ArticlesService } from './../../articles.service';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.page.html',
  styleUrls: ['./strategies.page.scss'],
})
export class StrategiesPage implements OnInit {
  loadedArticles: Articles[];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadedArticles = this.articlesService.articles;
  }
}
