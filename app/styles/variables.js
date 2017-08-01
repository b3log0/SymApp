const COLOR = {
  blue: '#4285f4',
  blueLight: '#dbedff',
  blueLighter: '#f1f7fe',
  red: '#d23f31',
  redLight: '#ffdce0',
  green: '#569e3d',
  fadeLight: '#f2f2f2',
  fade: '#999',
  gray: '#666',
  black: '#3b3e43',
  blackText: '#212121',
  blackLight: '#616161'
};

const THEME = {
  primary: COLOR.black,
  accent: COLOR.red,
  secondary: COLOR.blackLight,
  info: COLOR.blueLighter,
  warning: undefined,
  error: COLOR.redLight,
  success: COLOR.blueLight
};

// Fonts
// $font-family-base: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
// "Hiragino Sans GB", "Microsoft Yahei", sans-serif !default;
// $font-family-code: mononoki, Consolas, "Liberation Mono", Menlo, Courier, monospace !default;

// shadow
// $shadow-tip: 0 1px 2px rgba(0,0,0,.2) !default;

export default {
  COLOR,
  THEME
};
