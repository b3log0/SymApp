import React, { PureComponent, PropTypes } from 'react';

import ArticleItem from './Article';
import CommentItem from './Comment';
import UserItem from './User';
import TagItem from './Tag';

class Item extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rowData: PropTypes.object.isRequired
  };

  render() {
    const rowData = this.props.rowData;

    if (typeof (rowData.commentArticleAuthorName) === 'string') {
      return <CommentItem navigation={this.props.navigation} rowData={rowData} />;
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
