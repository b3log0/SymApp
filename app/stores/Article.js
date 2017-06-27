import { observable } from 'mobx';

class Article {
  @observable title
  @observable content
  @observable tags

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = '';
  }

}

const article = new Article();
export default article;
export { Article };
