import {
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
} from "tamagui";

type InputProps = TamaguiInputProps;

export default function Input(props: InputProps) {
  return (
    <TamaguiInput
      height={56}
      backgroundColor={"$colorBackground"}
      borderColor="$neutral500"
      {...props}
    />
  );
}
