import { StackNavigator } from 'react-navigation';

import ListScreen from './List';
import DetailScreen from './Detail';

const IndexScreen = StackNavigator({
  List: { screen: ListScreen },
  Detail: { screen: DetailScreen }
});

export default IndexScreen;
