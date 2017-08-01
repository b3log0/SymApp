import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Dimensions,
} from 'react-native';

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

  componentWillMount() {
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
    />);
  }
}

export default AutoSizedImage;
