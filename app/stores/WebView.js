import { observable, action } from 'mobx';

class WebView {
  @observable scrollEnabled

  constructor() {
    this.scrollEnabled = true;
  }

  @action setScrollEnabled = (scrollEnabled) => {
    this.scrollEnabled = scrollEnabled;
  }
}

const webview = new WebView();
export default webview;
export { WebView };
