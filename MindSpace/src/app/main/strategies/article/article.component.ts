import { Article } from './../article.model';
import { ArticleService } from './../article.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  loadedArticle: Article;
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) {
    //console.log(this)
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('articleID')) {
        return;
      }
      const articleID = paramMap.get('articleID');
      this.loadedArticle = this.articleService.getArticle(articleID)
    })
}
}
