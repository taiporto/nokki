import { ButtonProps, H1, H2, Image, Stack } from "tamagui";
import Button from "../Button";
import { Link } from "expo-router";

type EmptyStateProps = {
  topText: string;
  bottomText?: string;
  button?: {
    href?: string;
    action?: () => void;
    text: string;
    icon?: ButtonProps["icon"];
  };
};

export const EmptyState = ({
  topText,
  bottomText,
  button,
}: EmptyStateProps) => {
  const buttonComponent = button?.href ? (
    <Link href={button.href} asChild>
      <Button onPress={button.action} icon={button.icon}>
        {button.text}
      </Button>
    </Link>
  ) : (
    <Button onPress={button?.action} icon={button?.icon}>
      {button?.text}
    </Button>
  );

  return (
    <Stack gap={32} justifyContent="center" alignItems="center">
      <Stack gap={16} justifyContent="center" alignItems="center">
        <H1 fontSize="$5">{topText}</H1>
        <Image
          maxWidth={240}
          maxHeight={155}
          resizeMode="contain"
          source={require("../../../assets/empty_state.png")}
        />
        {!!bottomText && <H2 fontSize="$5">{bottomText}</H2>}
      </Stack>
      {!!button && buttonComponent}
    </Stack>
  );
};
