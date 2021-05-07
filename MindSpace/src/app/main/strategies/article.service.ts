import { take, map, tap, switchMap } from 'rxjs/operators';
import { Article } from './article.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  //articlesList: Article[];

  private _article: Article[] = [
    {
      title: 'Excitement title',
      content:
        'Excitement Excitement Excitement Excitement Excitement Excitement',
      tag: 'Excitement',
      type: 'happy',
      imgPath: '../../assets/strategiesImage/Excitement1.jpeg',
      articleID: '001',
    },
    {
      title: 'Peace title',
      content:
        'Peace Peace Peace Peace Peace Peace Peace Peace Peace Peace Peace',
      tag: 'Peace',
      type: 'happy',
      imgPath: '../../assets/strategiesImage/Peace1.jpeg',
      articleID: '002',
    },
    {
      title: 'Panic title',
      content:
        'Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic ',
      tag: 'Panic',
      type: 'fear',
      imgPath: '../../assets/strategiesImage/Panic1.jpeg',
      articleID: '003',
    },
    {
      title: 'Dislike title',
      content:
        'Dislike Dislike Dislike Dislike Dislike Dislike Dislike Dislike Dislike Dislike ',
      tag: 'Dislike',
      type: 'disgust',
      imgPath: '../../assets/strategiesImage/Dislike1.jpeg',
      articleID: '004',
    },
  ];


  constructor() { }

  getAllArticle() {
    return [...this._article];
  }

  getArticle(articleID: string) {
    return {
      ...this._article.find(article => {
        return articleID === articleID;
      })
    };
  }
}
