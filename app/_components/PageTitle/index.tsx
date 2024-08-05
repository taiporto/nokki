import { H1, Stack, Text } from "tamagui";

type PageTitleProps = {
  title: string;
  subtitle?: string;
  size?: "small" | "medium";
};

const sizes = {
  small: {
    titleSize: "$6",
  },
  medium: {
    titleSize: "$7",
  },
};

export default function PageTitle({
  title,
  subtitle,
  size = "medium",
}: PageTitleProps) {
  return (
    <Stack>
      <H1
        fontSize={sizes[size]["titleSize"]}
        fontFamily={"$heading"}
        fontWeight={"700"}
      >
        {title}
      </H1>
      <Text fontFamily={"$darker"}>{subtitle}</Text>
    </Stack>
  );
}
