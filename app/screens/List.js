import React, {Component} from 'react';
import {
    FlatList,
    Text,
    View,
    Button,
    ActivityIndicator,
    ListView
} from 'react-native';

import articleList from '../styles/article-list'
import Article from '../actions/Articles';

class ListScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    };

    componentDidMount() {
        return Article.getList().then((response) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(response.data.articles),
            }, function () {
                // do something with new state
            });
        })
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.articleTitle}</Text>}
                />
            </View>
        );
    }
}

export default ListScreen;