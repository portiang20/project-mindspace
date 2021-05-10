import { Article } from './../article.model';
import { Component, OnInit, Input,  } from '@angular/core';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
})
export class ArticleListItemComponent implements OnInit {

  @Input() ArticleListItem: Article;

  constructor() { }

  ngOnInit() {}

}
