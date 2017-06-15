import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { utils, list } from '../../styles';

class ListItem extends PureComponent {

  render() {
    // const rowData = this.props.rowData;
    //
    // let thumbanilImg = <Text style={utils.empty} />;
    // if (rowData.articleThumbnailURL !== '') {
    //   thumbanilImg = (<Image
    //     style={list.thumbnailImg}
    //     source={{ uri: rowData.articleThumbnailURL }}
    //   />);
    // }
    // return (
    //   <View style={list.normal}>
    //     <TouchableOpacity onPress={this.props.navigation.navigate('Article', { oId: rowData.oId })}>
    //       {thumbanilImg}
    //       <Text style={list.title}>{rowData.articleTitle}</Text>
    //       <View style={list.info} >
    //         <Image
    //           source={{ uri: rowData.articleAuthorThumbnailURL48 }}
    //           style={list.avatar}
    //         />
    //         <Text style={list.infoText}>
    //           {rowData.articleAuthorName} {rowData.cmtTimeAgo}发帖
    //       </Text>
    //       </View>
    //       <Text style={list.content}>{rowData.articlePreviewContent}</Text>
    //     </TouchableOpacity>
    //   </View>
    // );

    return (<Text>ssss</Text>);
  }
}

export default ListItem;
