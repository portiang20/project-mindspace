import { Articles } from './articles.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  articlesList: Articles[];

private _articles: Articles[] =[
  { title: 'Excitement title', content: 'Excitement Excitement Excitement Excitement Excitement Excitement', tag: 'Excitement', type:'happy', imgPath: '../../assets/strategiesImage/Excitement1.jpeg', articlePath: '#'},
  { title: 'Peace title', content: 'Peace Peace Peace Peace Peace Peace Peace Peace Peace Peace Peace', tag: 'Peace', type:'happy', imgPath: '../../assets/strategiesImage/Peace1.jpeg', articlePath: '#'},
  { title: 'Panic title', content: 'Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic Panic ', tag: 'Panic', type:'fear', imgPath: '../../assets/strategiesImage/Panic1.jpeg', articlePath: '#'},
  { title: 'Dislike title', content: 'Dislike Dislike Dislike Dislike Dislike Dislike Dislike Dislike Dislike Dislike ', tag: 'Dislike', type:'disgust', imgPath: '../../assets/strategiesImage/Dislike1.jpeg', articlePath: '#'},
];

get articles(){
  return [...this._articles];
}

  constructor() { }
}
