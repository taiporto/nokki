import { Button, ButtonProps, SizableTextProps } from "tamagui";

export default function IconButton({
  size = "$2",
  iconElement,
  ...props
}: ButtonProps & {
  size?: SizableTextProps["size"];
  iconElement: React.ReactElement;
}) {
  return (
    <Button
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
      <Button.Icon>{iconElement}</Button.Icon>
    </Button>
  );
}
