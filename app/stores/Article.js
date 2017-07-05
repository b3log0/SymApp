import { observable, action } from 'mobx';

class Article {
  @observable title;
  @observable content;
  @observable tags;
  @observable oId;

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = '';
    this.oId = '';
  }

  @action setTitle = (title) => {
    this.title = title;
  };

  @action setContent = (content) => {
    this.content = content;
  };

  @action setTags = (tags) => {
    this.tags = tags;
  };

  @action setOId = (oId) => {
    this.oId = oId;
  };

}

const article = new Article();
export default article;
export { Article };
