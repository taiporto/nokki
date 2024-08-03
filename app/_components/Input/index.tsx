import {
  styled,
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
} from "tamagui";

export type InputProps = TamaguiInputProps;

const StyledInput = styled(TamaguiInput, {
  height: 56,
  backgroundColor: "$colorBackground",
  borderColor: "$neutral500",
  focusStyle: {
    borderColor: "$purple500",
  },
});

export default function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
