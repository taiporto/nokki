import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { forwardRef, useMemo } from "react";
import {
  Adapt,
  Sheet,
  styled,
  Select as TamaguiSelect,
  SelectProps as TamaguiSelectProps,
  YStack,
} from "tamagui";

type SelectProps = {
  defaultValue: string;
  values: Record<string, unknown>[];
  title: string;
} & TamaguiSelectProps;

const StyledSelectTrigger = styled(TamaguiSelect.Trigger, {
  height: 56,
  backgroundColor: "$colorBackground",
  borderColor: "$neutral500",
  focusStyle: {
    borderColor: "$purple500",
  },
});

export const Select = forwardRef(
  ({ defaultValue, values, title, ...props }: SelectProps, ref) => {
    return (
      <TamaguiSelect defaultValue={defaultValue} {...props}>
        <StyledSelectTrigger iconAfter={ChevronDown}>
          <TamaguiSelect.Value placeholder="Coleção" />
        </StyledSelectTrigger>
        <Adapt platform="touch">
          <Sheet
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <TamaguiSelect.Content zIndex={200000}>
          <TamaguiSelect.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
          </TamaguiSelect.ScrollUpButton>
          <TamaguiSelect.Viewport>
            <TamaguiSelect.Group>
              <TamaguiSelect.Label>{title}</TamaguiSelect.Label>
              {useMemo(
                () =>
                  values.map((value, index) => {
                    return (
                      <TamaguiSelect.Item
                        index={index}
                        key={value.name as string}
                        value={String(value.id)}
                      >
                        <TamaguiSelect.ItemText>
                          {value.name}
                        </TamaguiSelect.ItemText>
                        <TamaguiSelect.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </TamaguiSelect.ItemIndicator>
                      </TamaguiSelect.Item>
                    );
                  }),
                [values]
              )}
            </TamaguiSelect.Group>
          </TamaguiSelect.Viewport>
          <TamaguiSelect.ScrollDownButton />
        </TamaguiSelect.Content>
      </TamaguiSelect>
    );
  }
);
