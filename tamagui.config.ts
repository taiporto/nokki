import { config } from "@tamagui/config/v3";
import {
  CreateTamaguiProps,
  createFont,
  createTamagui,
  createTokens,
} from "tamagui";

const colorTokens = createTokens({
  color: {
    primary: "#913FAD",
    secondary: "#18031F",
    tertiary: "#18031F",
    background: "#F6F6F6",
    foreground: "#18031F",
    purple100: "#ECD8F3",
    purple200: "#D5A6E5",
    purple300: "#913FAD",
    purple400: "#761B96",
    purple500: "#4D0965",
    negative: "#C22222",
    positive: "#469C1D",
    warning: "#EAC02D",
    neutral100: "#E8E8E9",
    neutral200: "#DDDDDD",
    neutral300: "#C7C7C7",
    neutral400: "#B0B0B0",
    neutral500: "#969399",
    neutral600: "#757376",
    neutral700: "#525053",
    neutral800: "#2C2A2E",
    neutral900: "#222123",
  },
  size: {},
  space: {},
  font: {},
  radius: {},
  zIndex: {},
});

const interFont = createFont({
  family: "Inter",
  size: {
    1: 11,
    2: 12,
    3: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
  },
  lineHeight: config.fonts.body.lineHeight,
  weight: config.fonts.body.weight,
  letterSpacing: config.fonts.body.letterSpacing,
  face: {
    normal: { normal: "Inter" },
    bold: { normal: "InterBold" },
    400: { normal: "Inter" },
    500: { normal: "InterMedium" },
  },
});

const darkerFont = createFont({
  family: "DarkerGrotesque",
  size: {
    1: 11,
    2: 12,
    3: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
  },
  lineHeight: config.fonts.heading.lineHeight,
  weight: config.fonts.heading.weight,
  letterSpacing: config.fonts.heading.letterSpacing,
  face: {
    normal: { normal: "DarkerGrotesque-Regular" },
    bold: { normal: "DarkerGrotesque-Bold" },
    400: { normal: "DarkerGrotesque-Regular" },
    500: { normal: "DarkerGrotesque-Medium" },
    600: { normal: "DarkerGrotesque-SemiBold" },
    700: { normal: "DarkerGrotesque-Bold" },
  },
});

const customTamaguiConfig = {
  ...config,
  tokens: {
    ...colorTokens,
    size: config.tokens.size,
    space: config.tokens.space,
    radius: config.tokens.radius,
    zIndex: config.tokens.zIndex,
  },
  fonts: {
    body: interFont,
    heading: darkerFont,
  },
};

const tamaguiConfig = createTamagui(customTamaguiConfig as CreateTamaguiProps);

export { tamaguiConfig };
