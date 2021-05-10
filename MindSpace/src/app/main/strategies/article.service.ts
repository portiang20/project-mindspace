import { take, map, tap, switchMap } from 'rxjs/operators';
import { Article } from './article.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable, interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesList: Article[];

  private articles: Article[] = [
    {
      id: '001',
      title: 'Excitement title',
      shortContent: 'Excitement Demo Excitement Demo Excitement Demo Excitement Demo Excitement Demo',
      content:
        'Excitement content article Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content Excitement content.',
      tag: 'Excitement',
      type: 'happy',
      imgPath: '../../assets/strategiesImage/Excitement1.jpeg',
    },
    {
      id: '002',
      title: 'Peace title',
      shortContent: 'Peace Demo Peace Demo Peace Demo Peace Demo Peace Demo Peace Demo Peace Demo',
      content:
        'Peace content article Peace content Peace content Peace content Peace content Peace content Peace content Peace content Peace content Peace content Peace content Peace content Peace content Peace content.',
      tag: 'Peace',
      type: 'happy',
      imgPath: '../../assets/strategiesImage/Peace1.jpeg',

    },
    {
      id: '003',
      title: 'Panic title',
      shortContent:  'Panic Demo Panic Demo Panic Demo Panic Demo Panic Demo Panic Demo Panic Demo ',
      content:
        'Panic content article Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content Panic content.',
      tag: 'Panic',
      type: 'fear',
      imgPath: '../../assets/strategiesImage/Panic1.jpeg',

    },
    {
      id: '004',
      title: 'Dislike title',
      shortContent:
        'Dislike Demo Dislike Demo Dislike Demo Dislike Demo Dislike Demo Dislike Demo Dislike Demo ',
      content:
        'Dislike Content article Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content Dislike Content.',
      tag: 'Dislike',
      type: 'disgust',
      imgPath: '../../assets/strategiesImage/Dislike1.jpeg',

    },
  ];


  constructor() { }

  getAllArticles() {
    return [...this.articles];
  }

  getArticle(articleID: string) {
    return {
      ...this.articles.find(article => {
        return article.id === articleID;
      })
    };
  }
}
