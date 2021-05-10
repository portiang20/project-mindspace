import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.html',
  styleUrls: ['./article.scss'],
})
export class ArticlePage implements OnInit {
  loadedArticle: Article;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router) {
    //console.log(this)
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('articleID')) {
        this.router.navigate(['/articles']);
        return;
      }
      const articleID = paramMap.get('articleID');
      this.loadedArticle = this.articleService.getArticle(articleID);
    });
  }
}
