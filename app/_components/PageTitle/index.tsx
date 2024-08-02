import { H1, Stack, Text } from "tamagui";

type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <Stack gap={8}>
      <H1>{title}</H1>
      <Text fontFamily={"$darker"}>{subtitle}</Text>
    </Stack>
  );
}
