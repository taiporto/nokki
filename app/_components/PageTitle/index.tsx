import { H1, Stack, Text } from "tamagui";

type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <Stack>
      <H1 fontSize={"$6"} fontFamily={"$heading"} margin={0}>
        {title}
      </H1>
      <Text fontFamily={"$darker"}>{subtitle}</Text>
    </Stack>
  );
}
