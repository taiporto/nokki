import {
  styled,
  TextArea as TamaguiTextArea,
  TextAreaProps as TamaguiTextAreaProps,
} from "tamagui";

export type TextAreaProps = TamaguiTextAreaProps;

const StyledTextArea = styled(TamaguiTextArea, {
  backgroundColor: "$colorBackground",
  borderColor: "$neutral500",
  focusStyle: {
    borderColor: "$purple500",
  },
});

export default function TextArea(props: TextAreaProps) {
  return <StyledTextArea {...props} />;
}
