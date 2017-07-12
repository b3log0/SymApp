import { action } from 'mobx';

class Article {

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = '';
    this.tagObjs = [];
    this.oId = '';
    this.authorName = '';
    this.type = 0; // 0: 帖子; 1: 小黑屋 ; 2: 同城广播 ; 3: 思绪
    this.commentOriginalCommentId = '';
    this.rewardPoint = '';
    this.rewardContent = '';
  }

  @action preSet = ({ oId, type, authorName }) => {
    this.oId = oId;
    this.type = type;
    this.authorName = authorName;
  };

  @action setCommentOriginalCommentId = (commentOriginalCommentId) => {
    this.commentOriginalCommentId = commentOriginalCommentId;
  };

  @action clearForm = () => {
    this.title = '';
    this.content = '';
    this.rewardPoint = '';
    this.rewardContent = '';
    this.type = 0;
    this.tags = '';
  }

  @action setForm = (data) => {
    this.title = data.title;
    this.content = data.content;
    this.rewardPoint = data.rewardPoint;
    this.rewardContent = data.rewardContent;
    this.tags = data.tags;
  };

}

const article = new Article();
export default article;
export { Article };
