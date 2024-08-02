import { forwardRef } from "react";
import {
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
} from "tamagui";

type ButtonProps = TamaguiButtonProps;

const Button = forwardRef((props: ButtonProps, ref) => {
  return (
    <TamaguiButton
      backgroundColor={"$foreground"}
      color={"$background"}
      {...props}
    >
      {props.children}
    </TamaguiButton>
  );
});

export default Button;
