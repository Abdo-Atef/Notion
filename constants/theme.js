import { PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();
export const SIZES = {
  small: 8 * fontScale,
  medium: 13 * fontScale,
  large: 17 * fontScale,
  xLarge: 24 * fontScale,
};
export const COLORS = {
  bg: "#1e1e1f",
  cardBg: "#1F2937",
  second: '#0000004f',
  white: "#FFF",
  black: "#000",
  gray: "#ddd",
  gold:'#feb824',
  gold_light:'#ffdb70'
};
export const FONTS = {
  bold: "InterBold",
  semiBold: "InterSemiBold",
  medium: "InterMedium",
  regular: "InterRegular",
  light: "InterLight",
};