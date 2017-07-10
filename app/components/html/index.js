import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';

import htmlToReactNative from './htmlToReactNative';

class HTML extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
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
    this.startHtmlRender(this.props.html);
  }

  startHtmlRender(html) {
    const opts = {
      addLineBreaks: this.props.addLineBreaks,
      linkHandler: this.props.onLinkPress
    };

    htmlToReactNative(html, opts, (element) => {
      this.setState({ element });
    });
  }

  render() {
    return <View>{this.state.element}</View>;
  }
}

export default HTML;
