import { observable, action } from 'mobx';

class Article {
  @observable title;
  @observable content;
  @observable tags;

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = '';
  }

  @action setTitle = (title) => {
    this.title = title;
  }

  @action setContent = (content) => {
    this.content = content;
  }

  @action setTags = (tags) => {
    this.tags = tags;
  }

}

const article = new Article();
export default article;
export { Article };
