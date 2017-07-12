import { observable, action } from 'mobx';

class Article {
  @observable title;
  @observable content;
  @observable tags;
  @observable tagObjs;
  @observable oId;
  @observable type;
  @observable authorName;
  @observable commentOriginalCommentId;

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = '';
    this.tagObjs = [];
    this.oId = '';
    this.authorName = '';
    this.type = 0; // 0: 帖子; 1: 小黑屋 ; 2: 同城广播 ; 3: 思绪
    this.commentOriginalCommentId = '';
  }

  @action preSet = ({ oId, type, authorName }) => {
    this.oId = oId;
    this.type = type;
    this.authorName = authorName;
  };

}

const article = new Article();
export default article;
export { Article };
