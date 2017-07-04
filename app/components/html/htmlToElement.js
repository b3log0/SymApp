import React, { PropTypes } from 'react';
import {
  Text,
  Image
} from 'react-native';
import htmlparser from 'htmlparser2-without-node-native';
import entities from 'entities';

import { list, utils, content } from '../../styles/index';
import AutoSizedImage from './AutoSizedImage';

const LINE_BREAK = '\n';
const PARAGRAPH_BREAK = '\n\n';
const BULLET = '\u2022 ';

const Img = (props) => {
  const width = Number(props.attribs.width) || Number(props.attribs['data-width']) || 0;
  const height = Number(props.attribs.height) || Number(props.attribs['data-height']) || 0;

  const imgStyle = {
    width,
    height
  };
  const source = {
    uri: props.attribs.src,
    width,
    height
  };
  return (
    <AutoSizedImage source={source} style={imgStyle} />
  );
};

Img.propTypes = {
  attribs: PropTypes.object.isRequired
};

export default function htmlToElement(rawHtml, opts, done) {
  function domToElement(dom, parent) {
    if (!dom) return null;

    return dom.map((node, index, li) => {
      const key = node.type + index;

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

      if (node.type === 'tag') {
        if (node.name === 'img') {
          if (node.attribs.class === 'emoji') {
            return (<Image
              key={key}
              source={{ uri: node.attribs.src }}
              style={[list.avatar, utils.emoji]}
            />);
          }
          return (
            <Img key={key} attribs={node.attribs} />
          );
        }

        let linkPressHandler = null;
        if (node.name === 'a' && node.attribs && node.attribs.href) {
          linkPressHandler = () => opts.linkHandler(entities.decodeHTML(node.attribs.href));
        }

        let linebreakBefore = null;
        let linebreakAfter = null;
        if (opts.addLineBreaks) {
          switch (node.name) {
            case 'pre':
              linebreakBefore = LINE_BREAK;
              break;
            case 'p':
              if (index < li.length - 1) {
                linebreakAfter = PARAGRAPH_BREAK;
              }
              break;
            case 'br':
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
              linebreakAfter = LINE_BREAK;
              break;
            default:
              break;
          }
        }

        let liItemPrefix = null;
        if (node.name === 'li') {
          if (parent.name === 'ol') {
            liItemPrefix = `${index + 1}. `;
          } else if (parent.name === 'ul') {
            liItemPrefix = BULLET;
          }
        }

        return (
          <Text key={key} onPress={linkPressHandler}>
            {linebreakBefore}
            {liItemPrefix}
            {domToElement(node.children, node)}
            {linebreakAfter}
          </Text>
        );
      }

      return null;
    });
  }

  const handler = new htmlparser.DomHandler((err, dom) => {
    if (err) done(err);
    done(null, domToElement(dom));
  });
  const parser = new htmlparser.Parser(handler);
  parser.write(rawHtml);
  parser.done();
}

