import { Link as ExpoLink } from "expo-router";
import { ComponentProps } from "react";

import { styled, Text } from "tamagui";

type LinkProps = ComponentProps<typeof ExpoLink>;

const StyledText = styled(Text, {
  color: "$foreground",
  textDecorationLine: "underline",
  fontWeight: 500,
  pressStyle: {
    opacity: 0.5,
  },
});

export default function Link({ children, ...props }: LinkProps) {
  return (
    <ExpoLink {...props} asChild>
      <StyledText>{children}</StyledText>
    </ExpoLink>
  );
}
