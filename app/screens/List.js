import React, {Component} from 'react';
import {
    FlatList,
    Text,
    View,
    Button
} from 'react-native';

import articleList from '../styles/article-list'
import Article from '../actions/Articles';

class ListScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={articleList.container}>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={({item}) => <View>
                        <Text style={articleList.item}>{item.key}</Text>
                        <Button
                            onPress={() => this.props.navigation.navigate('Detail', {user: 'Vanessa'})}
                            title="Chat with Lucy"
                        />
                    </View>}
                />
            </View>
        );
    }
}

// Article.getList();

export default ListScreen;