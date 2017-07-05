import React, { Component, PropTypes } from 'react';
import {
  Image,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';

import { utils } from '../styles';

class AutoSizedImage extends Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    source: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.style.width,
      height: this.props.style.height,
      loading: true
    };
  }

  componentDidMount() {
    Image.getSize(this.props.source.uri, (w, h) => {
      this.setState({ width: w, height: h });
    });
  }

  render() {
    const { width } = Dimensions.get('window');
    const maxWidth = width - 20;
    const style = this.props.style;
    style.width = this.state.width;
    style.height = this.state.height;

    if (this.state.width > maxWidth) {
      style.width = maxWidth;
      style.height = this.state.height * (maxWidth / this.state.width);
    }

    return (<Image
      onLoadEnd={() => this.setState({ loading: false })}
      style={style}
      source={this.props.source}
      resizeMethod={'resize'}
    >
      {
        this.state.loading && Platform.OS === 'ios' ?
          <ActivityIndicator style={utils.verticalCenter} />
        : null
      }
    </Image>);
  }
}

export default AutoSizedImage;
