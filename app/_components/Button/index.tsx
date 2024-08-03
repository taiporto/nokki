import { forwardRef } from "react";
import {
  styled,
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
} from "tamagui";

type ButtonProps = TamaguiButtonProps;

const StyledButton = styled(TamaguiButton, {
  backgroundColor: "$neutral900",
  color: "$background",
  hoverStyle: {
    backgroundColor: "$foreground",
  },
  pressStyle: {
    backgroundColor: "$foreground",
  },
});

const Button = forwardRef((props: ButtonProps, ref) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
});

export default Button;
