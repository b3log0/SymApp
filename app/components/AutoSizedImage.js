import React, { Component, PropTypes } from 'react';
import {
  Image,
  Dimensions
} from 'react-native';

class AutoSizedImage extends Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    source: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.style.width || 1,
      height: this.props.style.height || 1
    };
  }

  componentDidMount() {
    Image.getSize(this.props.source.uri, (w, h) => {
      this.setState({ width: w, height: h });
    });
  }

  render() {
    const width = this.props.style.width;
    const finalSize = {};

    if (this.state.width > width) {
      finalSize.width = width;
      finalSize.height = this.state.height * (width / this.state.width);
    }

    const style = Object.assign(
      this.props.style,
      this.state,
      finalSize
    );

    return (<Image
      style={style}
      source={this.props.source}
      resizeMethod={'resize'}
    />);
  }
}

export default AutoSizedImage;
