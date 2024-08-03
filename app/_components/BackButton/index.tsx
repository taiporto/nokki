import { ArrowLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, ButtonProps, SizableTextProps } from "tamagui";

export default function BackButton({
  size = "$2",
  ...props
}: ButtonProps & {
  size?: SizableTextProps["size"];
}) {
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
        <ArrowLeft size={size} />
      </Button.Icon>
    </Button>
  );
}
