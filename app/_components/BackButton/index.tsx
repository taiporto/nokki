import { ArrowLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, ButtonProps } from "tamagui";

export default function BackButton(props: ButtonProps) {
  return (
    <Button
      icon={<ArrowLeft />}
      onPress={() => router.back()}
      paddingHorizontal={12}
      paddingVertical={10}
      backgroundColor="transparent"
      {...props}
    />
  );
}
