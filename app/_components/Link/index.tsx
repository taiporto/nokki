import { Link as ExpoLink } from "expo-router";
import { LinkProps as ExpoLinkProps } from "expo-router/build/link/Link";

import { useTheme } from "tamagui";

export default function Link(props: ExpoLinkProps) {
  const { tertiary } = useTheme();
  return <ExpoLink style={{ color: tertiary?.val() }} {...props} />;
}
