import { ArrowLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { ButtonProps, SizableTextProps } from "tamagui";
import IconButton from "../IconButton";

export default function BackButton({
  size = "$2",
  onPress,
  ...props
}: ButtonProps & {
  size?: SizableTextProps["size"];
}) {
  return (
    <IconButton
      onPress={onPress ?? (() => router.back())}
      iconElement={<ArrowLeft size={size} />}
      {...props}
    />
  );
}
