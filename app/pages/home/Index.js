import { StackNavigator } from 'react-navigation';

import Navigation from './Navigation';
import DetailScreen from '../Detail';

const IndexScreen = StackNavigator({
  Navigation: { screen: Navigation },
  Detail: { screen: DetailScreen }
});

export default IndexScreen;
