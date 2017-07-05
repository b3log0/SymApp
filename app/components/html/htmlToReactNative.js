import React from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';
import htmlparser from 'htmlparser2-without-node-native';
import entities from 'entities';

import AutoSizedImage from '../AutoSizedImage';
import { content, utils } from '../../styles/index';

const htmlToReactNative = (rowHTML, opts, cb) => {
  const LINE_BREAK = '\n';
  const BULLET = '\u2022 ';

  const parseDom = (dom, parent) => {
    if (!dom) {
      return null;
    }

    return dom.map((node, index) => {
      const key = node.type + index;

      // text
      if (node.type === 'text') {
        if (node.data.trim() === '') {
          return null;
        }
        return (
          <Text key={key} style={parent ? content[parent.name] : null}>
            {entities.decodeHTML(node.data)}
          </Text>
        );
      }

      // br
      if (node.name === 'br') {
        return (
          <Text key={key}>{LINE_BREAK}</Text>
        );
      }

      // just only p
      if (node.name === 'p' && node.children.length === 1 && node.children[0].type === 'text') {
        return (
          <Text key={key} style={content[node.name]}>
            {entities.decodeHTML(node.children[0].data)}
          </Text>
        );
      }

      // img
      if (node.name === 'img') {
        if (node.attribs.class === 'emoji') {
          return (<Image
            key={key}
            source={{ uri: node.attribs.src }}
            style={content.emoji}
          />);
        }

        return (<AutoSizedImage
          key={key}
          source={{ uri: node.attribs.src }}
          style={content.img}
        />);
      }

      // a
      if (node.name === 'a' && node.attribs && node.attribs.href) {
        return (
          <Text key={key} onPress={() => opts.linkHandler(entities.decodeHTML(node.attribs.href))}>
            {parseDom(node.children, node)}
          </Text>
        );
      }

      // list
      let liItemPrefix = null;
      if (node.name === 'li') {
        if (parent.name === 'ol') {
          liItemPrefix = `${index + 1}. `;
        } else if (parent.name === 'ul') {
          liItemPrefix = BULLET;
        }
      }

      // block element
      if (node.name === 'blockquote' || node.name === 'ul' || node.name === 'pre' || node.name === 'ol') {
        return (
          <View key={key} style={content[node.name]}>
            {parseDom(node.children, node)}
          </View>
        );
      }

      // inline element
      return (
        <Text key={key}>
          {liItemPrefix}
          {parseDom(node.children, node)}
        </Text>
      );
    });
  };

  const handler = new htmlparser.DomHandler((err, dom) => {
    cb(parseDom(dom));
  });

  const parser = new htmlparser.Parser(handler);
  parser.write(rowHTML);
  parser.done();
};

export default htmlToReactNative;
