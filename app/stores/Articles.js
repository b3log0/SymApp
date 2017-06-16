import { ListView } from 'react-native';
import { observable, computed, action } from 'mobx';

class Articles {
  @observable list
  @observable isLoading

  constructor() {
    this.list = [];
    this.isLoading = true;
  }

  @action setList = (list) => {
    this.list = list;
  }

  @action setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  }

  @computed get listDS() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return ds.cloneWithRows(this.list.slice());
  }
}


const articles = new Articles();
export default articles;
export { Articles };
