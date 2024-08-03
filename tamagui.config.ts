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

const fontInter = createFont({
  family: "Inter",
  size: {
    xxs: 11,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  face: {
    400: { normal: "Inter_400Regular" },
    500: { normal: "Inter_500Medium" },
  },
});

const fontDarker = createFont({
  family: "Darker Grotesque",
  size: {
    xxs: 11,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  face: {
    400: { normal: "DarkerGrotesque_400Regular" },
    500: { normal: "DarkerGrotesque_500Medium" },
    600: { normal: "DarkerGrotesque_600SemiBold" },
    700: { normal: "DarkerGrotesque_700Bold" },
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
  ...fontInter,
  ...fontDarker,
  fonts: {
    heading: fontDarker,
    darker: fontDarker,
  },
};

const tamaguiConfig = createTamagui(customTamaguiConfig as CreateTamaguiProps);

export { tamaguiConfig };
