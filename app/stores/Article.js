import { observable, action } from 'mobx';

class Article {
  @observable title;
  @observable content;
  @observable tags;
  @observable oId;
  @observable type;
  @observable authorName;

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = '';
    this.oId = '';
    this.authorName = '';
    this.type = 0; // 0: 帖子; 1: 小黑屋 ; 2: 同城广播 ; 3: 思绪
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

  @action setType = (type) => {
    this.type = type;
  };

  @action setAuthorName = (authorName) => {
    this.authorName = authorName;
  };

}

const article = new Article();
export default article;
export { Article };
