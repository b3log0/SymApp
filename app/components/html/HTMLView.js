import React, { Component, PropTypes } from 'react';
import {
  View
} from 'react-native';

import htmlToElement from './htmlToElement';

class HtmlView extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    addLineBreaks: PropTypes.bool,
    onLinkPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    addLineBreaks: false
  };

  constructor() {
    super();
    this.state = {
      element: null
    };
  }

  componentDidMount() {
    this.startHtmlRender(this.props.value);
  }

  startHtmlRender(value) {
    const opts = {
      addLineBreaks: this.props.addLineBreaks,
      linkHandler: this.props.onLinkPress
    };

    htmlToElement(value, opts, (err, element) => {
      this.setState({ element });
    });
  }

  render() {
    return <View>{this.state.element}</View>;
  }
}

export default HtmlView;
