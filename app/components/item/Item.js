import React, { PureComponent, PropTypes } from 'react';

import ArticleItem from './Article';
import CommentItem from './Comment';

class Item extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rowData: PropTypes.object.isRequired
  };

  render() {
    const rowData = this.props.rowData;

    if (typeof (rowData.articleTitle) === 'undefined') {
      return <CommentItem navigation={this.props.navigation} rowData={rowData} />;
    }

    return <ArticleItem rowData={rowData} navigation={this.props.navigation} />;
  }
}

export default Item;
