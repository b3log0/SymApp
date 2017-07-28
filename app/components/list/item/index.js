import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ArticleItem from './Article';
import CommentItem from './Comment';
import ArticleCommentItem from './ArticleComment';
import UserItem from './User';
import TagItem from './Tag';
import NotificationItem from './Notification';
import NotificationMsgItem from './NotificationMsg';

class Item extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rowData: PropTypes.object.isRequired
  };

  render() {
    const rowData = this.props.rowData;
    if (typeof (rowData.dataId) === 'string' || rowData.dataType === 2) {
      return <NotificationItem navigation={this.props.navigation} rowData={rowData} />;
    }

    if (typeof (rowData.dataType) === 'number' && rowData.dataType !== 2) {
      return <NotificationMsgItem navigation={this.props.navigation} rowData={rowData} />;
    }

    if (typeof (rowData.commentArticleAuthorName) === 'string') {
      return <CommentItem navigation={this.props.navigation} rowData={rowData} />;
    }

    if (typeof (rowData.commentAuthorThumbnailURL) === 'string') {
      return <ArticleCommentItem navigation={this.props.navigation} rowData={rowData} />;
    }

    if (typeof (rowData.userNo) === 'number') {
      return <UserItem navigation={this.props.navigation} rowData={rowData} />;
    }

    if (typeof (rowData.tagTitle) === 'string') {
      return <TagItem navigation={this.props.navigation} rowData={rowData} />;
    }

    return <ArticleItem rowData={rowData} navigation={this.props.navigation} />;
  }
}

export default Item;
