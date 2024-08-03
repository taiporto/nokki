import { ArrowLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, ButtonProps } from "tamagui";

export default function BackButton(props: ButtonProps) {
  return (
    <Button
      onPress={() => router.back()}
      paddingHorizontal={8}
      paddingVertical={8}
      backgroundColor="transparent"
      fontSize={"$7"}
      pressStyle={{
        borderColor: "transparent",
        backgroundColor: "transparent",
        opacity: 0.5,
      }}
      {...props}
    >
      <Button.Icon>
        <ArrowLeft size="$2" />
      </Button.Icon>
    </Button>
  );
}
